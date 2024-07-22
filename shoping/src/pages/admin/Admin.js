import { Link, Outlet } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

export default function Admin(){
    return (
        <>
            <h1 className="text-center">Admin</h1>
            <div className="text-center">
            <AdminNavbar></AdminNavbar>
            </div>
            
            <Outlet></Outlet>
        </>
    )
}