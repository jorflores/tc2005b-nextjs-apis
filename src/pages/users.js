import axios from 'axios';
import { useEffect, useState } from 'react';
import { withAuth } from '../lib/auth';


const Users = ({ user }) => {
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

    const handleDelete = async (userId) => {

        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:5000/users/deleteUser/${userId}`, {
                    withCredentials: true 
                });
    
                setUserData(prevUserData => prevUserData.filter(user => user.id !== userId));
    
                console.log(response.data.message);
                console.log(`Eliminando usuarios con ID: ${userId}`);
                // You can update the userData state here to reflect the changes in the UI
            } catch (err) {
                console.error(err.response?.data?.message || 'Failed to delete user.');
            }
        }
    
        try {
            const response = await axios.delete(`http://localhost:5000/users/deleteUser/${userId}`, {
                withCredentials: true 
            });
            setUserData(prevUserData => prevUserData.filter(user => user.id !== userId));
            console.log(response.data.message);
            console.log(`Eliminando usuarios con ID: ${userId}`);
            // You can update the userData state here to reflect the changes in the UI
        } catch (err) {
            console.error(err.response?.data?.message || 'Failed to delete user.');
        }
    };
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    if (user.role !== 'admin') {
        return <div>Unauthorized</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            {userData.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b text-center">ID</th>
                            <th className="py-2 px-4 border-b text-center">Phone</th>
                            <th className="py-2 px-4 border-b text-center">Role</th>
                            <th className="py-2 px-4 border-b text-center">Created At</th>
                            <th className="py-2 px-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map(user => (
                            <tr key={user.id}>
                                <td className="py-2 px-4 border-b text-center">{user.id}</td>
                                <td className="py-2 px-4 border-b text-center">{user.phone}</td>
                                <td className="py-2 px-4 border-b text-center">{user.role}</td>
                                <td className="py-2 px-4 border-b text-center">{new Date(user.createdAt).toLocaleString()}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <button
                                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Eliminar Usuario
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};









   


export async function getServerSideProps(context) {
    return withAuth(context);
  }
  

export default Users;
