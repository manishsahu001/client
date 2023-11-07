import React from 'react'

const NotFound = () => {

  const mystyle = {
    fontSize: "42px",
    color: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  }
  return (
    <div style={mystyle}>No Post Found</div>
  )
}

export default NotFound