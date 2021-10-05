import * as yup from "yup";

export default yup.object().shape({
  email: yup
    .string()
    .required("You must enter an email address.")
    .email("Must be valid email address."),
  username: yup
    .string()
    .required("A username is required."),
  password: yup
    .string()
    .required()
    .min(10, "Password must be at least 10 characters.")
    .matches(/.*[0-9].*/, "Password must contain at least one number.")
    .matches(/(?=.*[!@#\$%\^&\*])/, "Password must contain one special character."),
  givenName: yup
    .string()
    .required("Please enter your first Name"),
  familyName: yup
    .string()
    .required("Please enter your first Name"),
})