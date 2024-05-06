import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
    const router = useRouter();
    const { isLoading, isAuthenticated, role } = useAuth(false);
    const handleLogOff = () => {
        localStorage.removeItem('token'); // Elimina el token de localStorage
        router.push('/login'); // Redirige al usuario a la página de login
    };

    /*
    if (isLoading) {
        return <div>Loading...</div>;
    }
    


    if (!isAuthenticated) {
        return null;  // or a minimal layout that doesn't show protected content
    }*/

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link className="hover:bg-gray-700 p-2 rounded" href="/">
                        Home
                    </Link>

                    <Link className="hover:bg-gray-700 p-2 rounded" href="/users">
                    Users
                </Link>

                    {/* Puedes agregar más enlaces aquí si necesitas */}
                </div>
                <button onClick={handleLogOff} className="bg-red-500 hover:bg-red-700 p-2 rounded">
                    LogOff
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
