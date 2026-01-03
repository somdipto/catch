import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

// Combine Motion props with Button props
type CombinedProps = ButtonProps & HTMLMotionProps<"button">;

export const Button: React.FC<CombinedProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading,
  className = '',
  disabled,
  ...props 
}) => {
  
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 border border-transparent',
    secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm',
    outline: 'border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-5 py-2 text-sm',
    lg: 'h-14 px-8 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative overflow-hidden inline-flex items-center justify-center font-medium transition-all rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      
      {/* Gradient Sweep Overlay for Primary Buttons */}
      {variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
      )}
      
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
