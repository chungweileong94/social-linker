import {TextFieldProps} from '@material-ui/core';
import {UseFormReturn} from 'react-hook-form';

/**
 * This helper function also reduce some boilerplate code to create react-hook-form input.
 */
export const customRHFInputProps = (
  formContext: UseFormReturn<any>,
  renderProps: any,
): TextFieldProps => {
  const {name, value, onBlur} = renderProps;
  const {clearErrors, setValue, trigger, formState} = formContext;
  return {
    value,
    onChange: event => {
      clearErrors(name);
      // Trigger validation when text is empty during text change.
      setValue(name, event.target.value, {
        shouldValidate: event.target.value.length <= 0,
        shouldDirty: true,
      });
    },
    onBlur: () => {
      onBlur();
      trigger(name);
    },
    error: !!formState.errors[name]?.message,
    helperText: formState.errors[name]?.message,
  };
};
