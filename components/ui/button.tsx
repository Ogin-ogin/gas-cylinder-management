// ...shadcn/ui ボタンコンポーネント雛形...
import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`px-4 py-2 rounded font-medium ${
          variant === 'outline'
            ? 'border border-gray-300 bg-white text-gray-800'
            : variant === 'ghost'
            ? 'bg-transparent text-gray-800'
            : variant === 'link'
            ? 'underline text-blue-600 bg-transparent'
            : 'bg-blue-600 text-white'
        } ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
