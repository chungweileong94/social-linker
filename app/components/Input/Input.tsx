import React from 'react';

import {mixClassName} from '~/utils';

type Props = {
  type?: React.HTMLInputTypeAttribute;
  name: string;
  label: string;
  className?: string;
  /**
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   */
  autoComplete?: string;
  error?: boolean;
};

const Input: React.FC<Props> = ({
  type = 'text',
  name,
  label,
  className,
  autoComplete,
  error = false,
}) => {
  return (
    <div className={mixClassName('group', className)}>
      <label
        htmlFor={name}
        className="bold lg block text-sm font-medium text-gray-700 transition-colors group-focus-within:text-primary"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        autoComplete={autoComplete}
        className={mixClassName(
          'mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm',
          error && 'border-rose-500',
        )}
      />
    </div>
  );
};

export default Input;
