import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SocialMediaLogo } from '../components/SocialMediaLogo';


export default function Footer() {
    const github_url = 'https://github.com/ualrmg429';
    const linkedin_url = 'https://www.linkedin.com/in/raúl-martínez-gutiérrez-24350733b/';

    return (
        <footer className='bg-slate-950 px-20 py-5 flex text-center justify-end text-gray-200 border-t-1 border-slate-600'>
            <div>
                <ul className='flex gap-6 justify-center'>
                    <li className='flex gap-1'>
                        <SocialMediaLogo url={github_url} Icon={FaGithub}/>
                    </li>
                    <li className='flex gap-1 text-blue'>
                        <SocialMediaLogo url={linkedin_url} Icon={FaLinkedin} />
                    </li>
                </ul>
            </div>
        </footer>
    )
}