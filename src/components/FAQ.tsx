import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I place a bulk order?",
    a: "Browse jerseys, click 'View Details', and hit 'Request Order'. Fill in your department/club info, quantity, and size breakdown. We'll connect you with the supplier.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "Each supplier sets their own minimum. Most start at 10–15 pieces. Check the jersey detail page for specifics.",
  },
  {
    q: "Can I customize the jersey with our logo and player names?",
    a: "Yes! When placing an order request, you can upload your university logo, club logo, and a player list (names + numbers). The supplier will create a custom mockup.",
  },
  {
    q: "How long does delivery take?",
    a: "Delivery typically takes 5–12 business days depending on the supplier and order size. Estimated delivery is shown on each jersey page.",
  },
  {
    q: "What payment methods are supported?",
    a: "Currently, orders are coordinated directly with suppliers. Payment is arranged after order confirmation — cash on delivery, bKash, and bank transfer are common options.",
  },
];

const FAQ = () => (
  <section className="bg-background py-16">
    <div className="container max-w-3xl">
      <h2 className="mb-10 text-center text-2xl font-extrabold uppercase tracking-widest text-foreground md:text-3xl">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-border">
            <AccordionTrigger className="text-left text-sm font-bold text-foreground hover:text-primary">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
