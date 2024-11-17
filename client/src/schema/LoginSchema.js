import * as yup from "yup"

const pass = new RegExp('^[a-zA-Z0-9]{3,30}$')

export const schema = yup.object().shape({
    email : yup.string().email().required("I want your email"),
    password : yup.string().matches(pass, "Enter a valid password!!!").required("You must enter the password")
})