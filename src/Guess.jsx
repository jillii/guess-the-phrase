import { useRef } from "react"
import './assets/Guess.css'

export default function Guess(props) {
    const inputRef = useRef()
    const answer = props.answer
    const status = props.status
    const setStatus = props.setStatus
    const setBoard = props.setBoard

    const handleGuess = (e) => {
        e.preventDefault()
        const input = inputRef.current.value.toUpperCase()
        if (input === answer.join('')) {
            setStatus('you win!')
            setBoard([...answer])
        } else {
            props.setMistakes(props.mistakes - 1)
        }
        inputRef.current.value = ''
    }

    return(
        status === '' && (
            <form onSubmit={handleGuess} method="get">
                <input type="text" ref={inputRef} placeholder="Solve the puzzle" />
                <input type="submit" value="Enter" className="button-67" />
            </form>
    )
    );
}