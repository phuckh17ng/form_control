import TextField from "@/app/components/Inputs/TextField";
import { passwordValidationSchema } from "@/app/validations/password";
import { FormikProvider, useFormik } from "formik";
import { useCallback } from "react";

type FormValues = {
  old_password?: string | number;
  new_password?: string | number;
  confirm_password?: string | number;
};

const PasswordUsage = () => {
  const handleSubmit = useCallback((value: FormValues) => {
    console.log("value", value);
  }, []);

  const formikBag = useFormik({
    enableReinitialize: true,
    initialValues: {
      old_password: undefined,
      new_password: undefined,
      confirm_password: undefined,
    },
    onSubmit: handleSubmit,
    validationSchema: passwordValidationSchema(),
  });

  return (
    <FormikProvider value={formikBag}>
      <div className="gap-4 w-2/3 flex justify-center items-center flex-col">
        <TextField
          name="old_password"
          type="password"
          label="Old Password"
          className="w-full"
        />
        <TextField
          name="new_password"
          type="password"
          label="New Password"
          className="w-full"
        />
        <TextField
          name="confirm_password"
          type="password"
          label="Confirm Password"
          className="w-full"
        />
      </div>
      {/* <Button onClick={() => formikBag.submitForm()}>Submit</Button> */}
      {/* <div>
            <div className="text-black mb-2">
              old_password: {formikBag.values.old_password}
            </div>
            <div className="text-black mb-2">
              new_password: {formikBag.values.new_password}
            </div>
            <div className="text-black mb-2">
              confirm_password: {formikBag.values.confirm_password}
            </div>
          </div> */}
    </FormikProvider>
  );
};

export default PasswordUsage;
