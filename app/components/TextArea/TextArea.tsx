import React from 'react';

import {mixClassName} from '~/utils';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: boolean;
  helperText?: string;
};

const TextArea: React.FC<Props> = ({
  name,
  label,
  rows = 3,
  className,
  error,
  helperText,
  ...props
}) => {
  return (
    <div className={mixClassName('group', className)}>
      <label
        htmlFor={name}
        className={mixClassName(
          'block text-sm font-medium text-gray-700 transition-colors group-focus-within:text-primary',
          error && 'text-rose-500',
        )}
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className={mixClassName(
          'mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm',
          error && 'border-rose-500',
        )}
        {...props}
      />
      {!!helperText && (
        <span
          className={mixClassName(
            'text-xs',
            error ? 'text-rose-500' : 'text-gray-400',
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default TextArea;
