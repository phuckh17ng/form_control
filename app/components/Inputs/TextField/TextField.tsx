import { TextField as MUITextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import React, { useCallback } from "react";

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

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const val = event.target.value;
      helper.setValue(val);
    },
    [helper]
  );

  return (
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
  );
};

export default TextField;
