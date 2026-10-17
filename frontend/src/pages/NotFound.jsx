import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div data-testid="not-found-page" className="flex min-h-screen items-center justify-center bg-background p-6">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="card-surface w-full max-w-lg overflow-hidden"
            >
                <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-5 py-3">
                    <span className="h-3 w-3 rounded-full bg-rose-400" aria-hidden="true" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" aria-hidden="true" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" aria-hidden="true" />
                    <span className="ml-3 font-mono text-xs text-muted-foreground">mirjaj@portfolio ~ zsh</span>
                </div>
                <div className="space-y-3 p-8 font-mono text-sm">
                    <p><span className="text-primary">$</span> ./portfolio --page</p>
                    <p className="text-rose-400">error 404 · route not found</p>
                    <p className="text-muted-foreground">You tried to reach a page that doesn&apos;t exist.<br />Even my best error boundary can&apos;t help you here.</p>
                    <p><span className="text-primary">$</span> git checkout <span className="text-emerald-500">home</span></p>
                    <Link
                        to="/"
                        data-testid="not-found-home-link"
                        className="btn-primary mt-4 font-sans"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Back to the portfolio
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
