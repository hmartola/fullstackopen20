import React from 'react'

const Filter = (props) => {
    return (
    <div>
        search name: <input value={props.filter}
        onChange={props.onChange}/>
    </div>
    )
}

export default Filter