import './assets/Notice.css'

export default function Notice(props) {
    return (
        props.notices.map((notice, index) =>
            <p key={index} className='fade-up notice' style={{animationDelay: `${index / 2}s`}}>{notice}</p>
        )
    )
}
