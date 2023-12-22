import './assets/Box.css'

export default function Box(props) {
    const value = props.value
    const isSpace = props.isSpace
    const delay = props.delay

    return (
        <div className={`box${isSpace ? ' is-space' : ''}`}>
            {value !== ' ' && <p style={{animationDelay: `${delay}s`}}>{value}</p>}
        </div>
    )
}