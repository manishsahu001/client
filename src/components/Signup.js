import React, {useState} from 'react'
import '../App.css';
import {toast} from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {


  const navigate = useNavigate();
const notifyA = (msg)=>{
  toast.success(msg, {
    theme: "dark",
    autoClose: 2000
  });
}
const notifyB = (msg)=>{
  toast.error(msg, {
    theme: "dark",
    autoClose: 2000
  })
}
  const [credentials, setCredentials] = useState({name: "", mobile: "", email: "", password: ""});

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const onSubmit = async (e)=>{
    e.preventDefault();

    try {
      
   
    const response = await fetch("http://localhost:4000/api/auth/createuser", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: credentials.name, mobile: credentials.mobile, email: credentials.email, password: credentials.password})
    });

    const json = await response.json();
    if(json.success){
      navigate('/login');
      notifyA("Successfully Registered, now you can login")
    }else{
      notifyB("Failed to registered")
    }
  } catch (error) {
      return notifyB("Internal Server Error");
  }
  }
  return (
    <>
    <div className="form-container">
    <h1>Signup</h1>
      <form className='form' onSubmit={onSubmit}>
      <div>
        <input type="text" name="name" required id="name" placeholder='Enter Your Name' onChange={onChange}/>
      </div>

      <div>
        <input type="text" name="mobile" required id="mobile" placeholder='Enter Your mobile number' onChange={onChange}/>
      </div>

      <div>
        <input type="email" name="email" required id="email" placeholder='Enter Your Email' onChange={onChange}/>
      </div>

      <div>
        <input type="password" name="password" required id="password" placeholder='Enter Your Password' onChange={onChange}/>
      </div>

      <div>
        <button type="submit">Signup</button>
        <p>Already Have Account? <Link to="/login">Login</Link></p>
      </div>
      </form>
    </div>
    </>
  )
}

export default Signup
