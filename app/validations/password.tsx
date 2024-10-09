import { object, ref, string } from "yup";

export const passwordValidationSchema = () => {
  return object().shape({
    old_password: string().required("Old password is required"),
    new_password: string()
      .required("No password provided")
      .min(8, "Password is too short - should be 8 chars minimum")
      .max(16, "Password is too long - should be 16 chars maximum")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        "Password must contain one uppercase, one lowercase"
      )
      .test(
        "noSpecialChars",
        "Password must not contain special characters",
        (value) => {
          // Regular expression for special characters
          const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
          return !specialCharsRegex.test(value);
        }
      )
      .notOneOf(
        [ref("old_password")],
        "The new password must not be the same as the old password"
      ),
    confirm_password: string().oneOf(
      [ref("new_password")],
      "Passwords must match"
    ),
  });
};
