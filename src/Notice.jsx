import './assets/Notice.css'

export default function Notice(props) {
    let delay = 0

    return (
        props.notices.map(notice => {
            delay++
            return <p className='fade-up' style={{animationDelay: `${delay / 2}s`}}>{notice}</p>
        })
    )
}
