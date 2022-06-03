import React from 'react';

import {mixClassName} from '~/utils';

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

const generateButtonVariantClassName = (variant: Props['variant']) => {
  switch (variant) {
    case 'outline':
      return 'dui-btn-outline';
    case 'standard':
    default:
      return '';
  }
};

const generateButtonColorClassName = (color: Props['color']) => {
  switch (color) {
    case 'primary':
      return 'dui-btn-primary';
    case 'secondary':
      return 'dui-btn-secondary';
    case 'accent':
      return 'dui-btn-accent';
    case 'info':
      return 'dui-btn-info';
    case 'success':
      return 'dui-btn-success';
    case 'warning':
      return 'dui-btn-warning';
    case 'error':
      return 'dui-btn-error';
    case 'base':
    default:
      return '';
  }
};

const generateButtonSizeClassName = (size: Props['size']) => {
  switch (size) {
    case 'xs':
      return 'dui-btn-xs';
    case 'sm':
      return 'dui-btn-sm';
    case 'lg':
      return 'dui-btn-lg';
    case 'md':
    default:
      return '';
  }
};

const generateButtonShape = (shape: Props['shape']) => {
  switch (shape) {
    case 'circle':
      return 'dui-btn-circle';
    case 'square':
      return 'dui-btn-square';
    case 'normal':
    default:
      return '';
  }
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
        generateButtonVariantClassName(variant),
        generateButtonColorClassName(color),
        generateButtonSizeClassName(size),
        generateButtonShape(shape),
        className,
      )}
      type="button"
      {...props}
    />
  );
};

export default Button;
