import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="bg-slate-950 text-center flex-grow flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}