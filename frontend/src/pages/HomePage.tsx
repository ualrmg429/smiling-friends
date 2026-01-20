import MainButton  from "../components/MainButton";
import group from "../assets/group.png";
import { mockCharacters } from "../data/mockCharacters";
import { useNavigate } from 'react-router';

export default function HomePage() {
    const navigate = useNavigate();

    const handleNavigateToCharacters = () => {
        navigate('/characters');
    };

    return(
        <main>
            <section className="text-center py-5 border-b-1 border-slate-600">
                <h1 className='text-6xl font-heading text-rainbow-animated'>SMILING FRIENDS</h1>
                <p className="text-2xl mt-4 text-slate-200">An unofficial fan page</p>
                <MainButton label={"List of characters"} onClick={handleNavigateToCharacters} />
            </section>
            <section className="py-12 px-8 max-w-4xl mx-auto">
                <h2 className="font-heading text-3xl mb-4">What is Smiling Friends?</h2>
                <p className="font-body">
                Smiling Friends is an animated comedy series about a small and unconventional 
                company whose sole mission is to make people happy. The show follows the chaotic 
                dventures of Pim and Charlie, two very different employees who are sent out to 
                help clients struggling with a wide variety of bizarre, emotional, and often deeply 
                unsettling problems.
                
                While Pim approaches every situation with endless optimism and genuine belief in happiness, 
                Charlie faces each job with sarcasm, exhaustion, and a heavy dose of realism. Together, 
                they navigate a strange world filled with absurd characters, dark humor, and unexpected outcomes, 
                where helping someone smile is never as simple as it sounds.
                </p>
            </section>
            <section className="py-12 px-8">
                <img src={group} alt="Smiling Friends Group" className="mx-auto w-3/4 md:w-1/2 lg:w-1/3"/>
            </section>
        </main>
    );
}