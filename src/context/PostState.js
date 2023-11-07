import { useState } from "react";
import PostContext from "./PostContext";

const PostState = (props) => {
  const initialPost = [];

  const [posts, setPosts] = useState(initialPost);

  // Get all the post
  const getPost = async()=>{
    console.log("Get post");
    const response = await fetch("http://localhost:4000/api/post/fetchallpost", {
      method: "GET",
      headers:{

        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setPosts(json);
  }
  // Adding Post
  const addPost = async (title, description) => {

    const response = await fetch("http://localhost:4000/api/post/addpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description})
    });

    const post = await response.json();
    setPosts(posts.concat(post));
  };

  // Edit post
  const editPost = async (id, title, description) => {
    console.log("Updating the post");

    const response = await fetch(`http://localhost:4000/api/post/updatepost/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description})
    });

    const newPost = await JSON.parse(JSON.stringify(posts))

    for (let index = 0; index < newPost.length; index++) {
      const element = newPost[index];
      if (element._id === id) {
        newPost[index].title = title;
        newPost[index].description = description;
        break;
      }
    }
    setPosts(newPost);
  };

  // Delete post
  const deletePost = async (id) => {
    console.log("Deleting post with id " + id);

    const response = await fetch(`http://localhost:4000/api/post/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    // const newPost = await response.json();
    const newPost = posts.filter((post) => {
      return post._id !== id;
    });
    setPosts(newPost);
  };
  return (
    <PostContext.Provider
      value={{ posts, setPosts, addPost, deletePost, editPost, getPost }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
