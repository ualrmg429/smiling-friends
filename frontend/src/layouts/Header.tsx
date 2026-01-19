import NavButton from "../components/NavButton"
import smLogo from '../assets/sf-icon.png'

export default function Header() {
    return (
        <header className="bg-slate-950 px-20 py-5 flex justify-between items-center text-gray-200 border-b-1 border-slate-600 ">
            <img src={smLogo} alt="smiling-friends-presentation" className="w-30"/>
            <div className="flex gap-4">
                <NavButton label="Log In" />
                <NavButton label="Sign up" />
            </div>   
        </header>
    )
}