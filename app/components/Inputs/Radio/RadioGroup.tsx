import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup as MUIRadioGroup,
  Radio,
} from "@mui/material";
import { useField } from "formik";
import React, { useCallback, useMemo, useState } from "react";

export type RadioProps = {
  name: string;
  value: string;
  label: string;
  control?: React.JSX.Element;
};

type Props = {
  id: string;
  name: string;
  title?: string;
  defaultValue?: string;
  radioList: Array<RadioProps>;
  handleRadioChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioGroup = (props: Props) => {
  // Props
  const { id, title, name, defaultValue, handleRadioChange, radioList } = props;

  // State
  const [value, setValue] = useState(defaultValue || null);

  // Formik hooks
  const [, , helper] = useField(name);

  /**
   * Handle radio changed
   * @param event: React.ChangeEvent<HTMLInputElement>
   */
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      setValue(val);
      helper.setValue(val);
    },
    [helper]
  );

  return useMemo(
    () => (
      <FormControl variant="standard">
        <FormLabel id={id}>
          <span className="text-primary">{title}</span>
        </FormLabel>
        <MUIRadioGroup
          aria-labelledby={id}
          defaultValue={defaultValue}
          name={name}
          value={value}
          onChange={handleChange}
        >
          {radioList.map((radioItem) => {
            return (
              <FormControlLabel
                className="text-primary"
                key={radioItem.name}
                label={radioItem.label}
                value={radioItem.value}
                control={
                  radioItem.control || <Radio onChange={handleRadioChange} />
                }
              />
            );
          })}
        </MUIRadioGroup>
      </FormControl>
    ),
    [
      defaultValue,
      handleChange,
      handleRadioChange,
      id,
      name,
      radioList,
      title,
      value,
    ]
  );
};

export default RadioGroup;
