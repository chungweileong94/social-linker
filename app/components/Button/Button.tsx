import React from 'react';

import {mixClassName} from '~/utils';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Button: React.FC<Props> = ({className, ...props}) => {
  return (
    <button
      className={mixClassName(
        'rounded-xl bg-primary py-3 px-4 text-sm text-white hover:bg-opacity-70 active:bg-opacity-80 sm:text-base',
        className,
      )}
      {...props}
    />
  );
};

export default Button;
