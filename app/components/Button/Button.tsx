import React from 'react';

import {cvm, cn} from '~/utils/styles';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'standard' | 'outline' | 'ghost';
  color?:
    | 'base'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  shape?: 'normal' | 'square' | 'circle';
  loading?: boolean;
  className?: string;
};

const Button: React.FC<Props> = ({
  variant = 'standard',
  color = 'base',
  size = 'md',
  shape = 'normal',
  loading = false,
  disabled = false,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'dui-btn gap-2',
        cvm(variant, {
          standard: '',
          outline: 'dui-btn-outline',
          ghost: 'dui-btn-ghost',
        }),
        cvm(color, {
          base: '',
          primary: 'dui-btn-primary',
          secondary: 'dui-btn-secondary',
          accent: 'dui-btn-accent',
          info: 'dui-btn-info',
          success: 'dui-btn-success',
          warning: 'dui-btn-warning',
          error: 'dui-btn-error',
        }),
        cvm(size, {
          xs: 'dui-btn-xs',
          sm: 'dui-btn-sm',
          md: '',
          lg: 'dui-btn-lg',
        }),
        cvm(shape, {
          normal: '',
          circle: 'dui-btn-circle',
          square: 'dui-btn-square',
        }),
        loading && 'dui-loading',
        disabled && 'dui-btn-disabled',
        className,
      )}
      type="button"
      disabled={disabled}
      {...props}
    />
  );
};

export default Button;
