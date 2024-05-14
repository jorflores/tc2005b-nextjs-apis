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


function HomePage({ authToken }) {
  //const { isAuthenticated } = useAuth({ authToken });



  return (
      <div>
          <h1>Home Page</h1>
          {authToken ? <p>Welcome back!</p> : <p>You are not logged in.</p>}
  
      </div>
  );
}

export default HomePage;