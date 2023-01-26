import React from 'react';

import {cvm, cn} from '~/utils/styles';

type Props = {
  text: string;
  children: React.ReactNode;
  color?:
    | 'base'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  position?: 'top' | 'bottom' | 'left' | 'right';
  forceOpen?: boolean;
};

const Tooltip: React.FC<Props> = ({
  text,
  color = 'base',
  forceOpen = false,
  position = 'top',
  ...props
}) => {
  return (
    <div
      className={cn(
        'dui-tooltip',
        cvm(color, {
          base: '',
          primary: 'dui-tooltip-primary',
          secondary: 'dui-tooltip-secondary',
          accent: 'dui-tooltip-accent',
          info: 'dui-tooltip-info',
          success: 'dui-tooltip-success',
          warning: 'dui-tooltip-warning',
          error: 'dui-tooltip-error',
        }),
        cvm(position, {
          top: 'dui-tooltip-top',
          bottom: 'dui-tooltip-bottom',
          left: 'dui-tooltip-left',
          right: 'dui-tooltip-right',
        }),
        forceOpen && 'dui-tooltip-open',
      )}
      data-tip={text}
      {...props}
    />
  );
};

export default Tooltip;
