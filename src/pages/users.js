import axios from 'axios';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';



export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const authToken = cookies.authToken || null;
  
    return {
        props: {
            authToken,
        },
    };
  }
  

const Users = ({ authToken }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const response = await axios.get('http://localhost:5000/users/getAllUsers', {
                    withCredentials: true 
                });
                setUsers(response.data.users);  // Assuming the backend sends data in this format
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
                {users.length > 0 ? (
                    users.map(user => (
                        <li key={user.id}>{user.phone}</li>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default Users;
