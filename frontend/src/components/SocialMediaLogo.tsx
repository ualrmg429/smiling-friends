import type { IconType } from 'react-icons';

interface Props {
    url: string;
    Icon: IconType;
    className?: string;
}

export function SocialMediaLogo({ url, Icon, className='' }: Props) {
    return(
    <a href={url} target='_blank' rel='noopener noreferrer'>
            <Icon className={`w-6 h-6 ${className}`} />     
    </a>
    )
}