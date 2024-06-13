import { useEffect, useState } from "react";
import { getUserName } from "../../api/client";
import { useAuth } from "../../context/AuthContextProvider";
import storage from "../../utils/storage";

export default function FetchUsername() {
  const [username, setUsername] = useState("");
  const [headerError, setHeaderError] = useState(null);
  const { isLogged } = useAuth();

  useEffect(() => {
    if (isLogged) {
      const fetchTheUsername = async () => {
        try {
          const accessToken = storage.get("auth");
          if (accessToken) {
            const fetchedUsername = await getUserName(accessToken);
            setUsername(fetchedUsername);
          }
        } catch (error) {
          setHeaderError(`Error fetching username: ${error.message}`);
        }
      };
      fetchTheUsername();
    }
  }, [isLogged]);

  return (
    <p className="nav__user-greeting">
      Welcome back <strong>{username}</strong>!
    </p>
  );
}
