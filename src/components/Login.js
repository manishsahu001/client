import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const notifyA = (msg) => {
    toast.success(msg, {
      theme: "dark",
      autoClose: 2000
    });
  };
  const notifyB = (msg) => {
    toast.error(msg, {
      theme: "dark",
      autoClose: 2000
    });
  };
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = async (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      if (json.success === true) {
        localStorage.setItem("token", json.authToken);
        notifyA("Login Success");
        navigate("/");
      } else {
        notifyB("Some Error Occured!");
      }

    } catch (error) {
      console.log(error);
      return notifyB("Internal Server Error", error)
    }
  };
  return (
    <div>
      <div className="form-container">
        <h1>Login</h1>
        <form className="form">
          <div>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter Your Email"
              onChange={onChange}
            />
          </div>

          <div>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter Your Password"
              onChange={onChange}
            />
          </div>

          <div>
            <button type="button" onClick={onSumbit}>
              Login
            </button>
            <p>
              Don't Have Account? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
