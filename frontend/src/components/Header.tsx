import { useState } from "react";
import NavButton from "./Buttons/NavButton"
import smLogo from '../assets/sf-icon.png'
import { Link } from "react-router"
import { useAuth } from "../context/AuthContext"
import LogoutConfirmModal from "./LogoutConfirmModal";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

export default function Header() {
    const { isAuthenticated, user, logout, isLoading } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
        setIsMenuOpen(false);
    };

    const handleLogoutConfirm = () => {
        setShowLogoutModal(false);
        logout();
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className="bg-slate-950 px-6 md:px-20 py-4 md:py-5 flex justify-between items-center text-gray-200 border-b border-slate-600">
                <Link to='/' onClick={closeMenu}>
                    <img src={smLogo} alt="smiling-friends-presentation" className="w-20 md:w-30"/>
                </Link>

                <button 
                    className="md:hidden text-2xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <nav className="hidden md:flex gap-4">
                    { isLoading ? (
                        <div>Loading...</div>
                    ) : isAuthenticated ? (
                        <div className='flex gap-4 items-center'>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                                <FaUserCircle className="text-xl" />
                                <span className="text-sm">{user?.email}</span>
                            </button>
                            <NavButton label="Log Out" onClick={handleLogoutClick}/>
                        </div>
                    ) : (
                        <>
                            <Link to='/login'>
                                <NavButton label="Login" />
                            </Link>
                            <Link to='/signup'>
                                <NavButton label="Sign up" />
                            </Link>
                        </>   
                    )}
                </nav>   
            </header>

            {/* Menú móvil */}
            {isMenuOpen && (
                <div className="md:hidden bg-slate-900 border-b border-slate-600 px-6 py-4">
                    <nav className="flex flex-col gap-4">
                        { isLoading ? (
                            <div>Loading...</div>
                        ) : isAuthenticated ? (
                            <>
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg w-fit">
                                    <FaUserCircle className="text-xl" />
                                    <span className="text-sm text-gray-300">{user?.email}</span>
                                </button>
                                <NavButton label="Log Out" onClick={handleLogoutClick}/>
                            </>
                        ) : (
                            <>
                                <Link to='/login' onClick={closeMenu}>
                                    <NavButton label="Login" />
                                </Link>
                                <Link to='/signup' onClick={closeMenu}>
                                    <NavButton label="Sign up" />
                                </Link>
                            </>   
                        )}
                    </nav>
                </div>
            )}
            
            <LogoutConfirmModal 
                isOpen={showLogoutModal}
                onConfirm={handleLogoutConfirm}
                onCancel={handleLogoutCancel}
            />
        </>
    );
}