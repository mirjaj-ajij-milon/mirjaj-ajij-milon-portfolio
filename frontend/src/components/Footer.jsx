import { ArrowUp, Heart } from "lucide-react";
import { site } from "@/data/site";
import { socials } from "@/data/socials";
import { External, scrollToId, SocialIcon } from "@/components/shared";

const NAV = ["about", "skills", "projects", "experience", "education", "contact"];

export default function Footer() {
    return (
        <footer className="border-t border-border bg-surface">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <img src="/logo.svg" alt="Mirjaj Ajij Milon Logo" className="h-8 w-8 rounded-lg" width="32" height="32" />
                            <span className="font-display text-lg font-bold">
                                {site.logoWord.split(".")[0]}
                                <span className="text-accent">.dev</span>
                            </span>
                        </div>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
                            {site.role}. Currently {site.availability.toLowerCase()} — let&apos;s build something that scales.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {socials.map((s) => (
                                <External
                                    key={s.name}
                                    href={s.url}
                                    testid={`footer-social-${s.icon}`}
                                    ariaLabel={s.label}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg text-text-muted transition-all hover:-translate-y-0.5 hover:border-control-border hover:text-accent"
                                >
                                    <SocialIcon icon={s.icon} className="h-4 w-4" />
                                </External>
                            ))}
                        </div>
                    </div>

                    <nav aria-label="Footer navigation">
                        <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">explore</p>
                        <ul className="space-y-2.5">
                            {NAV.map((id) => (
                                <li key={id}>
                                    <button
                                        type="button"
                                        onClick={() => scrollToId(id)}
                                        data-testid={`footer-link-${id}`}
                                        className="text-sm text-text-muted transition-colors hover:text-text hover:underline underline-offset-4"
                                    >
                                        {id.charAt(0).toUpperCase() + id.slice(1)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">get in touch</p>
                        <ul className="space-y-2.5 text-sm text-text-muted">
                            <li>
                                <a href={`mailto:${site.email}`} data-testid="footer-email-link" className="transition-colors hover:text-accent underline underline-offset-4">
                                    {site.email}
                                </a>
                            </li>
                            <li>{site.location}</li>
                            <li>{site.replyTime}</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
                    <p className="text-xs text-text-muted">
                        © {site.copyrightYear} {site.name} · {site.footerCredit}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                        <External href={site.sourceUrl} testid="footer-source-link" className="inline-flex items-center gap-1.5 transition-colors hover:text-text hover:underline underline-offset-4">
                            <Heart className="h-3 w-3 text-accent" aria-hidden="true" />
                            View source
                        </External>
                        <button
                            type="button"
                            onClick={() => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
                            data-testid="footer-back-to-top"
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-text"
                        >
                            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                            Back to top
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
