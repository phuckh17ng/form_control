import {
  CheckboxProps,
  FormControlLabel,
  Checkbox as MUICheckbox,
} from "@mui/material";
import { useField } from "formik";
import React, { useCallback } from "react";

type Props = {
  name: string;
  label?: React.ReactNode;
  value?: unknown;
} & CheckboxProps;

const ImdeterminateCheckbox = (props: Props) => {
  const { name, label, value, onChange, ...rest } = props;
  const [, meta, helper] = useField(name);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) helper.setValue(value);
      else helper.setValue(undefined);
    },
    [helper, value]
  );

  return (
    <FormControlLabel
      label={label}
      control={
        <MUICheckbox
          {...rest}
          name={name}
          onChange={onChange || handleOnChange}
          required
        />
      }
    />
  );
};

export default ImdeterminateCheckbox;
