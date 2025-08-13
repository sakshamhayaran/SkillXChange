import { Link, useNavigate } from "react-router-dom";
import pages_image from "../assets/pages_image.png";
import { useState } from "react";
import { auth, db } from "../Firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Login_Tutor() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginTutor = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const tutorRef = doc(db, "tutors", uid);
      const tutorSnap = await getDoc(tutorRef);
      if (!tutorSnap.exists()) {
        alert("⚠️ You are not registered as a Tutor.");
        await signOut(auth);
        return;
      }
      localStorage.setItem("role", "tutors");
      console.log("Logged in:", uid);
      navigate("/dashboard");
    }
    catch (error) {
      console.error("Error logging tutor:", error.message);
      alert("!! Error Logging Into Your Account !!");
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row items-center md:gap-0 gap-10 justify-center bg-blue-100">
      <div className="md:w-[1/2] w-full">
        <img
          src={pages_image}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="md:w-[1/2] w-full flex items-center justify-center px-10">
        <form className="w-full shadow-lg md:p-10 p-5 flex flex-col gap-5 bg-white rounded-md"
          onSubmit={loginTutor}>
          <h1 className="text-center md:text-3xl text-xl font-bold text-blue-800">Tutor Login</h1>
          <input type="email" placeholder="Enter email" className="p-2 border md:text-md text-sm w-full"
            onChange={(e) => setEmail(e.target.value)} required ></input>
          <input type="password" placeholder="Enter password" className="p-2 border md:text-md text-sm w-full"
            onChange={(e) => setPassword(e.target.value)} required ></input>
          <button className="w-full p-2 bg-blue-800 md:text-md text-sm text-white">Login as Tutor</button>
          <div className="w-full flex justify-center text-sm text-gray-500">
            New user ?{" "}
            <Link to="/register_tutor" className="text-blue-600 font-medium hover:underline ml-1">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login_Tutor