
-- Create conversations table
CREATE TABLE public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  buyer_id uuid NOT NULL,
  supplier_id uuid NOT NULL,
  last_message_text text,
  last_message_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(order_id, buyer_id)
);

-- Create messages table
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid NOT NULL,
  sender_role text NOT NULL CHECK (sender_role IN ('buyer', 'supplier')),
  text text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Conversations RLS: buyers see their own conversations
CREATE POLICY "Buyers can view own conversations"
  ON public.conversations FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id);

CREATE POLICY "Buyers can insert own conversations"
  ON public.conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Buyers can update own conversations"
  ON public.conversations FOR UPDATE
  TO authenticated
  USING (auth.uid() = buyer_id);

-- Conversations RLS: suppliers see conversations where they are supplier
CREATE POLICY "Suppliers can view own conversations"
  ON public.conversations FOR SELECT
  TO authenticated
  USING (auth.uid() = supplier_id);

CREATE POLICY "Suppliers can update own conversations"
  ON public.conversations FOR UPDATE
  TO authenticated
  USING (auth.uid() = supplier_id);

-- Messages RLS: participants can view messages in their conversations
CREATE POLICY "Participants can view messages"
  ON public.messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id
        AND (c.buyer_id = auth.uid() OR c.supplier_id = auth.uid())
    )
  );

-- Messages RLS: participants can insert messages in their conversations
CREATE POLICY "Participants can insert messages"
  ON public.messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id
        AND (c.buyer_id = auth.uid() OR c.supplier_id = auth.uid())
    )
  );

-- Messages RLS: participants can update (mark read) messages in their conversations
CREATE POLICY "Participants can update messages"
  ON public.messages FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id
        AND (c.buyer_id = auth.uid() OR c.supplier_id = auth.uid())
    )
  );
