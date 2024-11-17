import * as yup from "yup"

const pass = new RegExp('^[a-zA-Z0-9]{3,30}$')

export const schema = yup.object().shape({
    fname : yup.string().min(3, "Too short of a FirstName").required("This field is required"),
    lname : yup.string().min(3, "Too short of a FirstName").required("This field is required"),
    email : yup.string().email().required("I want your email"),
    day : yup.number("ypu cant`t be 'letters old'").min(1).max(31).integer().required(),
    month : yup.number("ypu cant`t be 'letters old'").min(1).max(12).integer().required(),
    year : yup.number("ypu cant`t be 'letters old'").min(1950).max(2024).integer().required(),
    password : yup.string().matches(pass, "Enter a valid password!!!").required("You must enter the password"),
    rpassword : yup.string().oneOf([yup.ref("password"), null], "Password must match").required(),
})