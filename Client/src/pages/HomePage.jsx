import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import User from "../component/User";

export function HomePage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const accessToken = useAuthStore((state) => state.accessToken);
  const userId = useAuthStore((state) => state.userId);
  const logout = useAuthStore((state) => state.logout);
  const [profile, setProfile] = useState([]);
  
  useEffect(() => {
    if (isLoggedIn)
      axios
        .get(`https://multi-factor-authentication-system-for.onrender.com/api/v1/user?id=${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({ data }) => {
          
          setProfile(data);
          console.log(data);
          
          
        })
        .catch((error) => {
          if (error.response.data.message === "TokenExpiredError") {
            logout();
          }
        });
  }, [isLoggedIn, accessToken]);
  return (
    <>
     
      {isLoggedIn ? (
        <>
         <User {...profile}
         
         />
        </>
      ) : (
        <>You are not logged in</>
      )}
    </>
  );
}
