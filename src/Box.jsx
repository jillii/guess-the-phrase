import './assets/Box.css'

export default function Box(props) {
    const status = props.status
    const isMiss = status < 0 && props.value === ' '
    const value = isMiss ? props.answer : props.value
    const delay = props.delay

    return (
        <div className={`box${isMiss ? ' is-miss' : ''}${status == 1 ? ' is-win' : ''}`}>
            {value !== ' ' && <p style={{animationDelay: `${delay}s`}}>{value}</p>}
        </div>
    )
}