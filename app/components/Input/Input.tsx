import React from 'react';

import {mixClassName} from '~/utils';

type Props = {
  name: string;
  label: string;
  className?: string;
  error?: boolean;
};

const Input: React.FC<Props> = ({name, label, className, error = false}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="bold block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        autoComplete="given-name"
        className={mixClassName(
          'mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          error && 'border-rose-500',
        )}
      />
    </div>
  );
};

export default Input;
