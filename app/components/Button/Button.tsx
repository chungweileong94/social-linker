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
  className?: string;
};

const Button: React.FC<Props> = ({
  variant = 'standard',
  color = 'base',
  size = 'md',
  shape = 'normal',
  className,
  ...props
}) => {
  return (
    <button
      className={mixClassName(
        'dui-btn',
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
        className,
      )}
      type="button"
      {...props}
    />
  );
};

export default Button;
