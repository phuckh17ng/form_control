export const RadioGroupSyntax = `
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

`;

export const RadioUsageSyntax = `
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

`;
