import React from 'react'

const AddBtn = (props) => {
    return (
        <div>
            <form onSubmit={props.addName}>   
            <button type="submit">add</button></form>
        </div>
    )
}

export default AddBtn