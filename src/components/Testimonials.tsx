import { testimonials } from "@/data/mockData";

const Testimonials = () => (
  <section className="container py-16" id="about">
    <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
      What Our Users Say
    </h2>
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t) => (
        <div key={t.id} className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm italic text-muted-foreground">"{t.quote}"</p>
          <div className="mt-4 flex items-center gap-3">
            <img src={t.avatarUrl} alt={t.name} className="h-10 w-10 rounded-full" />
            <div>
              <p className="text-sm font-bold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.department}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
