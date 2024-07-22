import Footer from "../../../components/Footer";
import Nav from "../../../components/Nav";
import { Routes, Route, Outlet } from "react-router-dom";



export default function Home(){
    return (
        <>     
            <div className="container-fluid">
                <Nav></Nav>               
                <div className="container pt-5 ">      
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>       
            </div>                                     
        </>
    )
}