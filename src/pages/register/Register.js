import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/register.css";
const axios = require('axios');


const Register = () => {

    const navigate = useNavigate();
    const [formState, setFormState] = useState({ userName: "", password: "", verify: "" });
    const [errors, setErrors] = useState({ userName: false, password: false, verify: false, matchError: false });
    const [responseState, setResponseState] = useState({ message: "", code: "" });

    const onSubmit = (e) => {
        e.preventDefault();
        if (errors.userName || errors.password || errors.verify || errors.matchError) {
            alert("Required fields can not be empty.");
            return;
        }
        else {
            axios.post('http://localhost:3000/register', {
                userName: formState.userName,
                password: formState.password,
                verify: formState.verify
            })
                .then(function (response) {
                    if (response.data.status === 0) {
                        setResponseState({ message: response.data.message, code: 200 });
                        setTimeout(() => {
                            navigate("/home");
                        }, 2000);
                    }
                    else if (response.data.status === 1) {
                        setResponseState({ message: response.data.message, code: 1 });
                    }
                    else if (response.data.status === 2) {
                        setResponseState({ message: response.data.message, code: 2 });
                    }
                })
                .catch(function (error) {
                })
        }
    }

    return (
        <div className="register-wrapper">
            <div>
                <img src="https://imgyukle.com/f/2022/01/06/oT8TZc.png" className="logo" alt="logoImg" />
            </div>
            <form>
                {responseState.code === 200 && <div className="success-label">{responseState.message}</div>}
                {(responseState.code === 1 || responseState.code === 2) && <div className="failure-label">{responseState.message}</div>}
                <h1 style={{ textAlign: "center" }}>Sign up for an account</h1>
                <div style={{ maxWidth: "300px", width: "100%" }}>
                    <input
                        className={!errors.userName ? "input-div" : "input-div false"}
                        type="text"
                        placeholder="Username"
                        value={formState.userName}
                        onChange={(e) => {
                            if (!!e.target.value && e.target.value.length > 0)
                                setErrors({ ...errors, userName: false });
                            else
                                setErrors({ ...errors, userName: true });
                            setFormState({ ...formState, userName: e.target.value });
                        }}
                    />

                    <input
                        className={!errors.password ? "input-div" : "input-div false"}
                        type="password"
                        placeholder="Password"
                        value={formState.password}
                        onChange={(e) => {
                            if (!!e.target.value && e.target.value.length > 0) {
                                setErrors({ ...errors, password: false });
                                if (e.target.value === formState.verify) {
                                    setErrors({ ...errors, matchError: false })
                                }
                                else {
                                    setErrors({ ...errors, matchError: true })
                                }
                            }
                            else
                                setErrors({ ...errors, password: true });
                            setFormState({ ...formState, password: e.target.value });
                        }}
                    />
                    <input
                        className={(errors.verify || errors.matchError) ? "input-div false" : "input-div"}
                        type="password"
                        placeholder="Verify Password"
                        value={formState.verify}
                        onChange={(e) => {
                            if (!!e.target.value && e.target.value.length > 0) {
                                if (e.target.value === formState.password) {
                                    setErrors({ ...errors, matchError: false, verify: false })
                                }
                                else {
                                    setErrors({ ...errors, matchError: true, verify: false })
                                }
                            }
                            else
                                setErrors({ ...errors, verify: true });
                            setFormState({ ...formState, verify: e.target.value });
                        }}
                    />
                    {errors.matchError &&
                        <label style={{ color: "red", padding: "6px 10px" }}>
                            Passwords must match!
                        </label>
                    }
                </div>
                <div id="submit-wrapper">
                    <button className="submit-button" onClick={(e) => onSubmit(e)} >Create account</button>
                </div>

            </form>
        </div>
    )
}

export default Register;
