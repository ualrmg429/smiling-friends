import { Outlet } from "react-router";

export default function NoLayout() {
    return (
        <div className="min-h-screen flex flex-col ">
            <main className="bg-slate-950 text-center flex-grow flex-1">
                <div><Outlet /></div>
            </main>
        </div>
    );
}