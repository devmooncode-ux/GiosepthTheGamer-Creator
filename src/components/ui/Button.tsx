import { forwardRef, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-cyan text-graphite-950 font-semibold hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(0,229,255,0.35)]',
  secondary:
    'border border-graphite-600 text-text hover:border-cyan/50 hover:text-cyan bg-transparent',
  ghost:
    'text-text-dim hover:text-text transition-colors',
  gold:
    'bg-gold text-graphite-950 font-semibold hover:bg-gold-300 hover:shadow-[0_0_30px_rgba(245,184,32,0.35)]',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs tracking-widest',
  md: 'px-6 py-3 text-sm tracking-widest',
  lg: 'px-8 py-4 text-sm tracking-widest',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 uppercase transition-all duration-300 ease-out-expo rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
