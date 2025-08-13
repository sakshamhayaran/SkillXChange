import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../Firebase/firebase';
import UsersCard from '../components/UsersCard';
import { Link } from 'react-router-dom';

function Home() {

    const [users, setUsers] = useState([]);
    const role = localStorage.getItem("role");

    useEffect(() => {
        const fetchUsers = async () => {
            const targetCollection = role === "tutors" ? "learners" : "tutors";
            const querySnapshot = await getDocs(collection(db, targetCollection));
            const usersList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(usersList);
        }

        fetchUsers();
    }, [role])

    if(users.length==0) { return <p className="text-center p-5">No {role === "tutors" ? "Learners" : "Tutors"} detected !</p> }

    return (
        <div>
            <div className='flex flex-col gap-10 p-5 md:p-10'>
                <h1 className="md:text-4xl text-2xl font-bold text-center">List of {role === "tutors" ? "Learners" : "Tutors"}</h1>
                { !users ? <p className="text-center p-5">!! No Profiles Found !!</p> : <div className="max-w-6xl w-full mx-auto grid gap-5 md:gap-10 grid-cols-2 lg:grid-cols-3">
                    {users.map(user =>( 
                        <Link to={`/dashboard/users/${user.id}`} key={user.id}>
                            <UsersCard alpha={user.fullName.charAt(0).toUpperCase()} name={user.fullName} loc={user.address} 
                            skl={Array.isArray(user.skills) ? user.skills.join(" , ") : user.skills || ""} />
                        </Link>
                    ))}
                </div>}
            </div>
        </div>
    );
}

export default Home