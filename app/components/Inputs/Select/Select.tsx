import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
  SelectChangeEvent,
} from "@mui/material";
import { useField } from "formik";
import React, { useCallback, useMemo, useState } from "react";

export type SelectOptionProps = {
  label: string;
  value: string | number;
  control?: React.JSX.Element;
};

type Props = {
  label?: string;
  labelId?: string;
  id?: string;
  name: string;
  optionList: Array<SelectOptionProps>;
  onOptionChange?: (value: string | number) => void;
};

const Select = (props: Props) => {
  // Props
  const { name, label, optionList, labelId, id, onOptionChange } = props;

  // States
  const [value, setvalue] = useState("");

  // Formik hooks
  const [, , helper] = useField(name);

  /**
   * Handle select option changed
   * @param event: SelectChangeEvent
   */
  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const val = event.target.value;
      setvalue(val);
      helper.setValue(val);
      onOptionChange && onOptionChange(val);
    },
    [helper, onOptionChange]
  );

  return useMemo(
    () => (
      <FormControl fullWidth>
        {label && <InputLabel id={labelId}>{label}</InputLabel>}
        <MUISelect
          labelId={labelId}
          id={id}
          value={value}
          label={label}
          onChange={handleChange}
        >
          {optionList.map((item, index) => {
            return item.control ? (
              item.control
            ) : (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </MUISelect>
      </FormControl>
    ),
    [handleChange, id, label, labelId, optionList, value]
  );
};

export default Select;
