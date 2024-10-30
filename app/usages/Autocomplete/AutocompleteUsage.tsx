import { FormikProvider, useFormik } from "formik";
import { useCallback, useMemo } from "react";
import Autocomplete from "../../components/Inputs/Autocomplete";
import top100Films from "../../database/top100Films";

type FormValues = {
  auto_complete?: string;
};

const AutocompleteUsage = () => {
  const handleSubmit = useCallback((value: FormValues) => {
    console.log("value", value);
  }, []);

  const formikBag = useFormik({
    enableReinitialize: true,
    initialValues: { auto_complete: undefined },
    onSubmit: handleSubmit,
  });

  return useMemo(
    () => (
      <FormikProvider value={formikBag}>
        <Autocomplete data={top100Films} name="auto_complete" />
        {/* <Button onClick={() => formikBag.submitForm()}>Click</Button> */}
      </FormikProvider>
    ),
    [formikBag]
  );
};

export default AutocompleteUsage;
