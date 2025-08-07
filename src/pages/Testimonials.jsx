import Card from "../components/Card";

function Testimonials() {
  return (
    <div id="testimonials" className="w-full bg-blue-400 py-32 px-2 flex flex-col gap-5 justify-center items-center">
       <h1 className="md:text-4xl text-2xl font-bold  text-white text-center">Testimonials</h1>
       <h2 className="md:text-xl text-md font-light text-white text-center">Real experiences from our SkillXChanges's community members</h2>
       
       <div className="max-w-6xl mx-auto grid gap-1 md:gap-10 md:grid-cols-3">
        
        <Card iconText={"S" } iconbgClass={"bg-white bg-opacity-10 text-white backdrop-blur-md text-2xl font-semibold"} iconClass={""} headText={"Sagar Mishra"} subText={"Learning yoga from Meera aunty next door has been amazing! She's so patient and the classes are right in our building's garden."} 
        cardclass={"bg-white bg-opacity-10 text-white backdrop-blur-md"} headClass={"text-white"} subClass={"text-white"}/>
        
        <Card iconText={"A"} iconbgClass={"bg-white bg-opacity-10 text-white backdrop-blur-md text-2xl font-semibold"} iconClass={""} headText={"Aditya Thakur"} subText={"Teaching Python to my neighbors has been so rewarding. It's wonderful to see kids from my area getting excited about programming"} 
        cardclass={"bg-white bg-opacity-10 text-white backdrop-blur-md"} headClass={"text-white"} subClass={"text-white"}/>

        <Card iconText={"U"} iconbgClass={"bg-white bg-opacity-10 text-white backdrop-blur-md text-2xl font-semibold"} iconClass={""} headText={"Udit Mishra"} subText={"I've learned 5 different regional cuisines from neighbors in my society. Each cooking session feels like a cultural celebration!"} 
        cardclass={"bg-white bg-opacity-10 text-white backdrop-blur-md"} headClass={"text-white"} subClass={"text-white"}/>

       </div>
    </div>
  )
}

export default Testimonials