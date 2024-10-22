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
    document.documentElement.style.filter = `brightness(${brightness})`;
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
