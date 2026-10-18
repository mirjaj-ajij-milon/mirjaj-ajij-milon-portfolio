import { TechIcon } from "@/components/shared";

/**
 * Maps technology name string to devicon key or lucide fallback
 */
function getTechIconProps(techName = "") {
    const raw = techName.toLowerCase();
    if (raw.includes("react")) return { devicon: "react" };
    if (raw.includes("vite")) return { devicon: "vite" };
    if (raw.includes("tailwind")) return { devicon: "tailwindcss" };
    if (raw.includes("node")) return { devicon: "nodedotjs" };
    if (raw.includes("express")) return { devicon: "express", invertDark: true };
    if (raw.includes("mongo")) return { devicon: "mongodb" };
    if (raw.includes("socket")) return { devicon: "socketdotio", invertDark: true };
    if (raw.includes("webrtc")) return { devicon: "webrtc" };
    if (raw.includes("stripe")) return { devicon: "stripe" };
    if (raw.includes("ejs")) return { lucide: "Code2" };
    if (raw.includes("joi")) return { lucide: "ShieldCheck" };
    if (raw.includes("groq") || raw.includes("llama") || raw.includes("gemini")) return { lucide: "Cpu" };
    if (raw.includes("jwt") || raw.includes("auth") || raw.includes("passport") || raw.includes("bcrypt")) return { lucide: "KeyRound" };
    if (raw.includes("cloudinary") || raw.includes("multer")) return { lucide: "Image" };
    if (raw.includes("leaflet") || raw.includes("opencage")) return { lucide: "Globe" };
    if (raw.includes("recharts")) return { lucide: "Table2" };
    if (raw.includes("nodemailer") || raw.includes("mail")) return { lucide: "Mail" };
    return { lucide: "Code2" };
}

/**
 * Small reusable pill representing a technology or skill
 */
export default function TechChip({ name, showIcon = true, className = "" }) {
    const iconProps = showIcon ? getTechIconProps(name) : null;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs sm:text-[13px] font-medium leading-none text-text bg-text/[0.04] dark:bg-text/[0.08] border border-text/10 transition-colors ${className}`}
        >
            {showIcon && iconProps && (
                <TechIcon
                    devicon={iconProps.devicon}
                    lucide={iconProps.lucide}
                    invertDark={iconProps.invertDark}
                    className="h-3.5 w-3.5 shrink-0"
                />
            )}
            <span className="truncate max-w-[180px]">{name}</span>
        </span>
    );
}
