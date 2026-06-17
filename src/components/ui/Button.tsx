import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold font-sans transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-orange text-white shadow-orange hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(246,125,32,0.45)]",
        secondary:
          "bg-navy-700 text-white hover:bg-navy-600 hover:-translate-y-0.5",
        outline:
          "border-2 border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white",
        "outline-white":
          "border-2 border-white/30 text-white hover:border-brand-orange hover:text-brand-orange",
        ghost: "text-navy-700 hover:bg-navy-50",
        "ghost-white": "text-white/80 hover:text-white hover:bg-white/10",
        link: "text-brand-orange underline-offset-4 hover:underline p-0 h-auto",
        danger: "bg-danger text-white hover:bg-red-700",
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-lg",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
