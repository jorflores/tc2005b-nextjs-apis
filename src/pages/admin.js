import useAuth from "@/hooks/useAuth";

export default function Admin() {
  const { isLoading, isAuthenticated, role } = useAuth();
    // Your home page content

    if (isLoading) {
      return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
      return null;  // or a minimal layout that doesn't show protected content
  }

  if (role != "admin") {
    return (
        <h1>Only Admins are allowed</h1>
    )
  }

    return (
        <div>
            Welcome to the Admin Page
            <p>Your permission role is: {role} </p> 
        </div>
    );
}
