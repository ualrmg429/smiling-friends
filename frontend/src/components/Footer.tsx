import { FaGithub, FaLinkedin, FaEnvelope, FaTv } from 'react-icons/fa';
import { SocialMediaLogo } from '../components/SocialMediaLogo';

export default function Footer() {
    const github_url = 'https://github.com/ualrmg429';
    const linkedin_url = 'https://www.linkedin.com/in/raúl-martínez-gutiérrez-24350733b/';
    const email_url = 'mailto:martinezgutierrezraul@outlook.es';

    const adultswim_url = 'https://www.adultswim.com/videos/smiling-friends';
    const wikipedia_url = 'https://en.wikipedia.org/wiki/Smiling_Friends';
    const imdb_url = 'https://www.imdb.com/title/tt12074628/';

    return (
        <footer className='bg-slate-950 px-20 py-8 text-gray-200 border-t border-slate-600'>
            <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8'>
                
                {/* Smiling Friends Section */}
                <div>
                    <h3 className='text-lg font-semibold mb-3'>Smiling Friends</h3>
                    <ul className='flex flex-col gap-2 text-sm'>
                        <li>
                            <a 
                                href={adultswim_url} 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='hover:text-yellow-400 transition-colors flex items-center gap-2'
                            >
                                <FaTv /> Adult Swim
                            </a>
                        </li>
                        <li>
                            <a 
                                href={wikipedia_url} 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='hover:text-yellow-400 transition-colors'
                            >
                                Wikipedia
                            </a>
                        </li>
                        <li>
                            <a 
                                href={imdb_url} 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='hover:text-yellow-400 transition-colors'
                            >
                                IMDb
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className='text-lg font-semibold mb-3'>Contact</h3>
                    <ul className='flex gap-4'>
                        <li>
                            <SocialMediaLogo url={github_url} Icon={FaGithub} />
                        </li>
                        <li>
                            <SocialMediaLogo url={linkedin_url} Icon={FaLinkedin} />
                        </li>
                        <li>
                            <SocialMediaLogo url={email_url} Icon={FaEnvelope} />
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className='max-w-6xl mx-auto mt-8 pt-4 border-t border-slate-700 text-center text-sm text-gray-500'>
                <p>© {new Date().getFullYear()} Smiling Friends Fan Project. Not affiliated with Adult Swim.</p>
            </div>
        </footer>
    );
}