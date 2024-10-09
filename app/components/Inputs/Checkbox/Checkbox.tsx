"use client";

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

const Checkbox = (props: Props) => {
  const { name, label, value, onChange, ...rest } = props;
  const [, , helper] = useField(name);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) helper.setValue(value);
      else helper.setValue(undefined);
    },
    [helper, value]
  );

  return (
    <FormControlLabel
      label={<span className="text-black">{label}</span>}
      control={
        <MUICheckbox
          {...rest}
          name={name}
          onChange={onChange || handleOnChange}
        />
      }
    />
  );
};

export default Checkbox;
