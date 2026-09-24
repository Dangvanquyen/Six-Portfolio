import React from "react";
import { ArrowRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Download CV", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative flex h-10 min-w-[130px] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/80 bg-background/80 px-5 py-2 text-center text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:border-[#e8390d]/60 hover:shadow-md active:scale-95 shadow-sm",
        className,
      )}
      {...props}
    >
      {/* Background expansion circle */}
      <div className="absolute left-3.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#e8390d] transition-all duration-300 ease-out group-hover:scale-[32] group-hover:bg-[#e8390d]" />

      {/* Default text with left padding so it never collides with the left dot */}
      <span className="relative z-10 inline-flex items-center pl-3.5 transition-all duration-300 group-hover:translate-x-8 group-hover:opacity-0">
        {text}
      </span>

      {/* Hover state: white text + animated download icon */}
      <div className="absolute inset-0 z-20 flex h-full w-full items-center justify-center gap-1.5 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span className="font-semibold">{text}</span>
        <Download size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
