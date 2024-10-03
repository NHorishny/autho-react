import { useAuth0 } from "@auth0/auth0-react";
import { useEffect,useState } from "react";

/**
 * A React component that manages authentication with Auth0.
 * 
 * @returns {JSX.Element} A JSX element that displays the user's name and a logout button if they are authenticated.
 */
function AuthComponent(): JSX.Element {
    const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState<string | null>(null);

    const handleLogin = async () => {
        await loginWithRedirect({
            appState: { targetUrl: window.location.pathname },
            //@ts-ignore 
            redirectUri: window.location.origin,
          });
        //   callApi();
        };
    
    //   const callApi = async () => {
    //     const token = await getAccessTokenSilently();
    //     const response = await fetch('https://authotest.uk.auth0.com/api/v2/', {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //       credentials: 'include',
    //     });
    
    //     if (!response.ok) {
    //       console.error('API call failed:', response);
    //     } else {
    //       const data = await response.json();
    //       console.log('API response:', data);
    //     }
    //   };
    
    /**
     * Fetches an access token silently if the user is authenticated.
     */
    useEffect(() => {
        const fetchToken = async () => {
          if (isAuthenticated) {
            const token = await getAccessTokenSilently({
            //@ts-ignore 
              audience: 'https://authotest.uk.auth0.com/userinfo',
              scope: 'read:messages write:messages',
            });
            console.log('Access Token:', token); // Use the token as needed
            setToken(token);
            
            

          }
        
        };
    
        fetchToken();
      }, [isAuthenticated, getAccessTokenSilently]);
  
    return (
        <div>
        {/* @ts-ignore */}
      {!isAuthenticated && <button onClick={handleLogin}>Log in</button>}
      {isAuthenticated && (
        <>
        {/* @ts-ignore */}
        <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
          <h2>Welcome, {user!.name}</h2>
          <p>Your JWT Token: {token}</p>
        </>
      )}
    </div>
  );
}

export default AuthComponent;