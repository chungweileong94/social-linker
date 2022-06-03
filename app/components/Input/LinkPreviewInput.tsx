import React, {useState} from 'react';
import {SocialIcon} from 'react-social-icons';

import {mixClassName} from '~/utils';

import Input from './Input';

type Props = React.ComponentProps<typeof Input>;

const LinkPreviewInput: React.FC<Props> = ({
  helperText, // We don't use it
  className,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState<string>('');

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div
      className={mixClassName(
        'flex flex-1 flex-row items-center gap-3',
        className,
      )}
    >
      <div>
        <SocialIcon
          url={value}
          className="pointer-events-none"
          bgColor="transparent"
          fgColor="rgb(31, 178, 166)"
          style={{width: 40, height: 40}}
        />
      </div>
      <Input {...props} className="w-full" onChange={handleOnChange} />
    </div>
  );
};

export default LinkPreviewInput;
