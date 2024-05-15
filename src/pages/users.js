import axios from 'axios';
import { useEffect, useState } from 'react';
import { withAuth } from '../lib/auth';


const Users = ({ users }) => {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const response = await axios.get('http://localhost:5000/users/getAllUsers', {
                    withCredentials: true 
                });
                setUserData(response.data.users);  // Assuming the backend sends data in this format
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch users.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {userData.length > 0 ? (
                    userData.map(user => (
                        <li key={user.id}>{user.phone}</li>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </ul>
        </div>
    );
};

export async function getServerSideProps(context) {
    return withAuth(context);
  }
  

export default Users;
