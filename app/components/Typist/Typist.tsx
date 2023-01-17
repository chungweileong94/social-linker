import React, {useEffect, useState} from 'react';
import ReactTextTypist from 'react-text-typist';

type Props = Pick<
  React.ComponentProps<typeof ReactTextTypist>,
  'sentences' | 'startDelay' | 'pauseTime' | 'loop' | 'className'
>;

let isHydrating = true;

const Typist: React.FC<Props> = (props) => {
  const [isHydrated, setIsHydrated] = useState(!isHydrating);

  useEffect(() => {
    isHydrating = false;
    setIsHydrated(true);
  }, []);

  return isHydrated ? <ReactTextTypist {...props} /> : null;
};

export default Typist;
