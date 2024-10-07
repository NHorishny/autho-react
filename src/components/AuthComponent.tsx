import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import LogoutButton from "./Authentication/Logout";

/**
 * A React component that manages authentication with Auth0.
 * 
 * @returns {JSX.Element} A JSX element that displays the user's name and a logout button if they are authenticated.
 */
function AuthComponent(): JSX.Element {
    const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
    const [token, setToken] = useState<string | null>(null);
    
    const fetchToken = async () => {
        try {
            const token = await getAccessTokenSilently();
            console.log('Access Token:', token); // Use the token as needed
            setToken(token);
        } catch (error) {
            console.error('Error fetching access token:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchToken();
        } else if (!token && !isLoading) {
            loginWithRedirect();
        }
    }, [isAuthenticated, isLoading, loginWithRedirect]);

    if (isLoading) {
        return <div>Loading...</div>; // Display a loading state while authentication status is being determined
    }

    return (
      <div className="header-container">
            {isAuthenticated && (
                <>
                    <span className="nav-main">       
                        <h1 className="authO">AuthOTest</h1>
                        <a href="https://localhost:7030" className="nav-link">.NET</a>
                    </span>
                    <div className="flex-container">
                        <h2 className="nav-link">Welcome, {user?.name}</h2>
                        <LogoutButton />
                    </div>
                </>
            )}
        </div>
    );
}
export default AuthComponent;
