import smLogo from '../assets/sf-icon.png'
import { Link } from "react-router"

export default function SimpleHeader() {

    return (
        <header className="bg-slate-950 px-20 py-5 flex justify-center items-center text-gray-200 border-b-1 border-slate-600 ">
            <Link to='/'>
                <img src={smLogo} alt="smiling-friends-presentation" className="w-30"/>
            </Link>
        </header>
    );
}