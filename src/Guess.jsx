import { useRef } from "react"

export default function Guess(props) {
    const inputRef = useRef()
    const answer = props.answer
    const setStatus = props.setStatus
    const setBoard = props.setBoard

    const handleGuess = (e) => {
        e.preventDefault()
        const input = inputRef.current.value.toUpperCase()
        if (input === answer.join('')) {
            setStatus('you win!')
            setBoard([...answer])
        }
        inputRef.current.value = ''
    }
    return(
        <form onSubmit={handleGuess} method="get">
            <input type="text" ref={inputRef} placeholder="Guess the phrase..." />
            <input type="submit" value="Enter" />
        </form>
    );
}