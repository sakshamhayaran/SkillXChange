import { addDoc, collection, doc, getDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { auth, db } from '../Firebase/firebase';
import { useParams } from 'react-router-dom';

function UserProfile() {

    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const role = localStorage.getItem("role");

    useEffect(() => {
        const fetchUser = async () => {
            const targetCollection = role === "tutors" ? "learners" : "tutors";
            const docRef = doc(db, targetCollection, id)
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserData(docSnap.data());
            }
        }

        fetchUser();
    }, [role, id]);

    const sendRequest = async () => {
        try {
            const user = auth.currentUser;
            if (!user) { alert("⚠️ You must be logged in to send a request."); return; }

            const existing = await getDocs(query(collection(db, "requests"),
                where("senderId", "==", user.uid),
                where("receiverId", "==", id)
            ));
            if(existing.empty == false) { alert("❗You already sent a request to this tutor !"); return; }

            const requestObj = await addDoc(collection(db, "requests"), {
                senderId: user.uid,
                receiverId: id,
                type: "learner-request",
                status: "pending",
                timestamp: serverTimestamp(),
            });
            alert("✅ Request sent successfully !");
        }
        catch (error) {
            console.error("!!Error sending request:", error.message);
            alert("❌ Could not send request. Please try again.");
        }
    }

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
                    <h1 className="md:text-4xl text-2xl font-bold text-center">User Profile !</h1>
                    {role === 'learners' &&
                        (<button onClick={sendRequest} className="inline-block rounded bg-blue-600 px-6 md:px-10 py-1 font-medium text-white shadow-[0_4px_9px_-4px_#2563eb] transition duration-150 ease-in-out hover:bg-blue-400 hover:shadow-[0_8px_9px_-4px_rgba(37,99,235,0.3),0_4px_18px_0_rgba(37,99,235,0.2)]">Request</button>)}
                </div>
                <p className="text-sm md:text-base"><span className="font-bold">Full Name : </span>{userData.fullName}</p>
                <p className="text-sm md:text-base"><span className="font-bold">Email : </span>{userData.email}</p>
                <p className="text-sm md:text-base"><span className="font-bold">Address : </span>{userData.address}</p>
                <p className="text-sm md:text-base"><span className="font-bold">Skills Interested In : </span>
                    {Array.isArray(userData.skills) ? userData.skills.join(", ") : userData.skills} </p>
                <p className="text-sm md:text-base"><span className="font-bold">Short Bio : </span>{userData.bio}</p>
            </div>
        </div>
    )
}

export default UserProfile