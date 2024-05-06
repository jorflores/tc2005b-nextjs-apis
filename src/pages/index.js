import useAuth from "@/hooks/useAuth";

export default function HomePage() {
  const { isLoading, isAuthenticated, role } = useAuth();
    // Your home page content

    if (isLoading) {
      return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
      return null;  // or a minimal layout that doesn't show protected content
  }

    return (
        <div>
            Welcome to the home page!
            <p>Your permission role is: {role} </p> 
        </div>
    );
}
