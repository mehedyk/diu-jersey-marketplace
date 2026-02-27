
-- 1. Notifications table
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type text NOT NULL DEFAULT 'general',
  title text NOT NULL,
  message text NOT NULL,
  data jsonb,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 2. Extend orders table with tracking fields
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS courier_name text,
  ADD COLUMN IF NOT EXISTS tracking_id text,
  ADD COLUMN IF NOT EXISTS estimated_delivery_date date,
  ADD COLUMN IF NOT EXISTS status_note text;

-- 3. Order status history table
CREATE TABLE public.order_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status text NOT NULL,
  changed_at timestamp with time zone NOT NULL DEFAULT now(),
  changed_by text,
  note text
);

ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order status history"
  ON public.order_status_history FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.orders WHERE orders.id = order_status_history.order_id AND orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own order status history"
  ON public.order_status_history FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.orders WHERE orders.id = order_status_history.order_id AND orders.user_id = auth.uid()
  ));

-- 4. Custom jersey requests table
CREATE TABLE public.custom_jersey_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  jersey_type text NOT NULL,
  team_or_club text,
  size_details text,
  player_name_number text,
  extra_instructions text,
  design_image_url text,
  logo_image_url text,
  quantity integer NOT NULL DEFAULT 10,
  status text NOT NULL DEFAULT 'pending',
  assigned_supplier_id text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.custom_jersey_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own custom jersey requests"
  ON public.custom_jersey_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own custom jersey requests"
  ON public.custom_jersey_requests FOR SELECT
  USING (auth.uid() = user_id);

-- 5. Storage bucket for jersey designs
INSERT INTO storage.buckets (id, name, public) VALUES ('jersey-designs', 'jersey-designs', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can upload jersey designs"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'jersey-designs' AND auth.role() = 'authenticated');

CREATE POLICY "Anyone can view jersey designs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'jersey-designs');
