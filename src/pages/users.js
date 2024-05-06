import axios from 'axios';
import { useEffect, useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');  // Get the token from localStorage
            if (!token) {
                setError('Authentication error: No token found.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:4000/getAllUsers', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsers(response.data.data.users);  // Assuming the backend sends data in this format
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
                        <li key={user._id}>{user.username}</li>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default Users;
