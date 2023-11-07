import React, {useState, useContext} from "react";
import PostContext from "../context/PostContext";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
const AddPost = () => {
    const context = useContext(PostContext);
    const {addPost} = context;
    const [post, setPost] = useState({title: "", description: ""});

    const onChange = (e)=>{
        setPost({...post, [e.target.name] : e.target.value})
    }

    const notify = (msg)=>{
     toast.success(msg, {
      theme: "dark",
     })
    }

    const navigate = useNavigate();
    const onSubmit = (e)=>{
        e.preventDefault();
        addPost(post.title, post.description);
        notify("Post Added");
        navigate('/');
    }

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ width: "100%" }}
      >
        <div style={{ width: "70%" }}>
          <form onSubmit={onSubmit}>
            <div className="mb-3 my-5">
              <h1>Add New Post</h1>

              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Title"
                name="title"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <textarea style={{resize: "none"}}
                className="form-control"
                id="description"
                rows={10}
                
                placeholder="Write Description Here...."
                name="description"
                onChange={onChange}
              />
            </div>
            <button type='submit' className="btn btn-primary mx-2 my-3"  onSubmit={onSubmit}>Post</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPost;
