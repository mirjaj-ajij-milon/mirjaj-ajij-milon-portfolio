import { useRef, useState } from "react";
import { Clock3, Copy, Download, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { site } from "@/data/site";
import { socials } from "@/data/socials";
import { External, Reveal, SectionHeading, SocialIcon } from "@/components/shared";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
    const [sending, setSending] = useState(false);
    const [errors, setErrors] = useState({});
    const formRef = useRef(null);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(site.email);
            toast.success("Email copied to clipboard!");
        } catch {
            toast.error("Couldn't copy — the email is right here though.");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name") || "").trim();
        const email = String(data.get("email") || "").trim();
        const message = String(data.get("message") || "").trim();

        const next = {};
        if (name.length < 2) next.name = "Please tell me your name.";
        if (!EMAIL_RE.test(email)) next.email = "That email doesn't look right.";
        if (message.length < 10) next.message = "A few more words would help me reply properly.";
        setErrors(next);
        if (Object.keys(next).length > 0) return;

        // Honeypot: silently accept and ignore bots
        if (String(data.get("botcheck") || "")) {
            toast.success("Thanks — message received!");
            e.currentTarget.reset();
            return;
        }

        if (!site.web3formsKey) {
            // No key configured yet: open the visitor's mail client instead
            const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
            window.location.href = mailto;
            toast.info("Opening your email app…");
            return;
        }

        setSending(true);
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: site.web3formsKey,
                    subject: `Portfolio enquiry from ${name}`,
                    from_name: "Portfolio",
                    name,
                    email,
                    message,
                }),
            });
            const result = await res.json();
            if (!res.ok || !result.success) throw new Error(result.message || "Send failed");
            toast.success("Message sent! I'll reply within 24 hours.");
            e.currentTarget.reset();
        } catch {
            toast.error("Couldn't send just now — please email me directly instead.");
        } finally {
            setSending(false);
        }
    };

    const field = (name, errorsObj) =>
        `w-full rounded-xl border bg-bg px-4 py-3 text-sm outline-none transition-colors placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-focus text-text ${
            errorsObj[name] ? "border-rose-500" : "border-control-border"
        }`;

    return (
        <section id="contact" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28 overflow-hidden">
            <SectionHeading
                eyebrow="// contact"
                title="Let's Work Together"
                subtitle="Hiring for a role, or need something built? My inbox is the fastest way in."
            />

            <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 min-w-0 max-w-full">
                <Reveal>
                    <div className="flex h-full flex-col justify-between gap-6 sm:gap-8">
                        <div className="space-y-4 sm:space-y-5">
                            <p className="max-w-md text-sm sm:text-lg leading-relaxed text-text-muted">
                                Open to <span className="font-medium text-text">internships, full-time roles and freelance work</span>. If you need
                                APIs that hold up under load and docs people actually read, let&apos;s talk.
                            </p>

                            <button
                                type="button"
                                onClick={copyEmail}
                                data-testid="copy-email-btn"
                                className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-3.5 sm:p-4 text-left transition-colors hover:border-control-border w-full"
                                aria-label={`Copy email address ${site.email}`}
                            >
                                <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-badge-bg text-accent shrink-0">
                                    <Mail className="h-4 w-4" aria-hidden="true" />
                                </span>
                                <span className="flex-1 min-w-0">
                                    <span className="block text-[11px] sm:text-xs text-text-muted">Email me at</span>
                                    <span className="block font-mono text-xs sm:text-sm text-text truncate sm:overflow-visible">{site.email}</span>
                                </span>
                                <Copy className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent shrink-0" aria-hidden="true" />
                            </button>

                            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                                <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3.5 sm:p-4">
                                    <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                                    <div>
                                        <p className="text-[11px] sm:text-xs text-text-muted">Based in</p>
                                        <p className="text-xs sm:text-sm font-medium text-text">{site.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3.5 sm:p-4">
                                    <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                                    <div>
                                        <p className="text-[11px] sm:text-xs text-text-muted">Call / WhatsApp</p>
                                        <a href={`tel:${site.phone.replace(/\s+/g, '')}`} className="text-xs sm:text-sm font-medium text-text hover:text-accent transition-colors">{site.phone}</a>
                                    </div>
                                </div>
                            </div>

                            <a href={site.resumePath} download={site.resumeFileName} data-testid="contact-resume-btn" className="btn-primary w-full sm:w-auto justify-center text-xs sm:text-sm py-2.5 sm:py-2">
                                <Download className="h-4 w-4" aria-hidden="true" />
                                Download Resume
                            </a>
                        </div>

                        <div>
                            <p className="mb-3 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent">// socials</p>
                            <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                {socials.map((s) => (
                                    <External
                                        key={s.name}
                                        href={s.url}
                                        testid={`contact-social-${s.icon}`}
                                        ariaLabel={s.label}
                                        className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-muted transition-all hover:-translate-y-0.5 hover:border-control-border hover:text-accent"
                                    >
                                        <SocialIcon icon={s.icon} className="h-4 w-4" />
                                    </External>
                                ))}
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <form ref={formRef} onSubmit={onSubmit} noValidate data-testid="contact-form" className="card-surface space-y-4 sm:space-y-5 p-4 sm:p-8">
                        <div>
                            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-text">Name</label>
                            <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Ada Lovelace" data-testid="contact-name-input" className={field("name", errors)} />
                            {errors.name && <p role="alert" data-testid="contact-name-error" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-text">Email</label>
                            <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" data-testid="contact-email-input" className={field("email", errors)} />
                            {errors.email && <p role="alert" data-testid="contact-email-error" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-text">Message</label>
                            <textarea id="contact-message" name="message" rows={5} placeholder="Tell me about the role or project…" data-testid="contact-message-input" className={`${field("message", errors)} resize-none`} />
                            {errors.message && <p role="alert" data-testid="contact-message-error" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium">{errors.message}</p>}
                        </div>

                        {/* Honeypot — invisible to humans, catnip for bots */}
                        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                        <button
                            type="submit"
                            disabled={sending}
                            data-testid="contact-form-submit-btn"
                            className="btn-primary w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {sending ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                                    Sending…
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" aria-hidden="true" />
                                    Send Message
                                </>
                            )}
                        </button>
                        <p className="text-center font-mono text-xs text-text-muted">no spam, no newsletters — just a reply</p>
                    </form>
                </Reveal>
            </div>
        </section>
    );
}
