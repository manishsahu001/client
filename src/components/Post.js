import React, { useContext, useState, useRef, useEffect } from "react";
import PostItems from "./PostItems";
import PostContext from "../context/PostContext";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import NotFound from './NotFound';

const Post = () => {
  const context = useContext(PostContext);
  const { posts, editPost, getPost } = context;
  const [post, setPost] = useState({etitle: "", edescription: ""});

  const ref = useRef(null);
  const close = useRef(null);
  const navigate = useNavigate(null);

  const onChange = (e)=>{
    setPost({...post,[e.target.name]: e.target.value});
  }

  const updatePost = (currentPost)=>{
    ref.current.click();
    setPost({id: currentPost._id, etitle: currentPost.title, edescription: currentPost.description});
  }

  // Notification alert
  const notify = (msg)=>{
    toast.success(msg, {
      theme: "dark",
      autoClose: 2000
    })
  }
  const onSubmit = (e)=>{
    e.preventDefault();
    editPost(post.id, post.etitle, post.edescription);
    notify("Post Updated!")
    close.current.click();
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      getPost();
    }else{
      // eslint-disable-next-line
      navigate('/login');
    }
  }, [])
  
  
  return (
    <>

        {/* Edit a post  */}
        <>
  {/* Button trigger modal */}
  <button
    type="button"
    className="btn btn-primary d-none"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    ref={ref}
  >
    Launch demo modal
  </button>
  {/* Modal */}
  <div
    className="modal fade" 
    id="exampleModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Edit Post
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">


  <div className="mb-3">
    
    <input
      type="text"
      className="form-control"
      id="exampleFormControlInput1"
      placeholder="Title"
      name="etitle"
      onChange={onChange}
     value={post.etitle}
      
    />
  </div>
  <div className="mb-3">
   
    <textarea
      className="form-control"
      id="exampleFormControlTextarea1"
      rows={10}
      style={{resize: "none"}}
      placeholder="Description"
      name="edescription"
      onChange={onChange}
      value={post.edescription}


    />
  </div>

        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary d-none"
            data-bs-dismiss="modal"
            ref={close}
          >
            Close
          </button>
          <button type="button" className="btn btn-primary" onClick={onSubmit}>
            Update Post
          </button>
        </div>
      </div>
    </div>
  </div>
</>

        {/* Edit post end  */}



      <div className="row">
        {posts.length === 0 && <NotFound />}
        {posts.map((post) => {
          return <PostItems  post={post} key={post._id} updatePost={updatePost} />;
        })}
      </div>
    </>
  );
};

export default Post;
