import React from 'react';

import {classNameMapper, mixClassName} from '~/utils';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'standard' | 'outline';
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
      className={mixClassName(
        'dui-btn gap-2',
        classNameMapper(variant, {standard: '', outline: 'dui-btn-outline'}),
        classNameMapper(color, {
          base: '',
          primary: 'dui-btn-primary',
          secondary: 'dui-btn-secondary',
          accent: 'dui-btn-accent',
          info: 'dui-btn-info',
          success: 'dui-btn-success',
          warning: 'dui-btn-warning',
          error: 'dui-btn-error',
        }),
        classNameMapper(size, {
          xs: 'dui-btn-xs',
          sm: 'dui-btn-sm',
          md: '',
          lg: 'dui-btn-lg',
        }),
        classNameMapper(shape, {
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
