import './assets/Box.css'

export default function Box(props) {
    const status = props.status
    const isSpace = props.isSpace
    const isMiss = status < 0 && !isSpace && props.value === ' '
    const value = isMiss ? props.answer : props.value
    const delay = props.delay

    return (
        <div className={`box${isSpace ? ' is-space' : ''}${isMiss ? ' is-miss' : ''}${status == 1 && !isSpace ? ' is-win' : ''}`}>
            {value !== ' ' && <p style={{animationDelay: `${delay}s`}}>{value}</p>}
        </div>
    )
}