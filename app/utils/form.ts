import {unflatten} from 'flattenizer';
import {useCallback} from 'react';
import {z, ZodError} from 'zod';
import {zfd} from 'zod-form-data';

type ZodFormDataSchema = ReturnType<typeof zfd['formData']>;

export type FormErrors = Record<string, string>;

const getValidationErrors = (error: any) => {
  if (!(error instanceof ZodError)) return null;
  return error.issues.reduce<FormErrors>((acc, issue) => {
    acc[issue.path.join('.')] = issue.message;
    return acc;
  }, {});
};

/**
 * Validate form data against a zod schema.
 */
export const validateForm = <TSchema extends ZodFormDataSchema>(
  formData: FormData,
  formSchema: TSchema,
) => {
  try {
    const data = formSchema.parse(
      unflatten(Object.fromEntries(formData.entries())),
    );
    return data as z.infer<TSchema>;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw getValidationErrors(error);
  }
};

export const useFormErrors = <TErrors extends Partial<Record<string, string>>>(
  formErrors?: TErrors,
) => {
  const getInputErrorProps = useCallback(
    (name: keyof TErrors) => {
      const errorMessage = formErrors?.[name];
      return {
        error: !!errorMessage,
        helperText: errorMessage,
      };
    },
    [formErrors],
  );
  return {getInputErrorProps};
};
