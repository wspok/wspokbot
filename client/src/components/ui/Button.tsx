import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#78a565]",
          "disabled:opacity-50 disabled:pointer-events-none",
          
          // Size variations
          size === 'sm' && "h-8 px-3 text-xs",
          size === 'md' && "h-10 px-4 py-2 text-sm",
          size === 'lg' && "h-12 px-6 text-base",
          
          // Variant styles
          variant === 'default' && "bg-[#78a565] text-white hover:bg-[#5d8047]",
          variant === 'outline' && "border border-[#78a565] text-[#78a565] bg-transparent hover:bg-[#f0f4e6]",
          variant === 'ghost' && "bg-transparent hover:bg-[#f0f4e6] text-[#78a565]",
          
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
