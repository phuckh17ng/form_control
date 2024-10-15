import { Slider as MUISlider, SliderProps } from "@mui/material";
import { useField } from "formik";
import { useCallback, useMemo, useState } from "react";

type Props = {
  label?: string;
  name: string;
  onChangeCallback?: (value: number | number[]) => void;
  defaultValue?: number | number[];
} & SliderProps;

const Slider = (props: Props) => {
  // Props
  const { label, name, onChangeCallback, defaultValue, ...rest } = props;

  //State
  const [value, setValue] = useState<number | number[]>(defaultValue || 0);

  // Formik hooks
  const [, , helper] = useField(name);

  /**
   * Handle slider changeds
   * @param event: Event
   * @param newValue: number | number[]
   */
  const handleChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setValue(newValue as number);
      helper.setValue(newValue);
      // onChange callback
      onChangeCallback && onChangeCallback(newValue);
    },
    [helper, onChangeCallback]
  );

  return useMemo(
    () => (
      <MUISlider
        {...rest}
        aria-label={label}
        name={name}
        value={value}
        onChange={handleChange}
      />
    ),
    [handleChange, label, name, rest, value]
  );
};

export default Slider;
