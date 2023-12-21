import Board from './Board'
import Input from './Input'
import Status from './Status'
import { useState, useRef } from 'react'
import { PHRASES } from './phrases'

export default function Game() {
    const answer = useRef(getPhrase()).current
    const [board, setBoard] = useState(new Array(answer.length).fill(' '))
    const [guess] = useState('')
    const [status, setStatus] = useState('')
    const [failedGuesses, setFailedGuesses] = useState([]);

    const handleGuess = (guess) => {
        if (status == '') { // user hasn't won or lost
            const newBoard = [...board]
            let miss = true;

            answer.map((letter, index) => {
                if (guess === letter) {
                    newBoard[index] = letter;
                    miss = false;
                }
            });
            if (miss) { 
                const newFailedGuesses = [...failedGuesses, guess]
                setFailedGuesses(newFailedGuesses)
                // handle losing
                if (failedGuesses.length > 3) { setStatus('you lose') }
            }
            setBoard([...newBoard])
            // handle winning
            if (JSON.stringify(newBoard) == JSON.stringify(answer)) { setStatus('you win') }
        }
    }

    return(
        <> 
            <Input guess={guess} onGuess={handleGuess} />
            <Board board={board} answer={answer} />
            <Status status={status} failedGuesses={failedGuesses} />
        </>
    );
}

function getPhrase() {
    return PHRASES[Math.floor(Math.random() * PHRASES.length)].toUpperCase().split("");
}