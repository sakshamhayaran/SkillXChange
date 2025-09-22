import { useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Profile() {

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const role = localStorage.getItem("role");
                const docRef = doc(db, role, user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                    setFormData(docSnap.data());
                }
            }
            setLoading(false);
        })
    }, []);

    if (loading) { return <p className="text-center p-5">Loading....</p> }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSave = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const role = localStorage.getItem("role");
        const docRef = doc(db, role, user.uid);
        await updateDoc(docRef, formData);

        setUserData(formData);
        setIsEditing(false);
    };

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
                    {!isEditing && (
                        <button className="inline-block rounded bg-blue-600 px-6 md:px-10 py-1 font-medium text-white shadow-[0_4px_9px_-4px_#2563eb] transition duration-150 ease-in-out hover:bg-blue-400 hover:shadow-[0_8px_9px_-4px_rgba(37,99,235,0.3),0_4px_18px_0_rgba(37,99,235,0.2)]"
                            onClick={() => setIsEditing(true)}>Edit</button>
                    )}
                </div>
                <p className="text-sm md:text-base"><span className="font-bold">Full Name : </span>
                    {isEditing ?
                        (
                            <input type="text" name="fullName" value={formData.fullName || ""} onChange={handleChange} className="border p-1 rounded" />
                        ) : (userData.fullName)}</p>
                <p className="text-sm md:text-base"><span className="font-bold">Email : </span>
                    {isEditing ?
                        (
                            <input type="text" name="email" value={formData.email || ""} onChange={handleChange} className="border p-1 rounded" />
                        ) : (userData.email)}</p>
                <p className="text-sm md:text-base"><span className="font-bold">Address : </span>
                    {isEditing ?
                        (
                            <input type="text" name="address" value={formData.address || ""} onChange={handleChange} className="border p-1 rounded" />
                        ) : (userData.address)}</p>
                <p className="text-sm md:text-base"><span className="font-bold">Skills Interested In : </span>
                    {isEditing ?
                        (
                            <input type="text" name="skills"
                                value={Array.isArray(formData.skills) ? formData.skills.join(" , ") : formData.skills || ""}
                                onChange={(e) => setFormData((prev) => ({ ...prev, skills: e.target.value.split(",").map((skill) => skill.trim()) }))}
                                className="border w-full p-1 rounded"
                            />
                        ) : (Array.isArray(userData.skills) ? userData.skills.join(", ") : userData.skills)} </p>
                <p className="text-sm md:text-base"><span className="font-bold">Short Bio : </span>
                    {isEditing ?
                        (
                            <textarea name="bio" value={formData.bio || ""} onChange={handleChange} className="border p-1 rounded w-full" />
                        ) : (userData.bio)}</p>

                {isEditing && (
                    <div className="flex justify-center items-center mt-4 gap-4">
                        <button className="inline-block rounded bg-green-500 px-6 md:px-10 py-1 font-medium text-white shadow-[0_4px_9px_-4px_#10b981] transition duration-150 ease-in-out hover:bg-green-400 hover:shadow-[0_8px_9px_-4px_rgba(16,185,129,0.3),0_4px_18px_0_rgba(16,185,129,0.2)]" onClick={handleSave}> Save </button>
                        <button className="inline-block rounded bg-gray-400 px-6 md:px-10 py-1 font-medium text-white shadow-[0_4px_9px_-4px_#9ca3af] transition duration-150 ease-in-out hover:bg-gray-300 hover:shadow-[0_8px_9px_-4px_rgba(156,163,175,0.3),0_4px_18px_0_rgba(156,163,175,0.2)]" onClick={
                            () => { setFormData(userData); setIsEditing(false); }
                        }> Cancel </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile