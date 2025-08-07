import React from 'react'

function Button({text, bgcolor, textcolor, classes=''}) {
  return (
    <button className={`px-6 py-3 rounded-full font-medium ${textcolor} ${bgcolor} ${classes}`}>
        {text}
    </button>
  )
}

export default Button