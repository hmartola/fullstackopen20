import React from 'react'

const PersonDisplay = (props) => {
    return (
    <form>
    <div>name: <input value={props.newName}
        onChange={props.handleNameEdit}/></div>
    <div>number: <input value={props.newNumber}
        onChange={props.handleNumberEdit}/>
    </div>
    </form>
    )
}

export default PersonDisplay