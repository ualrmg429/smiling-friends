import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    return(
        <main className="p-8 items-center">
            <h1 className="font-heading text-3xl mb-6">Log In</h1>
            <LoginForm />
        </main>
    );
}