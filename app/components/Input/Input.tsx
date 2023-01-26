import React from 'react';

import {cn} from '~/utils/styles';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: boolean;
  helperText?: string;
};

const Input: React.FC<Props> = ({
  type = 'text',
  name,
  label,
  className,
  error = false,
  helperText,
  ...props
}) => {
  return (
    <div className={cn('dui-form-control', className)}>
      <label htmlFor={name} className={cn('dui-label', !label && 'hidden')}>
        <span className={cn('dui-label-text', error && 'text-error')}>
          {label}
        </span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={cn(
          'dui-input-bordered dui-input',
          error && 'dui-input-error',
        )}
        {...props}
      />
      {!!helperText && (
        <label className="dui-label">
          <span className={cn('dui-label-text-alt', error && 'text-error')}>
            {helperText}
          </span>
        </label>
      )}
    </div>
  );
};

export default Input;
