interface Props {
    url: string;
    img: string;
}

export function SocialMediaLogo({ url, img }: Props) {
    return(
    <a href={url} className='justify-center'>
        <img className='h-6' src={img} alt="media-logo"/>
    </a>
    )
}