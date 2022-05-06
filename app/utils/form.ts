import {z} from 'zod';
import {zfd} from 'zod-form-data';

export type FormValidationErrors<
  TFormData extends ReturnType<typeof zfd['formData']>,
> = {
  [K in keyof z.infer<TFormData>]?: string[];
};

export const validateFormData = <
  TSchema extends ReturnType<typeof zfd['formData']>,
>(
  formData: FormData,
  formSchema: TSchema,
) => {
  const validateResult = formSchema.safeParse(formData);
  if (validateResult.success) {
    return null;
  }
  const errors = validateResult.error.formErrors.fieldErrors;
  return errors as FormValidationErrors<TSchema>;
};
