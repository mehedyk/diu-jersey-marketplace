import { Search, Palette, Send } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Designs",
    desc: "Explore jerseys from multiple suppliers. Filter by category, price, and rating.",
  },
  {
    icon: Palette,
    title: "Customize for Your Team",
    desc: "Add your university logo, club logo, player names, numbers, and choose sizes.",
  },
  {
    icon: Send,
    title: "Send Request",
    desc: "Submit your order request. The supplier reviews it and coordinates delivery.",
  },
];

const HowItWorks = () => (
  <section className="bg-secondary py-16" id="how-it-works">
    <div className="container">
      <h2 className="mb-10 text-center text-2xl font-bold text-foreground md:text-3xl">
        How It Works
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <step.icon className="h-7 w-7 text-primary" />
            </div>
            <span className="mb-2 text-xs font-bold text-accent">Step {i + 1}</span>
            <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
