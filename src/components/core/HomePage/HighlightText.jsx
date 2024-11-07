import React from 'react'


const HighlightText = (props) => {
    const text = props.text;
  return (
    <span className=' text-caribbeangreen-50 '>
        {" "}
        {text}
    </span>
  )
}

export default HighlightText