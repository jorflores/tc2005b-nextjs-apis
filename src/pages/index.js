import { withAuth } from '../lib/auth';


function HomePage({user}) {


  return (
      <div>
          <h1>Home Page</h1>
          {/*authToken ? <p>Welcome back!</p> : <p>You are not logged in.</p>*/}
          {user.role === 'admin' && <p>You are an admin.</p>}
          {<p>User Id: {user.id}</p>}
          {<p>User Role: {user.role}</p>}
  
      </div>
  );
}




export async function getServerSideProps(context) {
  return withAuth(context);
}



export default HomePage;