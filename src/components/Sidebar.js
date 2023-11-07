import React, {useRef} from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
const Sidebar = () => {

// Remove the token and redirect to the login page
const navigate = useNavigate();
const notify = (msg)=>{
  toast.success(msg, {
    theme: "dark"
  })
}
  const logout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
    notify("Logout Successfully")

  }
  const ref = useRef("null");
  const closeNav = ()=>{
    ref.current.click();
  }
 
  return (
    <>

      {/* Sider bar code  */}
      <div className="sidebar-container position-sticky top-0" style={{zIndex: 1000}}>
        <button
          className="btn mx-4 my-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div
          className="offcanvas offcanvas-start"
          style={{ width: "25%" }}
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex={-1}
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
        >
          <div className="offcanvas-header text-center">
            {/* <h5 className="offcanvas-title" id="offcanvasScrollingLabel text-center " disabled>
            <Link to="/profile" > <img src={Profile} style={{width: "50px",}} alt="" /> Profile </Link>
            </h5> */}
            <h5 className="offcanvas-title m-auto">
              Note-Buzz
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              ref={ref}
            />
          </div>
          <div className="offcanvas-body d-flex flex-column fw-medium">

            {localStorage.getItem('token') ? <div>
            <Link to="/"  onClick={closeNav}>
              <span className="material-symbols-outlined">home</span>Home
            </Link>

              <Link to='/addpost' onClick={closeNav}>
              <span className="material-symbols-outlined">add_circle</span>Add Post
            </Link> 

            {/* <Link to="/privatepost" onClick={closeNav}>
              <span className="material-symbols-outlined">sticky_note_2</span>
              Private Post
            </Link> */}
            </div> 
            : <div><Link to="/login" onClick={closeNav}>
              <span className="material-symbols-outlined">login</span>Login
            </Link> 
            <Link to="/signup" onClick={closeNav}>
              <span className="material-symbols-outlined">input</span>
              Signup
            </Link></div>}

            {!localStorage.getItem('token') ? "" : <button className="btn btn-outline-secondary" onClick={logout}>
              <span className="material-symbols-outlined">logout</span>Logout
            </button>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
