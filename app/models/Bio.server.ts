import {z} from 'zod';
import {zfd} from 'zod-form-data';

import {validateFormData} from '~/utils/form';

type Bio = z.infer<typeof bioSchema>;

const bioSchema = zfd.formData({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export const createBio = (formData: FormData) => {
  const errors = validateFormData(formData, bioSchema);
  if (errors) {
    return {errors};
  }
  return {bio: {title: 'TODO'} as Bio};
};
