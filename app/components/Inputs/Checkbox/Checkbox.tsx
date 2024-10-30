"use client";

import {
  CheckboxProps,
  FormControlLabel,
  Checkbox as MUICheckbox,
} from "@mui/material";
import { useField } from "formik";
import React, { useCallback, useMemo } from "react";

type Props = {
  name: string;
  label?: React.ReactNode;
  value?: unknown;
} & CheckboxProps;

const Checkbox = (props: Props) => {
  // Props
  const { name, label, value, onChange, ...rest } = props;

  // Formik
  const [, , helper] = useField(name);

  /**
   * handleOnChange Handle checkbox checked
   * @param event: React.ChangeEvent<HTMLInputElement>
   */
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) helper.setValue(value);
      else helper.setValue(undefined);
    },
    [helper, value]
  );

  return useMemo(
    () => (
      <FormControlLabel
        label={<span className="text-primary">{label}</span>}
        control={
          <MUICheckbox
            {...rest}
            name={name}
            onChange={onChange || handleOnChange}
          />
        }
      />
    ),
    [handleOnChange, label, name, onChange, rest]
  );
};

export default Checkbox;
