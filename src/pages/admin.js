
import { withAuth } from '../lib/auth';


export default function Admin({ user }) {

if (user.role != "admin"){
    return (
        <p>Sorry you are not an admin</p>
    )
}
  
    return (
        <div>
            Welcome to the Admin Page
       
        </div>
    );
}



export async function getServerSideProps(context) {
    return withAuth(context);
  }
  

