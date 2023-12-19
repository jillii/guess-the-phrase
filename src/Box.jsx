import './assets/Box.css'

export default function Box(props) {
    const value = props.value
    const isSpace = props.isSpace

    return (
        <div className={`box ${isSpace && ' is-space'}`}>{value}</div>
    )
}