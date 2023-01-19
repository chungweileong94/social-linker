import React from 'react';

import {mixClassName} from '~/utils/styles';

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
  error = false,
  helperText,
  ...props
}) => {
  return (
    <div className={mixClassName('dui-form-control', className)}>
      <label htmlFor={name} className="dui-label">
        <span className={mixClassName('dui-label-text', error && 'text-error')}>
          {label}
        </span>
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className="dui-textarea-bordered dui-textarea h-24"
        {...props}
      ></textarea>
      {!!helperText && (
        <label className="dui-label">
          <span
            className={mixClassName(
              'dui-label-text-alt',
              error && 'text-error',
            )}
          >
            helperText
          </span>
        </label>
      )}
    </div>
  );
};

export default TextArea;
