import React from 'react';
import {useField} from 'remix-validated-form';
import {GetInputProps} from 'remix-validated-form/dist/types/internal/getInputProps';

import {Merge} from '~/utils/types';

type Props = {
  name: string;
  render: (
    inputProps: Merge<
      ReturnType<GetInputProps>,
      {error: boolean; helperText?: string}
    >,
  ) => React.ReactElement;
};

const FormInputController: React.FC<Props> = ({name, render}) => {
  const {getInputProps, error} = useField(name, {
    validationBehavior: {initial: 'onSubmit', whenSubmitted: 'onBlur'},
  });
  return render({...getInputProps(), error: !!error, helperText: error});
};

export default FormInputController;
