import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/login.css";
const axios = require('axios');

const Login = () => {

  const navigate = useNavigate();
  const [formState, setFormState] = useState({ userName: "", password: "" });
  const [errors, setErrors] = useState({ userName: false, password: false });
  const [responseState, setResponseState] = useState({ message: "", code: "" });


  const onSubmit = (e) => {
    e.preventDefault();
    if (errors.userName || errors.password) {
      alert("Required fields can not be empty.");
      return;
    }
    else {
      axios.post('http://localhost:3000/login', {
        userName: formState.userName,
        password: formState.password
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
          else if (response.data.status === 3) {
            setResponseState({ message: response.data.message, code: 3 });
          }
        })
        .catch(function (error) {
        })

    }
  }

  return (
    <div className="login-wrapper">
      <div>
        <img src="https://imgyukle.com/f/2022/01/06/oT8TZc.png" className="logo" alt="logo" />
      </div>
      <form>
        {responseState.code === 200 && <div className="success-label">{responseState.message}</div>}
        {(responseState.code === 1 || responseState.code === 2 || responseState.code === 3) && <div className="failure-label">{responseState.message}</div>}
        <h1 style={{ textAlign: "center" }}>Member Login</h1>
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
              if (!!e.target.value && e.target.value.length > 0)
                setErrors({ ...errors, password: false });
              else
                setErrors({ ...errors, password: true });
              setFormState({ ...formState, password: e.target.value });
            }}
          />
        </div>
        <div id="submit-wrapper">
          <button className="submit-button" onClick={(e) => onSubmit(e)} >Login</button>
        </div>
        <div className="register-div">
          <button className="register-button" onClick={() => navigate("/register")} >Create an account</button>
        </div>
      </form>
    </div>
  )
}

export default Login;
