import MainButton  from "../components/Buttons/MainButton";
import group from "../assets/group.png";
import { Link } from 'react-router';
import { SiHbo } from "react-icons/si";

export default function HomePage() {
    return(
        <main>
            <section className="text-center py-5 border-b-1 border-slate-600">
                <h1 className='text-6xl font-heading text-rainbow-animated'>SMILING FRIENDS</h1>
                <p className="text-2xl mt-4 mb-6 text-slate-200">An unofficial fan page</p>
                <Link to='/characters'>
                    <MainButton label={"List of characters"} />
                </Link>
            </section>
            <section className="py-12 px-8 max-w-4xl mx-auto">
                <h2 className="text-3xl mb-4">What is Smiling Friends?</h2>
                <p className="font-body">
                Smiling Friends is an animated comedy series about a small and unconventional 
                company whose sole mission is to make people happy. The show follows the chaotic 
                adventures of Pim and Charlie, two very different employees who are sent out to 
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
            <section className="py-12 px-8 max-w-4xl mx-auto">
                <h2 className="text-3xl mb-4">Watch Smiling Friends in HBO</h2>
                <p className="mb-8">
                    Ready to jump into the chaos? Head over to HBO 
                    and start watching Smiling Friends today. Don’t miss out on one of the most talked-about 
                    animated shows — click through, press play, and enjoy the madness.
                </p>
                <a href="https://www.hbomax.com/es/es/shows/smiling-friends/b692705b-2f12-4a3d-ab4d-579124e0667c" target="_blank" rel="noopener noreferrer">
                    <MainButton label='Go to' Icon={SiHbo} />
                </a>
            </section>
        </main>
    );
}