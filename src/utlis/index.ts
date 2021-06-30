import {TextFieldProps} from '@material-ui/core';
import {UseFormReturn} from 'react-hook-form';

/**
 * Get property of an object by dot notation string like `field.0.nestedField`.
 *
 * This is primary use for react-hook-form `useFieldArray`,
 * as all the field array names are represent as dot notation format
 */
const getPropertyByDotNotation = (obj: any, fieldName: string) => {
  const nestedFields = fieldName.split('.');
  const value = nestedFields.reduce((result, field) => {
    return result?.[field];
  }, obj);
  return value;
};

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
    error: formState.errors
      ? !!getPropertyByDotNotation(formState.errors, name)?.message
      : false,
    helperText: formState.errors
      ? getPropertyByDotNotation(formState.errors, name)?.message
      : undefined,
  };
};
