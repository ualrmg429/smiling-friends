import { Outlet } from "react-router";
import SimpleHeader from "../components/SimpleHeader";

export default function SimpleLayout() {
    return (
        <div className="min-h-screen flex flex-col ">
            <SimpleHeader />
            <main className="bg-slate-950 text-center flex-grow flex-1">
                <Outlet />
            </main>
        </div>
    );
}