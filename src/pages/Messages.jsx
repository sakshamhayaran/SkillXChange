import { useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebase";
import {
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
    addDoc,
    doc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";

export default function Messages() {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [role, setRole] = useState(localStorage.getItem("role")); // "tutors" or "learners"

    // ✅ Fetch all chats for logged-in user
    useEffect(() => {
        let unsubscribeChats;

        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (!user) {
                setChats([]);
                return;
            }

            const q = query(
                collection(db, "chats"),
                where("members", "array-contains", user.uid)
            );

            unsubscribeChats = onSnapshot(q, (snapshot) => {
                const chatList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setChats(chatList);
            });
        });

        return () => {
            if (unsubscribeChats) unsubscribeChats();
            unsubscribeAuth();
        };
    }, []);

    // ✅ Load messages when a chat is selected
    useEffect(() => {
        if (!selectedChat) return;

        const q = query(
            collection(db, "chats", selectedChat.id, "messages"),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [selectedChat]);

    // ✅ Send a message
    const sendMessage = async () => {
        if (!newMessage.trim() || !selectedChat) return;

        try {
            // Add message to subcollection
            await addDoc(collection(db, "chats", selectedChat.id, "messages"), {
                senderId: auth.currentUser.uid,
                text: newMessage,
                createdAt: serverTimestamp(),
            });

            // Update lastMessage in parent chat doc
            await updateDoc(doc(db, "chats", selectedChat.id), {
                lastMessage: newMessage,
                updatedAt: serverTimestamp(),
            });

            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex flex-col gap-10 p-5 md:p-10">
            <h1 className="md:text-4xl text-2xl font-bold text-center">Your Chats</h1>

            <div className="flex">
                {/* Sidebar - Chats list */}
                <div className="w-1/3 border-r">
                    {chats.length === 0 && (
                        <p className="text-gray-500">No chats yet</p>
                    )}
                    {chats.map((chat) => {
                        const otherName =
                            role === "learners" ? chat.tutorName : chat.learnerName;

                        return (
                            <div
                                key={chat.id}
                                className={`shadow-lg p-2 border-b cursor-pointer hover:bg-blue-100 ${selectedChat?.id === chat.id ? "bg-blue-200" : ""
                                    }`}
                                onClick={() => setSelectedChat(chat)}
                            >
                                <p className="font-bold text-sm md:text-base">{otherName}</p>
                                <p className="text-xs md:text-sm text-gray-500">
                                    {chat.lastMessage || "No messages yet"}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Chat room */}
                <div className="flex-1 flex flex-col shadow-lg">
                    {selectedChat ? (
                        <>
                            {/* Chat header */}
                            <div className="p-2 md:p-4 text-sm md:text-base text-center border-b font-bold bg-blue-50 text-blue-950 shadow-md">
                                {role === "learners"
                                    ? selectedChat.tutorName
                                    : selectedChat.learnerName}
                            </div>

                            {/* Messages */}
                            <div className="flex-1 p-2 md:p-4 overflow-y-auto">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`mb-2 flex ${msg.senderId === auth.currentUser.uid
                                            ? "justify-end"
                                            : "justify-start"
                                            }`}
                                    >
                                        <div className={`px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm rounded-lg ${msg.senderId === auth.currentUser.uid
                                            ? "bg-blue-500 text-white shadow-md"
                                            : "bg-gray-200 shadow-md"}`} > {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input box */}
                            <div className="p-3 md:p-4 border-t flex">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="flex-1 border rounded px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm mr-2"
                                />
                                <button onClick={sendMessage} className="bg-blue-500 text-white px-2 md:px-4 py:1 md:py-2 text-xs md:text-sm rounded hover:bg-blue-700 duration-200 ease-in-out">
                                    Send </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 px-2 py-20 text-sm md:text-base flex items-center justify-center text-gray-500">
                            Select a chat to start messaging
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
