import {useCallback} from 'react';
import {z} from 'zod';
import {zfd} from 'zod-form-data';

type FormDataSchema = ReturnType<typeof zfd['formData']>;

type FormErrors<T extends FormDataSchema> = {
  [K in keyof z.infer<T>]?: string[];
};

/**
 * Validate form data against a zod schema.
 */
export const validateFormData = <T extends FormDataSchema>(
  formData: FormData,
  formSchema: T,
) => {
  const validateResult = formSchema.safeParse(formData);
  if (validateResult.success) {
    return null;
  }
  return validateResult.error.formErrors.fieldErrors as FormErrors<T>;
};

export const useFormErrors = <T extends FormDataSchema>(
  formErrors?: FormErrors<T> | null,
) => {
  const getInputErrorProps = useCallback(
    (name: keyof z.infer<T>) => {
      const errors = formErrors?.[name];
      const inputProps = {
        error: !!errors,
        helperText: errors?.[0],
      };
      return inputProps;
    },
    [formErrors],
  );
  return {getInputErrorProps};
};
