import MainButton  from "../components/MainButton";
import CharacterCard from "../components/CharacterCard";

export default function HomePage() {
    return(
        <main className="bg-slate-950  text-center flex-grow" >
            <section className="text-center py-5 border-b-1 border-slate-600">
                <h1 className='text-6xl font-heading text-rainbow-animated'>SMILING FRIENDS</h1>
                <p className="text-2xl mt-4 text-slate-200">An unofficial fan page</p>
                <MainButton label={"List of characters"} />
            </section>
            <section className="py-12 px-8 max-w-4xl mx-auto">
                <h2 className="font-heading text-3xl mb-4">What is Smiling Friends?</h2>
                <p className="font-body">
                Smiling Friends is an animated cartoon about a little company dedicated to make
                people happy. It follows the adventures of Pim & Charlie while they trying to help
                their customers with their problems.
                </p>
            </section>
            <section className="py-12">
                <h2 className="font-heading text-3xl text-center mb-4">Main Characters</h2>
                <div className="flex justify-center gap-6">
                    <CharacterCard />
                </div>
            </section>
        </main>
    );
}