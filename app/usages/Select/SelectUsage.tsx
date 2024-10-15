import Select from "@/app/components/Inputs/Select";
import { MenuItem } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

type FormValues = {
  country?: string;
};

const optionList = [
  {
    label: "Viet Nam",
    value: "VN",
    control: (
      <MenuItem key="VN" value="VN">
        <div className="flex items-center">
          <Image
            src={require("../../assets/images/vietnam.png")}
            height={24}
            alt="flag"
          />
          <p className="ml-2">Viet Nam</p>
        </div>
      </MenuItem>
    ),
  },
  {
    label: "China",
    value: "CN",
    control: (
      <MenuItem key="CN" value="CN">
        <div className="flex items-center">
          <Image
            src={require("../../assets/images/china.png")}
            height={24}
            alt="flag"
          />
          <p className="ml-2">China</p>
        </div>
      </MenuItem>
    ),
  },
  {
    label: "United States",
    value: "US",
    control: (
      <MenuItem key="US" value="US">
        <div className="flex items-center">
          <Image
            src={require("../../assets/images/united-states.png")}
            height={24}
            alt="flag"
          />
          <p className="ml-2">United States</p>
        </div>
      </MenuItem>
    ),
  },
  {
    label: "France",
    value: "FR",
    control: (
      <MenuItem key="FR" value="FR">
        <div className="flex items-center">
          <Image
            className="rounded ml-1"
            src={require("../../assets/images/france.png")}
            height={20}
            alt="flag"
          />
          <p className="ml-2.5">France</p>
        </div>
      </MenuItem>
    ),
  },
  {
    label: "Japan",
    value: "JP",
    control: (
      <MenuItem key="JP" value="JP">
        <div className="flex items-center">
          <Image
            src={require("../../assets/images/japan.png")}
            height={24}
            alt="flag"
          />
          <p className="ml-2">Japan</p>
        </div>
      </MenuItem>
    ),
  },
  {
    label: "South Korea",
    value: "KR",
    control: (
      <MenuItem key="KR" value="KR">
        <div className="flex items-center">
          <Image
            src={require("../../assets/images/south-korea.png")}
            height={24}
            alt="flag"
          />
          <p className="ml-2">South Korea</p>
        </div>
      </MenuItem>
    ),
  },
];

const SelectUsage = () => {
  // State
  const [country, setCountry] = useState<string | number>();

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
      country: undefined,
    },
    onSubmit: handleSubmit,
  });

  /**
   * Handle select option changed callback
   * @param value: string | number
   */
  const handleSelectOption = useCallback((value: string | number) => {
    setCountry(value);
  }, []);

  /**
   * Render text when select option changed
   */
  const renderText = useMemo(() => {
    switch (country) {
      case "VN":
        return "Xin Chào!";
      case "CN":
        return "你好!";
      case "US":
        return "Hello!";
      case "FR":
        return "Bonjour!";
      case "JP":
        return "こんにちは!";
      case "KR":
        return "안녕하세요!";
      default:
    }
  }, [country]);

  return (
    <FormikProvider value={formikBag}>
      <div className="flex flex-col justify-center items-center w-2/3">
        <Select
          name="country"
          label="Country"
          labelId="country_label"
          onOptionChange={handleSelectOption}
          optionList={optionList}
        />
        {country && <p className="mt-6 text-black">{renderText}</p>}
      </div>
    </FormikProvider>
  );
};

export default SelectUsage;
