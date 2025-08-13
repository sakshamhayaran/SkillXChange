import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../Firebase/firebase';
import { useParams } from 'react-router-dom';

function UserProfile() {

    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const role = localStorage.getItem("role");

    useEffect(() => {
        const fetchUser = async () => {
            const targetCollection = role === "tutor" ? "learners" : "tutors";
            const docRef = doc(db, targetCollection, id)
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserData(docSnap.data());
            }
        }

        fetchUser();
    }, [role, id]);

    if (!userData) { return (<p className="text-center p-5">Loading....</p>) }

    return (
        <div className="w-screen flex flex-col md:flex-row items-center">
            <div className="w-full md:w-[1/2] flex justify-center p-10">
                <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-indigo-950 text-white font-bold text-7xl flex justify-center items-center">
                    {userData.fullName.charAt(0).toUpperCase()}
                </div>
            </div>
            <div className="w-full md:w-[1/2] flex flex-col gap-5 p-10">
                <div className="flex justify-evenly items-center">
                    <h1 className="md:text-4xl text-2xl font-bold text-center">Your Profile !</h1>
                </div>
                <p className="text-md"><span className="font-bold">Full Name : </span>{userData.fullName}</p>
                <p className="text-md"><span className="font-bold">Email : </span>{userData.email}</p>
                <p className="text-md"><span className="font-bold">Address : </span>{userData.address}</p>
                <p className="text-md"><span className="font-bold">Skills Interested In : </span>
                    {Array.isArray(userData.skills) ? userData.skills.join(", ") : userData.skills} </p>
                <p className="text-md"><span className="font-bold">Short Bio : </span>{userData.bio}</p>
            </div>
        </div>
    )
}

export default UserProfile