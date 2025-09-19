import { useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebase";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Requests() {
    const [requests, setRequests] = useState([]);
    const role = localStorage.getItem("role");
    const [tutorData, setTutorData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setRequests([]);
                setLoading(false);
                return;
            }

            if (role === "learners") {
                try {
                    const request = await getDocs(query(collection(db, "requests"), where("senderId", "==", user.uid)));
                    const requestList = await Promise.all(
                        request.docs.map(async (docSnap) => {

                            const tutorDoc = await getDoc(doc(db, "tutors", docSnap.data().receiverId));

                            return {
                                id: docSnap.id,
                                ...docSnap.data(),
                                tutor: tutorDoc.exists() ? tutorDoc.data() : null,
                            };
                        })
                    );
                    setRequests(requestList);
                }
                catch (error) {
                    console.log("!!Error message:", error);
                    alert("❌ Error showing list of requests");
                }
                finally {
                    setLoading(false);
                }
            }
            else if (role === "tutors") {
                try {
                    const tutSnap = await getDoc(doc(db, "tutors", user.uid));
                    if (tutSnap.exists()) { setTutorData({ uid: user.uid, ...tutSnap.data() }); }

                    const request = await getDocs(query(collection(db, "requests"), where("receiverId", "==", user.uid)));
                    const requestList = await Promise.all(
                        request.docs.map(async (docSnap) => {

                            const learnerDoc = await getDoc(doc(db, "learners", docSnap.data().senderId));

                            return {
                                id: docSnap.id,
                                ...docSnap.data(),
                                learner: learnerDoc.exists() ? learnerDoc.data() : null,
                            }

                        })
                    );
                    setRequests(requestList);
                }
                catch (error) {
                    console.log("!!Error message:", error);
                    alert("❌ Error showing list of requests");
                }
                finally {
                    setLoading(false);
                }
            }
        })
        return () => unsubscribe();
    }, [role])

    const handleRequest = async (request_id, status_msg, learner, tutor) => {
        try {
            await updateDoc(doc(db, "requests", request_id), { status: status_msg })
            setRequests((prev) => prev.map((req) => req.id === request_id ? { ...req, status: status_msg } : req))

            if (status_msg === "approved" && learner && tutor) {
                await createChat(learner, tutor);
            }
        }
        catch (error) {
            console.log("Error updating request:", error);
        }
    }

    const createChat = async (learner, tutor) => {
        try {
            const chatId = learner.uid + "_" + tutor.uid;
            const chatSnap = await getDoc(doc(db, "chats", chatId));
            if (!chatSnap.exists()) {
                await setDoc(doc(db, "chats", chatId), {
                    members: [learner.uid, tutor.uid],
                    learnerName: learner.fullName,
                    tutorName: tutor.fullName,
                    lastMessage: "",
                    updatedAt: serverTimestamp(),
                });
            }
            console.log("✅ Chat created:", chatId);
        }
        
        catch (error) {
            console.log("❌ Error creating chat:", error);
        }
    }


    if (role === "learners") {
        return (
            <div className="flex flex-col gap-10 p-5 md:p-10">
                <h1 className="md:text-4xl text-2xl font-bold text-center">Sent Requests</h1>

                {loading ? (<p>Loading...</p>) :
                    requests.length === 0 ? (<p>No requests sent yet.</p>) :
                        (
                            <div className="text-xs md:text-base flex flex-col gap-4">
                                {requests.map((req) => (
                                    <div key={req.id} className="p-4 border rounded gap-2 shadow bg-white flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <b> Tutor Name : {" "}
                                                <span className="font-normal">{req.tutor ? req.tutor.fullName : "Deleted User"}</span>
                                            </b>
                                            <b> Skills : {" "}
                                                <span className="font-normal">{req.tutor && Array.isArray(req.tutor.skills) ? req.tutor.skills.join(", ") : "N/A"}</span>
                                            </b>
                                        </div>

                                        <p>
                                            <b>Status:</b>{" "}
                                            <b className={req.status === "pending" ? "text-yellow-600" : req.status === "approved" ? "text-green-600" : "text-red-600"}>
                                                {req.status}
                                            </b>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )
                }
            </div>
        );
    }

    else if (role === "tutors") {
        return (
            <div className="flex flex-col gap-10 p-5 md:p-10">
                <h1 className="md:text-4xl text-2xl font-bold text-center">Received Requests</h1>

                {loading ? (<p>Loading...</p>) :
                    requests.length === 0 ? (<p>No requests yet.</p>) :
                        (
                            <div className="text-xs md:text-base flex flex-col gap-4">
                                {requests.map((req) => (
                                    <div key={req.id} className="p-4 border rounded gap-2 shadow bg-white flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <b> Learner Name :{" "}
                                                <span className="font-normal">{req.learner ? req.learner.fullName : "Deleted User"}</span>
                                            </b>
                                            <b> Skills :{" "}
                                                <span className="font-normal">{req.learner && Array.isArray(req.learner.skills) ? req.learner.skills.join(", ") : "N/A"}</span>
                                            </b>
                                        </div>


                                        {req.status === "pending" ?
                                            (<div className="flex flex-col md:flex-row justify-center align-center gap-2">
                                                <button onClick={() => handleRequest(req.id, "approved", req.learner, tutorData)} className="inline-block rounded bg-green-600 px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white shadow-[0_4px_9px_-4px_#16a34a] transition duration-150 ease-in-out hover:bg-green-400  hover:shadow-[0_8px_9px_-4px_rgba(22,163,74,0.3),0_4px_18px_0_rgba(22,163,74,0.2)]">Accept</button>
                                                <button onClick={() => handleRequest(req.id, "rejected", req.learner, tutorData)} className="inline-block rounded bg-red-600 px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white shadow-[0_4px_9px_-4px_#dc2626] transition duration-150 ease-in-out hover:bg-red-400 hover:shadow-[0_8px_9px_-4px_rgba(220,38,38,0.3),0_4px_18px_0_rgba(220,38,38,0.2)]">Reject</button>
                                            </div>)
                                            :
                                            (<p>
                                                <b>Status:</b>{" "}
                                                <b className={req.status === "pending" ? "text-yellow-600" : req.status === "approved" ? "text-green-600" : "text-red-600"}>
                                                    {req.status}
                                                </b>
                                            </p>)
                                        }
                                    </div>
                                ))}
                            </div>
                        )
                }
            </div>
        );
    }
}

export default Requests;