import { NavButton } from "../components/NavButton"

export const Header = () => {
    return (
        <header className="bg-slate-950 px-20 py-5 flex justify-between items-center text-gray-200">
            <h2 className="text-2xl font-semibold">Smiling Friends Come Back</h2>
                <div className="flex gap-4">
                    <nav>
                        <ul className="flex justify-between gap-4">
                            <li>Home</li>
                            <li>Characters</li>
                        </ul>
                    </nav>
                    <NavButton label="Log In" />
                    <NavButton label="Sign up" />
                </div>
        </header>
    )
}