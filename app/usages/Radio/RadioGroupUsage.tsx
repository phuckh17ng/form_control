import RadioGroup from "@/app/components/Inputs/Radio";
import { RadioProps } from "@/app/components/Inputs/Radio/RadioGroup";
import { Radio } from "@mui/material";
import { pink } from "@mui/material/colors";
import { FormikProvider, useFormik } from "formik";
import { ChangeEvent, useCallback, useMemo, useState } from "react";

type FormValues = {
  gender?: string;
};

const RadioGroupUsage = () => {
  // State
  const [gender, setGender] = useState<string>();

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
      gender: undefined,
    },
    onSubmit: handleSubmit,
  });

  /**
   * Handle radio change callback
   * @param event: ChangeEvent<HTMLInputElement>
   */
  const handleRadioChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGender(event.target.value);
    },
    []
  );

  /**
   * Render text when radio is changed
   */
  const renderText = useMemo(() => {
    if (gender === "female") {
      return "Hello Beauty!";
    }
    if (gender === "male") {
      return "Hello Handsome!";
    }
    if (gender === "other") {
      return "Hi There!";
    }
  }, [gender]);

  /**
   * List of radio
   */
  const radioList: Array<RadioProps> = useMemo(
    () => [
      {
        label: "Female",
        name: "female",
        value: "female",
        control: (
          <Radio
            onChange={handleRadioChange}
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
        ),
      },
      { label: "Male", name: "male", value: "male" },
      { label: "Other", name: "other", value: "other" },
    ],
    [handleRadioChange]
  );

  return useMemo(
    () => (
      <FormikProvider value={formikBag}>
        <div className="flex flex-col flex-1 justify-center items-center">
          <RadioGroup
            id="radio_gender"
            name="gender"
            title="Gender"
            radioList={radioList}
            handleRadioChange={handleRadioChange}
          />
          {gender && <p className="mt-6 text-black">{renderText}</p>}
        </div>
      </FormikProvider>
    ),
    [formikBag, gender, handleRadioChange, radioList, renderText]
  );
};

export default RadioGroupUsage;
