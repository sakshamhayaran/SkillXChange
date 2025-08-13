function UsersCard({ alpha , name , loc , skl }) {
    return (
        <div className={`rounded-2xl shadow-md p-5 flex flex-col items-center justify-center gap-5 hover:scale-105 transition-transform duration-500`}>
            <div className={`flex items-center justify-center w-full`}>
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white text-xl font-bold flex items-center justify-center">{alpha}</div>
            </div>
            <div className="flex flex-col text-center">
                <h3 className={`md:text-lg text-sm font-semibold text-gray-800 `}>
                    {name}
                </h3>
                <p className={`md:text-sm text-xs text-gray-600`}>
                    {loc}
                </p>
                <p className={`md:text-sm text-xs`}>{skl}</p>
            </div>
        </div>
    )
}

export default UsersCard