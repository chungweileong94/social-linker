import React from 'react';

import {mixClassName} from '~/utils';

type Props = {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
};

const Button: React.FC<Props> = ({type, className, children}) => {
  return (
    <button
      type={type}
      className={mixClassName(
        'rounded-xl bg-primary py-3 px-4 text-white hover:bg-opacity-70 active:bg-opacity-80',
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
