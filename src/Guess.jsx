import { useRef } from "react"
import './assets/Guess.css'

// try to guess the whole phrase
export default function Guess(props) {
    const inputRef = useRef()
    const answer = props.answer
    const length = props.length
    const status = props.status
    const setStatus = props.setStatus
    const board = props.board
    const setBoard = props.setBoard
    const score = props.score
    const setScore = props.setScore

    const handleGuess = (e) => {
        e.preventDefault()
        const input = inputRef.current.value.toUpperCase()
        if (input === answer.join('')) {
            // get extra points
            let newScore = score
                board.map((x, index) => {
                    if (x === ' ' && answer[index] !== ' ') {
                        newScore += 2000 / length
                    }
                }
            )

            setStatus('you win')
            setBoard([...answer])
            setScore(newScore)
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