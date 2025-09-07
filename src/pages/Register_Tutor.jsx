import { Link, useNavigate } from "react-router-dom";
import pages_image from "../assets/pages_image.png";
import Select from 'react-select';
import { useState } from "react";
import { auth, db } from "../Firebase/firebase";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Register_Tutor() {

    const skillOptions = [
        { value: 'Acting', label: 'Acting' },
        { value: 'App Development', label: 'App Development' },
        { value: 'Coding', label: 'Coding' },
        { value: 'Cooking', label: 'Cooking' },
        { value: 'Dance', label: 'Dance' },
        { value: 'Drawing', label: 'Drawing' },
        { value: 'Fitness Training', label: 'Fitness Training' },
        { value: 'Game Development', label: 'Game Development' },
        { value: 'Graphic Design', label: 'Graphic Design' },
        { value: 'Martial Arts', label: 'Martial Arts' },
        { value: 'Nutrition & Diet', label: 'Nutrition & Diet' },
        { value: 'Painting', label: 'Painting' },
        { value: 'Photography', label: 'Photography' },
        { value: 'Public Speaking', label: 'Public Speaking' },
        { value: 'Self Defense', label: 'Self Defense' },
        { value: 'Singing', label: 'Singing' },
        { value: 'UI/UX design', label: 'UI/UX Design' },
        { value: 'Video Editing', label: 'Video Editing' },
        { value: 'Web Development', label: 'Web Development' },
        { value: 'Yoga', label: 'Yoga' },
        { value: 'Zumba', label: 'Zumba' }
    ];

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [skills, setSkills] = useState([]);
    const [bio, setBio] = useState('');

    const navigate = useNavigate();

    const registerTutor = async (e) => {
        e.preventDefault();
        try {
            let uid;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            uid = userCredential.user.uid;
            console.log("Tutor Registered:", uid);
            await setDoc(doc(db, "tutors", uid), {
                uid,
                fullName,
                email,
                address,
                skills,
                bio,
                createdAt: new Date()
            });
            console.log("Tutor data stored in Firestore:", uid);
            navigate("/login_tutor");

        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                console.log("Email already exists, adding tutor role...");
                try {
                    const existingUser = await signInWithEmailAndPassword(auth, email, password);
                    const uid = existingUser.user.uid;
                    const tutorRef = doc(db, "tutors", uid);
                    const tutorSnap = await getDoc(tutorRef);
                    if (tutorSnap.exists()) {
                        alert("⚠️ You have already registered as a tutor");
                        return;
                    }
                    await setDoc(doc(db, "tutors", uid), {
                        uid,
                        fullName,
                        email,
                        address,
                        skills,
                        bio,
                        createdAt: new Date()
                    });
                    console.log("Tutor role added for existing user:", uid);
                    navigate("/login_tutor");
                } catch (signInError) {
                    console.error("Error signing in existing user:", signInError.message);
                    alert("⚠️ Incorrect password for existing account. Please use the same password as the Learner login.");
                }
            } else {
                console.error("Error registering tutor:", error.message);
                alert("❌ " + (error.message || "Error Registering Your Account"));
            }
        }
    };


    return (
        <div className="min-h-screen w-screen flex flex-col md:flex-row items-center md:gap-0 gap-10 justify-center bg-blue-100">
            <div className="md:w-[1/2] w-full">
                <img
                    src={pages_image}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="md:w-[1/2] w-full flex items-center justify-center px-10 mb-5 md:mb-0">
                <form className="w-full shadow-lg md:p-10 p-5 flex flex-col gap-5 bg-white rounded-md"
                    onSubmit={registerTutor}
                >
                    <h1 className="text-center md:text-3xl text-xl font-bold text-blue-800">Tutor Register</h1>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                        <label className="w-full md:w-1/4 font-medium md:text-md text-sm text-gray-700">Full Name : </label>
                        <input type="text" placeholder="Enter name" className="p-2 border md:text-md text-sm w-full md:w-3/4 rounded"
                            onChange={(e) => setFullName(e.target.value)} required />
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                        <label className="w-full md:w-1/4 font-medium md:text-md text-sm text-gray-700">Email : </label>
                        <input type="email" placeholder="Enter email" className="p-2 border md:text-md text-sm w-full md:w-3/4 rounded"
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                        <label className="w-full md:w-1/4 font-medium md:text-md text-sm text-gray-700">Password : </label>
                        <input type="password" placeholder="Set password" className="p-2 border md:text-md text-sm w-full md:w-3/4 rounded"
                            onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                        <label className="w-full md:w-1/4 font-medium md:text-md text-sm text-gray-700">Address : </label>
                        <input type="text" placeholder="Enter full Address" className="p-2 border md:text-md text-sm w-full md:w-3/4 rounded"
                            onChange={(e) => setAddress(e.target.value)} required />
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                        <label className="w-full md:w-1/4 font-medium md:text-md text-sm text-gray-700">Skills Interested In : </label>
                        <div className="w-full md:w-3/4 md:text-md text-sm">
                            <Select
                                options={skillOptions}
                                isMulti
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder="Select skills"
                                onChange={(skills) => setSkills(skills.map(option => option.value))}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                        <label className="w-full md:w-1/4 font-medium md:text-md text-sm text-gray-700">Short Bio : </label>
                        <textarea
                            placeholder="Tell us a bit about yourself..."
                            value={bio}
                            className="p-2 border w-full md:w-3/4 rounded md:text-md text-sm resize-none h-24"
                            onChange={(e) => setBio(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full p-2 bg-blue-800 md:text-md text-sm text-white">Register as Tutor</button>
                    <div className="w-full flex justify-center text-sm text-gray-500">
                        Already a user ?{" "}
                        <Link to="/login_tutor" className="text-blue-600 font-medium hover:underline ml-1">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register_Tutor