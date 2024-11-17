import { Formik } from "formik"
import { schema } from "../schema/LoginSchema"

import "./styles/Login.css"
const initialValues = {
    email: "",
    password: ""
}

function mySubmit(values,action){
    fetch("http://localhost:3000/auth/login", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(values)
    })
    .then((res)=>res.json()).then(res=>localStorage.setItem("token", res.token))

    // fetch("http://localhost:3000/auth/login", {
    //     method : "GET",
    //     headers : {
    //         "Authorization" : localStorage.getItem("token")
    //     },
    // })
    // .then((res)=>res.json()).then(console.log)
    
}

const Login = () => {
  return (
    <>
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={mySubmit}>
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
                    return <form className="login" action="" onSubmit={handleSubmit}>
                        <a className="google" href="http://localhost:3000/auth/google">Google</a>
                        <div className="input-div">
                            <input style={{ borderColor: (errors.email && touched.email ? "crimson" : "black") }} onChange={handleChange} onBlur={handleBlur} type="email" placeholder="email" name="email" id="email" />
                            <span>{errors.email && touched.email ? errors.email : ""}</span>
                        </div>
                        <div className="input-div">
                            <input style={{ borderColor: (errors.password && touched.password ? "crimson" : "black") }} onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" placeholder="password" name="password" id="password" />
                            <span>{errors.password && touched.password ? errors.password : ""}</span>
                        </div>
                        <input disabled={!!Object.keys(errors).length} type="submit" value="Login"/>
                    </form>
                }}
            </Formik>
    </>
  )
}

export default Login