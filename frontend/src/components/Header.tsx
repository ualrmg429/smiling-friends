import NavButton from "../components/NavButton"
import smLogo from '../assets/sf-icon.png'
import { Link } from "react-router"

export default function Header() {
    return (
        <header className="bg-slate-950 px-20 py-5 flex justify-between items-center text-gray-200 border-b-1 border-slate-600 ">
            <Link to='/'>
                <img src={smLogo} alt="smiling-friends-presentation" className="w-30"/>
            </Link>
            <div className="flex gap-4">
                <NavButton label="Log In" />
                <NavButton label="Sign up" />
            </div>   
        </header>
    )
}