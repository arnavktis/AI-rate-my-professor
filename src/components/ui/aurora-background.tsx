"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main className="bg-black">
      <div
        className={cn(
          "relative flex flex-col  h-[100vh] items-center justify-center bg-transparent text-white transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            //   I'm sorry but this is what peak developer performance looks like // trigger warning
            className={cn(
              `
[--aurora:repeating-linear-gradient(100deg,#60a5fa_10%,#e879f9_15%,#5eead4_20%,#8b5cf6_25%,#60a5fa_30%)]
[background-image:var(--aurora)]
[background-size:300%,_200%]
[background-position:50%_50%,50%_50%]
filter blur-[20px]
after:content-[""] after:absolute after:inset-0 after:[background-image:var(--aurora)]
after:[background-size:200%,_100%] 
after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
pointer-events-none
absolute -inset-[10px] opacity-50 will-change-transform`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
