import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bug, ChevronLeft, ChevronRight, Globe2, Quote, Rocket, Server } from "lucide-react";
import { services, testimonials } from "@/data/achievements";
import { Reveal, SectionHeading } from "@/components/shared";

const SERVICE_ICONS = { Server, Globe2, Bug, Rocket };

function TestimonialCarousel() {
    const [idx, setIdx] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return undefined;
        const id = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 6000);
        return () => clearInterval(id);
    }, [paused]);

    const t = testimonials[idx];
    const go = (d) => setIdx((i) => (i + d + testimonials.length) % testimonials.length);

    return (
        <div
            className="relative mx-auto mt-16 max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            data-testid="testimonials-carousel"
        >
            <div className="card-surface relative overflow-hidden p-8 sm:p-10">
                <Quote className="absolute right-6 top-6 h-16 w-16 text-accent/10" aria-hidden="true" />
                <AnimatePresence mode="wait">
                    <motion.figure
                        key={idx}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.35 }}
                    >
                        <blockquote className="text-base leading-relaxed text-text sm:text-lg">“{t.quote}”</blockquote>
                        <figcaption className="mt-6 flex items-center gap-3">
                            <img src={t.avatar} alt={`Portrait of ${t.name}`} loading="lazy" width="44" height="44" className="h-11 w-11 rounded-full border border-border object-cover" />
                            <div>
                                <p className="text-sm font-semibold text-text">{t.name}</p>
                                <p className="text-xs text-text-muted">{t.role}</p>
                            </div>
                        </figcaption>
                    </motion.figure>
                </AnimatePresence>
            </div>
            <div className="mt-5 flex items-center justify-center gap-4">
                <button type="button" onClick={() => go(-1)} data-testid="testimonial-prev" aria-label="Previous testimonial" className="btn-icon !h-9 !w-9 !rounded-full">
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex gap-1.5">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setIdx(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                            data-testid={`testimonial-dot-${i}`}
                            className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-accent" : "w-1.5 bg-control-border hover:bg-text-muted"}`}
                        />
                    ))}
                </div>
                <button type="button" onClick={() => go(1)} data-testid="testimonial-next" aria-label="Next testimonial" className="btn-icon !h-9 !w-9 !rounded-full">
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

export default function Testimonials() {
    return (
        <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <SectionHeading
                eyebrow="// services"
                title="Services, backed by kind words"
                subtitle="If your team needs one of these done well, we should talk."
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {services.map((s, i) => {
                    const Icon = SERVICE_ICONS[s.icon] || Server;
                    return (
                        <Reveal key={s.title} delay={i * 0.05}>
                            <div data-testid={`service-card-${i}`} className="card-surface group h-full p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-control-border">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-badge-bg text-accent transition-colors group-hover:bg-accent group-hover:text-on-accent">
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <h3 className="mt-4 font-display text-base font-semibold text-text">{s.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.detail}</p>
                            </div>
                        </Reveal>
                    );
                })}
            </div>

            <TestimonialCarousel />
        </section>
    );
}
