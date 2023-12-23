import Board from './Board'
import Input from './Input'
import Status from './Status'
import { useState, useRef } from 'react'
import { PHRASES } from './phrases'

export default function Game() {
    const answer = useRef(getPhrase()).current
    const [board, setBoard] = useState(new Array(answer.length).fill(' '))
    const [guess, setGuess] = useState('')
    const [status, setStatus] = useState('')
    const [mistakes, setMistakes] = useState(0);

    const handleGuess = (guess) => {
        if (status == '') { // user hasn't won or lost
            const newBoard = [...board]
            let miss = true;

            setGuess(guess)

            answer.map((letter, index) => {
                if (guess === letter) {
                    newBoard[index] = letter;
                    miss = false;
                }
            });
            if (miss) { 
                setMistakes(mistakes + 1)
                // handle losing
                if (mistakes > 3) { setStatus('you lose') }
            }
            setBoard([...newBoard])
            // handle winning
            if (JSON.stringify(newBoard) == JSON.stringify(answer)) { setStatus('you win') }
        }
    }

    return(
        <> 
            <Input onGuess={handleGuess} />
            <Board board={board} answer={answer} guess={guess} />
            <Status status={status} mistakes={mistakes} />
        </>
    );
}

function getPhrase() {
    return PHRASES[Math.floor(Math.random() * PHRASES.length)].toUpperCase().split("");
}