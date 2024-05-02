import { createContext, useContext, useEffect, useState } from "react";
import { getUserName } from "../../api/client";
import storage from "../../utils/storage";

const AuthContext = createContext();

export const AuthContextProvider = ({ isDefaultLogged, children }) => {
  const [isLogged, setIsLogged] = useState(isDefaultLogged);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const accessToken = storage.get("auth");
        if (accessToken) {
          const username = await getUserName(accessToken);
          setUsername(username);
        }
      } catch (error) {
        console.error("Error fetching username", error);
      }
    };

    fetchUsername();
  }, []);

  const handleLogin = () => setIsLogged(true);
  const handleLogout = () => setIsLogged(false);

  const authValue = {
    isLogged,
    onLogin: handleLogin,
    onLogout: handleLogout,
    username,
  };
  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
