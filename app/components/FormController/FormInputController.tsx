import type React from "react";
import { useField } from "remix-validated-form";

import type { Merge } from "~/utils/types";

type Props = {
  name: string;
  render: (
    inputProps: Merge<
      ReturnType<ReturnType<typeof useField>["getInputProps"]>,
      { error: boolean; helperText?: string }
    >,
  ) => React.ReactElement;
};

const FormInputController: React.FC<Props> = ({ name, render }) => {
  const { getInputProps, error } = useField(name, {
    validationBehavior: { initial: "onSubmit", whenSubmitted: "onBlur" },
  });
  return render({ ...getInputProps(), error: !!error, helperText: error });
};

export default FormInputController;
