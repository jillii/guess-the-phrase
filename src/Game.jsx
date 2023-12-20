import Board from './Board'
import Input from './Input'
import { useState } from 'react'

export default function Game() {
    const answer = ['I', 'F', ' ', 'T', 'H', 'E', 'R', 'E', 'S', ' ', 'A', ' ', 'W', 'I', 'L', 'L', ' ', 'T', 'H', 'E', 'R', 'E', 'S', ' ', 'A', ' ', 'W', 'A', 'Y']
    const [board, setBoard] = useState(new Array(answer.length).fill(' '))
    const [guess] = useState('')
    const [count, setCount] = useState(0)

    const handleGuess = (guess) => {
        const newBoard = [...board]
        let miss = true;

        answer.map((letter, index) => {
            if (guess === letter) {
                newBoard[index] = letter;
                miss = false;
            }
        });
        if (miss) { setCount(count + 1) }
        setBoard([...newBoard])
    }

    return(
        <> 
            <Input guess={guess} onGuess={handleGuess} />
            <Board board={board} answer={answer} />
        </>
    );
}