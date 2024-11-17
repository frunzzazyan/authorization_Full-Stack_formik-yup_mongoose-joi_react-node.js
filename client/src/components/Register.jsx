import { Formik } from "formik"
import { schema } from "../schema/RegisterSchema"
import {Link} from "react-router-dom"
 
import "./styles/Register.css"

const initialValues = {
    fname: "",
    lname: "",
    email: "",
    day: "",
    month: "",
    year: "",
    password: "",
    rpassword: ""
}

function mySubmit(values,{resetForm}){

function calculateAge(values) {
    const birthDate = new Date(values.year, values.month - 1, values.day); // JavaScript-ում ամիսները սկսվում են 0-ից
    const currentDate = new Date();
    
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    
    const isBirthdayPassed = 
        currentDate.getMonth() > birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate());

    if (!isBirthdayPassed) {
        age -= 1; 
    }

    return age;
}

const ageUser = calculateAge(values);

if(ageUser >= 18){
    let newObj = {
        fname : values.fname,
        lname : values.lname,
        email : values.email,
        age : ageUser,
        password : values.password,
        rpassword : values.rpassword
    }

    fetch("http://localhost:3000/auth/register", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(newObj)
    })
    resetForm()
}else{
    resetForm()
}

}

const Register = () => {
    return (
        <>
            <Formik initialValues={initialValues} validationSchema={schema} onSubmit={mySubmit}>
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
                    return <form className="register" action="" onSubmit={handleSubmit}>
                        <a className="google" href="http://localhost:3000/auth/google">Google</a>
                        <div className="name">
                            <div className="input-div">
                                <input style={{ borderColor: (errors.fname && touched.fname ? "crimson" : "black") }} onChange={handleChange} onBlur={handleBlur} value={values.fname} type="text" placeholder="first_name" name="fname" id="fname" />
                                <span>{errors.fname && touched.fname ? errors.fname : ""}</span>
                            </div>
                            <div className="input-div">
                                <input style={{ borderColor: (errors.lname && touched.lname ? "crimson" : "black") }} onChange={handleChange} onBlur={handleBlur} value={values.lname} type="text" placeholder="last_name" name="lname" id="lname" />
                                <span>{errors.lname && touched.lname ? errors.lname : ""}</span>
                            </div>
                        </div>
                        <div className="input-div">
                            <input style={{ borderColor: (errors.email && touched.email ? "crimson" : "black") }} onChange={handleChange} onBlur={handleBlur} type="email" placeholder="email" name="email" id="email" />
                            <span>{errors.email && touched.email ? errors.email : ""}</span>
                        </div>
                        <div className="age">
                            <div className="input-div">
                                <input style={{ borderColor: (errors.day && touched.day ? "crimson" : "black") }} onChange={handleChange} onBlur={handleBlur} value={values.day} type="number" placeholder="day" name="day" id="day" />
                                <span>{errors.day && touched.day ? errors.day : ""}</span>
                            </div>
                            <div className="input-div">
                                <input style={{ borderColor: (errors.month && touched.month ? "crimson" : "black") }} onChange={handleChange} onBlur={handleBlur} value={values.month} type="number" placeholder="month" name="month" id="month" />
                                <span>{errors.month && touched.month ? errors.month : ""}</span>
                            </div>
                            <div className="input-div">
                                <input style={{ borderColor: (errors.year && touched.year ? "crimson" : "black") }} onChange={handleChange} onBlur={handleBlur} value={values.year} type="number" placeholder="year" name="year" id="year" />
                                <span>{errors.year && touched.year ? errors.year : ""}</span>
                            </div>
                        </div>
                        <div className="input-div">
                            <input style={{ borderColor: (errors.password && touched.password ? "crimson" : "black") }} onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" placeholder="password" name="password" id="password" />
                            <span>{errors.password && touched.password ? errors.password : ""}</span>
                        </div>
                        <div className="input-div">
                            <input style={{ borderColor: (errors.rpassword && touched.rpassword ? "crimson" : "black") }} onChange={handleChange} onBlur={handleBlur} value={values.rpassword} type="password" placeholder="password" name="rpassword" id="rpassword" />
                            <span>{errors.rpassword && touched.rpassword ? errors.rpassword : ""}</span>
                        </div>
                        <input disabled={!!Object.keys(errors).length} type="submit" value="Register"/>
                    </form>
                }}
            </Formik>
        </>
    )
}

export default Register