
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


export default function Admin({ authToken }) {


  
    return (
        <div>
            Welcome to the Admin Page
       
        </div>
    );
}
