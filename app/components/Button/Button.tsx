import React from 'react';

import {mixClassName} from '~/utils';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Button: React.FC<Props> = ({className, ...props}) => {
  return (
    <button
      className={mixClassName(
        'rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
        className,
      )}
      type="button"
      {...props}
    />
  );
};

export default Button;
