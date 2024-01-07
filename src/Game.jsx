import Board from './Board'
import Input from './Input'
import Notice from './Notice'
import Status from './Status'
import Guess from './Guess'
import Score from './Score'
import { useState, useRef, useEffect } from 'react'
import { PHRASES } from './phrases'

export default function Game() {
    const answer = useRef(getPhrase()).current
    // const answer = ['T', 'E', 'S', 'T']
    const length = answer.reduce((accum, x) => x === ' ' ? accum : accum + x, '').length // get length of phrase without spaces
    const [board, setBoard] = useState(new Array(answer.length).fill(' '))
    const [guess, setGuess] = useState('')
    const [status, setStatus] = useState('')
    const [mistakes, setMistakes] = useState(4);
    const [score, setScore] = useState(0);
    const [prevScore, setPrevScore] = useState(score)
    const [notices, setNotices] = useState([])
    const [noticeStep, setNoticeStep] = useState(0)

    const handleGuess = (guess) => {
        if (status == '') { // user hasn't won or lost
            const newBoard = [...board]
            let points = 0
            let miss = true;
            let newNotices = []

            setGuess(guess)
            setPrevScore(score)

            answer.map((letter, index) => {
                if (guess === letter) {
                    points += 100 / length
                    newBoard[index] = letter;
                    miss = false;
                    newNotices = [...newNotices, `+${Math.ceil(100 / length)}`]
                }
            });
            if (points > 0) {
                setNotices(newNotices)
                setNoticeStep(noticeStep + 1)
                setScore(score + Math.ceil(points))
            }

            if (miss) { 
                setMistakes(mistakes - 1)
                // handle losing
                if (mistakes <= 1) { setStatus('you lose') }
            }
            setBoard([...newBoard])
            // handle winning
            if (JSON.stringify(newBoard) == JSON.stringify(answer)) { setStatus('you win') }
        }
    }
    // add points for remaining mistakes
    useEffect(() => {
        let newNotices = notices
        if (!!status && status === 'you win') {
            [...Array(mistakes)].map(x => {
                newNotices = [...newNotices, '+10']
            })
            setNotices(newNotices)
            setScore(score + (mistakes * 10))
        }
      }, [status]);

    return(
        <> 
            <Input onGuess={handleGuess} />
            <Notice notices={notices} key={noticeStep} />
            <Score score={score} prevScore={prevScore} />
            <Board board={board} answer={answer} guess={guess} mistakes={mistakes} />
            <Status status={status} mistakes={mistakes} />
            <Guess 
                answer={answer}
                length={length}
                board={board}
                setBoard={setBoard}
                status={status}
                setStatus={setStatus}
                setMistakes={setMistakes}
                mistakes={mistakes}
                score={score}
                setScore={setScore}
                setNotices={setNotices}
                noticeStep={noticeStep}
                setNoticeStep={setNoticeStep}
            />
        </>
    );
}

function getPhrase() {
    return PHRASES[Math.floor(Math.random() * PHRASES.length)].toUpperCase().split("");
}