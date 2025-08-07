import Card from "../components/Card";
import { Users, BadgeCheck, CalendarCheck } from "lucide-react";

function Features() {
  return (
    <div id="features" className="w-full bg-blue-50 py-32 px-2 flex flex-col gap-5 justify-center items-center">
      <h1 className="md:text-4xl text-2xl font-bold text-blue-950 text-center"> Why Choose SkillXChange ? </h1>
      <h2 className="md:text-xl text-md font-light text-neutral-600 text-center">Building stronger communities through skill sharing and meaningful connections</h2>

      <div className="max-w-6xl mx-auto grid gap-1 md:gap-10 md:grid-cols-3">

        <Card Icon={Users} iconbgClass={"bg-blue-100 "} iconClass={"text-blue-700"} headText={"Hyperlocal Community"} subText={"Connect with people in your neighborhood. Build lasting relationships while learning new skills together."}
          cardclass={"bg-white "} headClass={"text-gray-800"} subClass={"text-gray-600"} />

        <Card Icon={BadgeCheck} iconbgClass={"bg-blue-100 "} iconClass={"text-blue-700"} headText={"Verified Teachers"} subText={"All our community teachers are verified and rated by fellow neighbors for quality and trust."}
          cardclass={"bg-white "} headClass={"text-gray-800"} subClass={"text-gray-600"} />

        <Card Icon={CalendarCheck} iconbgClass={"bg-blue-100 "} iconClass={"text-blue-700"} headText={"Flexible Learning"} subText={"Learn at your own pace with flexible scheduling that fits your lifestyle and commitments."}
          cardclass={"bg-white "} headClass={"text-gray-800"} subClass={"text-gray-600"} />

      </div>
    </div>
  )
}

export default Features