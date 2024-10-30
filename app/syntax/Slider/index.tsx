export const SliderSyntax = `
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
`;

export const SliderUsageSyntax = `
import Slider from "@/app/components/Inputs/Slider";
import { FormikProvider, useFormik } from "formik";
import { useCallback, useMemo } from "react";

type FormValues = {
  brightness: number | number[];
};

const SliderUsage = () => {
  /**
   * Handle form submit
   * @param values: FormValues
   */
  const handleSubmit = useCallback((value: FormValues) => {
    console.log("value", value);
  }, []);

  /**
   * useFormik hook
   */
  const formikBag = useFormik({
    enableReinitialize: true,
    initialValues: {
      brightness: 100,
    },
    onSubmit: handleSubmit,
  });

  /**
   * Handle slider changed callback
   * @param event: ChangeEvent<HTMLInputElement>
   */
  const handleSliderChange = useCallback((value: number | number[]) => {
    let brightness = (value as number) / 100;
    if ((value as number) / 100 < 0.3) {
      brightness = 0.3;
    }
    document.documentElement.style.filter = brightness;
  }, []);

  return useMemo(
    () => (
      <FormikProvider value={formikBag}>
        <div className="w-2/3">
          <Slider
            name="brightness"
            onChangeCallback={handleSliderChange}
            className="w-full"
          />
        </div>
      </FormikProvider>
    ),
    [formikBag, handleSliderChange]
  );
};

export default SliderUsage;

`;
