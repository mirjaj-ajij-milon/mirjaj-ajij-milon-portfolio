import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({ className = "", sideOffset = 4, children, ...props }) {
    return (
        <TooltipPrimitive.Content
            sideOffset={sideOffset}
            className={`z-50 overflow-hidden rounded-md bg-surface px-3 py-1.5 text-xs text-text shadow-md animate-in fade-in-0 zoom-in-95 border border-border ${className}`}
            {...props}
        >
            {children}
            <TooltipPrimitive.Arrow className="fill-surface" />
        </TooltipPrimitive.Content>
    );
}
