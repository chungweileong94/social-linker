import {useCallback} from 'react';
import {z, ZodError} from 'zod';
import {zfd} from 'zod-form-data';

type ZodFormDataSchema = ReturnType<typeof zfd['formData']>;

export type ExtractFormErrors<
  TSchema extends ZodFormDataSchema = ZodFormDataSchema,
> = Partial<Record<keyof z.infer<TSchema>, string>>;

const getValidationErrors = (error: any) => {
  if (!(error instanceof ZodError)) return null;
  return error.issues.reduce<ExtractFormErrors>((acc, issue) => {
    acc[issue.path[0]] = issue.message;
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
    const data = formSchema.parse(formData);
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
