import Board from './Board'
import Input from './Input'
import { useState, useEffect } from 'react'

export default function Game() {
    const answer = ['I', 'F', ' ', 'T', 'H', 'E', 'R', 'E', 'S', ' ', 'A', ' ', 'W', 'I', 'L', 'L', ' ', 'T', 'H', 'E', 'R', 'E', 'S', ' ', 'A', ' ', 'W', 'A', 'Y']
    const [board, setBoard] = useState(new Array(answer.length).fill(' '))
    const [guess, setGuess] = useState('A')
    const [count, setCount] = useState(0)
    let newBoard = board

    useEffect(() => {
        setCount(count + 1)
        answer.map((letter, index) => {
            if (guess == letter) {
                newBoard[index] = letter
            }
        })
        setBoard(newBoard)  
    }, [guess, board])

    return(
        <> 
            <Input guess={guess} setGuess={setGuess} />
            <Board board={board} answer={answer} />
        </>
    );
}