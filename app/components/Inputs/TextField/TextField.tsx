import { TextField as MUITextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import React, { useCallback, useMemo } from "react";

type Props = {
  name: string;
  id?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  variant?: "outlined" | "standard" | "filled";
} & TextFieldProps;

const TextField = (props: Props) => {
  const { name, type = "text", label, variant = "outlined", ...rest } = props;
  const [, meta, helper] = useField(name);

  /**
   * handleOnChange will set the field's value via Formik
   * @param event: React.ChangeEvent<HTMLInputElement>
   */
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const val = event.target.value;
      helper.setValue(val);
    },
    [helper]
  );

  return useMemo(
    () => (
      <MUITextField
        {...rest}
        name={name}
        type={type}
        label={label}
        variant={variant}
        onChange={handleOnChange}
        error={Boolean(meta.error)}
        autoComplete="off"
        helperText={meta.error}
      />
    ),
    [handleOnChange, label, meta.error, name, rest, type, variant]
  );
};

export default TextField;
