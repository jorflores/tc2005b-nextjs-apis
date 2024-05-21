import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = ({ user }) => {
    const router = useRouter();

    const handleLogOff = async () => {

        await fetch('/api/logout', {
            method: 'POST',
        });

        router.push('/login'); // Redirect to the login page
    };

    if (!user){
        return null
    }
    

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link className="hover:bg-gray-700 p-2 rounded" href="/">
                        Home  
                    </Link>
                    {user.role == "admin" ? <Link className="hover:bg-gray-700 p-2 rounded" href="/users">
                        Users
                    </Link> : null }
                    {user.role == "admin" ? <Link className="hover:bg-gray-700 p-2 rounded" href="/admin">
                    Admin
                </Link> : null }
                </div>
                <button onClick={handleLogOff} className="bg-red-500 hover:bg-red-700 p-2 rounded">
                    LogOff
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
