import React, {useState} from 'react';
import {SocialIcon} from 'react-social-icons';

import {cn} from '~/utils/styles';

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
    <div className={cn('flex flex-1 flex-row items-center gap-3', className)}>
      <div>
        <SocialIcon
          url={value}
          className="pointer-events-none"
          bgColor="#7e7e7e"
          style={{width: '2rem', height: '2rem'}}
        />
      </div>
      <Input {...props} className="w-full" onChange={handleOnChange} />
    </div>
  );
};

export default LinkPreviewInput;
