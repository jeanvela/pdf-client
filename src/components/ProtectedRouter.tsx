import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

interface Protected {
  isAuth: boolean
  setIsAuth: (bol: boolean) => void
}

const ProtectedRouter = ({isAuth, setIsAuth}: Protected) => {
  if (!isAuth) return <Navigate to='/' />
  return <>
  <Navbar setIsAuth={setIsAuth}></Navbar> <Outlet /> 
  </>
}

export default ProtectedRouter