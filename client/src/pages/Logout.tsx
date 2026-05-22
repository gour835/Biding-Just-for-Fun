import axios from "axios";
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

interface LogoutProp {
  setIsAuthenticated: (value: boolean) => void
}

function Logout({ setIsAuthenticated }: LogoutProp) {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  useEffect(() => {
    async function DoLogout() {
      try {
        const server = await axios.post('http://localhost:8080/api/auth/logout', {}, {
          withCredentials: true
        });
        if (server.status == 200) {
          console.log(server);
          setIsLoggedOut(true);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    DoLogout();
  }, [])

  if (isLoggedOut) {
    return <Navigate to='/login' replace />
  }
  return (
    <>

      <Loader loading={true} />
    </>
  )
}

export default Logout



