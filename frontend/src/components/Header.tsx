import { useState } from "react";
import NavButton from "./Buttons/NavButton"
import smLogo from '../assets/sf-icon.png'
import { Link } from "react-router"
import { useAuth } from "../context/AuthContext"
import LogoutConfirmModal from "./LogoutConfirmModal";

export default function Header() {
    const { isAuthenticated, user, logout, isLoading } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = () => {
        setShowLogoutModal(false);
        logout();
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };

    return (
        <>
            <header className="bg-slate-950 px-20 py-5 flex justify-between items-center text-gray-200 border-b-1 border-slate-600">
                <Link to='/'>
                    <img src={smLogo} alt="smiling-friends-presentation" className="w-30"/>
                </Link>
                <nav className="flex gap-4">
                    { isLoading ? (
                        <div>Loading...</div>
                    ) : isAuthenticated ? (
                        <div className='flex gap-4'>
                            <p>{user?.email}</p> 
                            <NavButton label="Log Out" onClick={handleLogoutClick}/>
                        </div>
                    ) : (
                        <>
                            <Link to='/login'>
                                <NavButton label="Log In" />
                            </Link>
                            <Link to='/signup'>
                                <NavButton label="Sign up" />
                            </Link>
                        </>   
                    )}
                </nav>   
            </header>
            
            <LogoutConfirmModal 
                isOpen={showLogoutModal}
                onConfirm={handleLogoutConfirm}
                onCancel={handleLogoutCancel}
            />
        </>
    );
}