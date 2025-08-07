import Card from "../components/Card";

function Skills() {
    return (
        <div id="skills" className="w-full bg-white py-32 px-2 flex flex-col gap-5 justify-center items-center">
            <h1 className="md:text-4xl text-2xl font-bold text-blue-950 text-center"> Popular Skills </h1>
            <h2 className="md:text-xl text-md font-light text-neutral-600 text-center">Discover what your neighbors are teaching and learning</h2>

            <div className="max-w-6xl w-full mx-auto justify-cecnter grid gap-5 md:gap-10 grid-cols-3 lg:grid-cols-5">

                <Card iconbgClass={"bg-blue-50 text-3xl"} iconText={"🧘‍♀️"} iconClass={"text-blue-700"} headText={"Yoga"}
                    cardclass={"bg-blue-100 flex-col text-center"} headClass={""} subClass={"text-gray-600"} />

                <Card iconbgClass={"bg-blue-50 text-3xl"} iconText={"💻"} iconClass={"text-blue-700"} headText={"Coding"}
                    cardclass={"bg-blue-100 flex-col text-center"} headClass={""} subClass={"text-gray-600"} />

                <Card iconbgClass={"bg-blue-50 text-3xl"} iconText={"👨‍🍳"} iconClass={"text-blue-700"} headText={"Cooking"}
                    cardclass={"bg-blue-100 flex-col text-center"} headClass={""} subClass={"text-gray-600"} />

                <Card iconbgClass={"bg-blue-50 text-3xl"} iconText={"🎤"} iconClass={"text-blue-700"} headText={"Speaking"}
                    cardclass={"bg-blue-100 flex-col text-center"} headClass={""} subClass={"text-gray-600"} />

                <Card iconbgClass={"bg-blue-50 text-3xl"} iconText={"💃"} iconClass={"text-blue-700"} headText={"Dance"}
                    cardclass={"bg-blue-100 flex-col text-center"} headClass={""} subClass={"text-gray-600"} />

            </div>
        </div>
    )
}

export default Skills