// lib/auth.js
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';

export async function withAuth(context) {
  const cookies = parseCookies(context);
  const token = cookies.authToken;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwt.verify(token, "ABCD1234");
    return {
      props: { user: decoded },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}
