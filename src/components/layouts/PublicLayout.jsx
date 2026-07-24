import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function PublicLayout() {
    return <div className="flex flex-col min-h-screen">
        <Header/>
        <div className="flex-1">
        <Outlet/>
        </div>
        <Footer/>
    </div>
}