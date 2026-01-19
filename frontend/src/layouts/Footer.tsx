import githubLogo from '../assets/github-icon.svg';
import { SocialMediaLogo } from '../components/SocialMediaLogo';
import linkedinLogo from '../assets/linkedin-icon.svg';

export default function Footer() {
    const github_url = 'https://github.com/ualrmg429';
    const linkedin_url = 'https://www.linkedin.com/in/raúl-martínez-gutiérrez-24350733b/';

    return (
        <footer className='bg-slate-950 px-20 py-5 flex text-center justify-end text-gray-200 border-t-1 border-slate-600'>
            <div>
                <ul className='flex gap-6 justify-center'>
                    <li className='flex gap-1'><SocialMediaLogo url={github_url} img={githubLogo} /></li>
                    <li className='flex gap-1'><SocialMediaLogo url={linkedin_url} img={linkedinLogo} /></li>
                </ul>
            </div>
        </footer>
    )
}