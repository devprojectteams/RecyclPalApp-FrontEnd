
import { React, useState } from "react";
//import RecyclPalTopNav from "../../dashboard/components/RecyclPalTopNav";
import "./../login/Login2.css";

const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handChangeEmail = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "email" && password === "password") {
      console.log("Successful");
    } else console.log("Invalid Email or Password");
  };

  return (
    <recyclPalTopNav
      content={
        <div className="login-page ">
          <div className="sign-in">
            <div>
              <p>
                Welcome to <span>RecyclPal</span>
              </p>
              <h1 className="b">Sign in</h1>
            </div>
            <div className="account">
              <p>No account ?</p>
              <>
                <span>Sign up</span>
              </>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="email">
              <label htmlFor="email">Enter your email address</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={handChangeEmail}
                placeholder="example@gmail.com"
              />
            </div>
            <div className="password">
              <label htmlFor="password">Enter your password</label>
              <input
                type="text"
                id="password"
                value={password}
                onChange={handleChangePassword}
                placeholder="Enter your password"
              ></input>
            </div>
          </form>
          <a href="#">Forgot password</a>
          <button onClick={handleSubmit}>Sign in</button>
        </div>
      }
    />
  );
};

export default Login;