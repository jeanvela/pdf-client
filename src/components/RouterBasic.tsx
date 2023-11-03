import { Navigate, Outlet } from "react-router-dom";

interface Props {
    isAuth: boolean
}

function RouterBasic({ isAuth }: Props) {
    if (isAuth === false) {
        return <Outlet></Outlet>
    } else {
        return <Navigate to='/uploadpdf'/>
    }    
}

export default RouterBasic