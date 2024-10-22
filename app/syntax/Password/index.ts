import TextField from "@/app/components/Inputs/TextField";
import PasswordUsage from "@/app/usages/TextField/PasswordUsage";

export const PasswordUsageSyntax = `
import TextField from "@/app/components/Inputs/TextField";
import { passwordValidationSchema } from "@/app/validations/password";
import { FormikProvider, useFormik } from "formik";
import { useCallback } from "react";

type FormValues = {
  old_password?: string | number;
  new_password?: string | number;
  confirm_password?: string | number;
};

const PasswordUsage = () => {
  const handleSubmit = useCallback((value: FormValues) => {
    console.log("value", value);
  }, []);

  const formikBag = useFormik({
    enableReinitialize: true,
    initialValues: {
      old_password: undefined,
      new_password: undefined,
      confirm_password: undefined,
    },
    onSubmit: handleSubmit,
    validationSchema: passwordValidationSchema(),
  });

  return (
    <FormikProvider value={formikBag}>
      <div className="gap-4 w-2/3 flex justify-center items-center flex-col">
        <TextField
          name="old_password"
          type="password"
          label="Old Password"
          className="w-full"
        />
        <TextField
          name="new_password"
          type="password"
          label="New Password"
          className="w-full"
        />
        <TextField
          name="confirm_password"
          type="password"
          label="Confirm Password"
          className="w-full"
        />
      </div>
    </FormikProvider>
  );
};

export default PasswordUsage;
`;
export const PasswordSyntax = `
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

`;
