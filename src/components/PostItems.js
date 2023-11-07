import React, {useContext} from "react";
import PostContext from "../context/PostContext";
import {toast} from 'react-toastify';
import '../App.css'
const PostItems = (props) => {

    const context = useContext(PostContext);
    const {deletePost} = context;
    const {post, updatePost} = props;

    const notifyS = (msg)=>{
      toast.success(msg, {
        theme: 'dark',
        autoClose: 2000
      })
    }

    const notifyE = (msg)=>{
      toast.error(msg, {
        theme: 'dark',
        autoClose: 2000
      })
    }

  return (
    <>
    <div className="container col-md-4 my-2">
      <div className="card text-bg-light mb-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={{minHeight: "250px"}}>
        <div className="card-header d-flex justify-content-evenly align-items-center">
            {post.user}
            <div>
                <button className="btn" onClick={()=>{updatePost(post)}}>
                <span className="material-symbols-outlined">edit</span>
                </button>
                <button className="btn" onClick={()=>{
                  deletePost(post._id);
                  if(post._id){
                    return notifyS("Post deleted Successfully");
                  }else{
                    return notifyE("Post not deleted")
                  }
                  }}>
                  <span className="material-symbols-outlined">delete</span>
                  </button>
            </div>
        </div>
        <div className="card-body d-flex align-items-center flex-column">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">
            {post.description}
          </p>
        <small className="text-body-secondary">{post.timestamp}</small>
        </div>
      </div>
    </div>
    </>
  );
};

export default PostItems;
