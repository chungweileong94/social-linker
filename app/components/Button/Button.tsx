import React from 'react';

import {mixClassName} from '~/utils';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'standard' | 'outline';
  className?: string;
};

const Button: React.FC<Props> = ({
  variant = 'standard',
  className,
  ...props
}) => {
  return (
    <button
      className={mixClassName(
        'dui-btn dui-btn-primary',
        variant === 'outline' && 'dui-btn-outline',
        className,
      )}
      type="button"
      {...props}
    />
  );
};

export default Button;
