import React from 'react'

 const Names = ({ names, delName }) => {
   // <DeleteBtn DeleteBtn={names.name}/>
    return (
   <p> {names.name} {names.number} <button onClick={delName}>delete</button></p>
    
    )
  }

  export default Names