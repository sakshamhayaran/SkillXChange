
function Button({onClick, text, bgcolor, textcolor, classes=''}) {
  return (
    <button onClick={onClick} className={`px-6 py-3 rounded-full font-medium ${textcolor} ${bgcolor} ${classes}`}>
        {text}
    </button>
  )
}

export default Button