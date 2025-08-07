function Card({ Icon, iconText, iconbgClass, iconClass, headText, subText, cardclass, headClass, subClass }) {
  return (
    <div className={`rounded-2xl shadow-md p-6 flex items-center justify-center gap-4 hover:scale-105 transition-transform duration-500 ${cardclass}`}>
      <div className={`p-3 flex items-center justify-center rounded-full ${iconbgClass}`}>
        {Icon && (<Icon strokeWidth={3} className={`w-15 h-15 ${iconClass}`} />)}
        {iconText}
      </div>
      <div>
        <h3 className={`md:text-lg text-sm font-semibold mb-3 text-gray-800 ${headClass}`}>
          {headText}
        </h3>
        <p className={`md:text-sm text-xs text-gray-600 ${subClass}`}>
          {subText}
        </p>
      </div>
    </div>
  )
}

export default Card