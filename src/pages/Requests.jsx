import { useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebase";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Requests() {
    const [requests, setRequests] = useState([]);
    const role = localStorage.getItem("role");
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

    const handleRequest = async (request_id, status_msg) => {
        try {
            await updateDoc(doc(db,"requests",request_id),{status:status_msg})
            setRequests((prev) => prev.map((req) => req.id === request_id ? {...req,status:status_msg}:req))
        }
        catch(error) {
            console.log("Error updating request:",error);
        }
    }


    if (role === "learners") 
    {
        return (
            <div className="flex flex-col gap-10 p-5 md:p-10">
                <h1 className="md:text-4xl text-2xl font-bold text-center">Sent Requests</h1>

                {loading ? (<p>Loading...</p>) :
                    requests.length === 0 ? (<p>No requests sent yet.</p>) :
                        (
                            <div className="flex flex-col gap-4">
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

    else if(role === "tutors") 
    {
        return (
            <div className="flex flex-col gap-10 p-5 md:p-10">
                <h1 className="md:text-4xl text-2xl font-bold text-center">Received Requests</h1>

                {loading ? (<p>Loading...</p>) :
                    requests.length === 0 ? (<p>No requests yet.</p>) :
                        (
                            <div className="flex flex-col gap-4">
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
                                            <button onClick={()=>handleRequest(req.id,"approved")} className="bg-red-500 text-xs md:text-sm text-white px-2 py-1 md:px-4 md:py-2 rounded hover:opacity-70">Accept</button>
                                            <button onClick={()=>handleRequest(req.id,"rejected")} className="bg-blue-500 text-xs md:text-sm text-white px-2 py-1 md:px-4 md:py-2 rounded hover:opacity-70">Reject</button>
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