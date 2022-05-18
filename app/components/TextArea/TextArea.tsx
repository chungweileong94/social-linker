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
          'mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400',
          error && 'text-red-700 dark:text-red-500',
        )}
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className={mixClassName(
          'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
          error &&
            'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100',
        )}
        {...props}
      />
      {!!helperText && (
        <p
          className={mixClassName(
            'mt-2 text-sm text-gray-500 dark:text-gray-400',
            error && 'text-red-600 dark:text-red-500',
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextArea;
