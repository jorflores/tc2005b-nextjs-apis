import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import  axios  from 'axios';

const useAuth = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState("")

    useEffect((authRequired) => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setIsLoading(false);
                if(authRequired){
                router.push('/login');
                }
                return;
            }

            try {
                const response = await axios.post('/api/validate-token', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200 && response.data.isValid) {
                    console.log(response.data)
                    setIsAuthenticated(true);
                    setRole(response.data.userRole)
                } else {
                    throw new Error('Token validation failed');
                }
            } catch (error) {
                console.error('Error validating token:', error);
                localStorage.removeItem('token');
                router.push('/login');
            }
            setIsLoading(false);
        };

        validateToken();
    }, [router]);

    return { isLoading, isAuthenticated,role };
};

export default useAuth;
