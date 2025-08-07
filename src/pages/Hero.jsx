import Button from "../components/Button";
import hero_image from "../assets/hero_image.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section id="hero" className="min-h-[60vh] md:min-h-[85vh] flex flex-col md:flex-row items-center justify-center bg-indigo-800 text-white px-4">

      <div className="w-full md:w-1/2 h-64 md:h-full flex items-center justify-center">
        <img
          src={hero_image}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full md:w-1/2 text-center flex flex-col gap-7 pb-10 md:pb-0">
        <div>
          <h1 className="md:text-5xl text-3xl font-bold">
            Exhange Skills with People Around You
          </h1>
          <h2 className="md:text-xl text-md font-light">
            Find local mentors. Teach what you love. Learn what you need.
          </h2>
        </div>
        <p className="md:text-lg text-sm">
          Connect with neighbors who share your passion for learning. From yoga to coding, cooking to public speaking – discover skills right in your neighborhood.
        </p>
        <div className="flex flex-wrap gap-5 items-center justify-center">
          <Link to="/register_learner">
            <Button text="Learn Skills" textcolor="text-white" classes="border-2 border-white md:text-xl text-md hover:text-indigo-800 hover:bg-white shadow-2xl hover:scale-105 transition-transform duration-500" />
          </Link>
          <Link to="/register_tutor">
            <Button text="Teach Skills" textcolor="text-white" classes="border-2 border-white md:text-xl text-md hover:text-indigo-800 hover:bg-white shadow-2xl hover:scale-105 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero