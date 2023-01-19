import React from 'react';

import {mixClassName} from '~/utils/styles';

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
    <div className={mixClassName('dui-form-control', className)}>
      <label
        htmlFor={name}
        className={mixClassName('dui-label', !label && 'hidden')}
      >
        <span className={mixClassName('dui-label-text', error && 'text-error')}>
          {label}
        </span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={mixClassName(
          'dui-input-bordered dui-input',
          error && 'dui-input-error',
        )}
        {...props}
      />
      {!!helperText && (
        <label className="dui-label">
          <span
            className={mixClassName(
              'dui-label-text-alt',
              error && 'text-error',
            )}
          >
            {helperText}
          </span>
        </label>
      )}
    </div>
  );
};

export default Input;
