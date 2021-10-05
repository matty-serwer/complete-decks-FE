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
    .min(10, "Password must be at least 10 characters.")
})