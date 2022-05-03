import React from 'react';

import {mixClassName} from '~/utils';

type Props = {
  name: string;
  label: string;
  rows?: number;
  className?: string;
};

const TextArea: React.FC<Props> = ({name, label, rows = 3, className}) => {
  return (
    <div className={mixClassName('group', className)}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 transition-colors group-focus-within:text-primary"
      >
        {label}
      </label>
      <div className="mt-1">
        <textarea
          id={name}
          name={name}
          rows={rows}
          className="mt-1 block w-full rounded-xl border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>
    </div>
  );
};

export default TextArea;
