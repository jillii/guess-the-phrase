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
    const [possibleGuesses, setPossibleGuesses] = useState(['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'])
    const [status, setStatus] = useState('')
    const [mistakes, setMistakes] = useState(4);
    const [score, setScore] = useState(0);
    const [prevScore, setPrevScore] = useState(score)
    const [notices, setNotices] = useState([])
    const [noticeStep, setNoticeStep] = useState(0)

    const handleGuess = (guess) => {
        
        if (status == '') { // user hasn't won or lost
            let newNotices = []

            if (possibleGuesses.includes(guess)) {
                
                const newBoard = [...board]
                let points = 0
                let miss = true;
                
                setGuess(guess)
                setPossibleGuesses(possibleGuesses.filter(x => x !== guess))
                setPrevScore(score)

                answer.map((letter, index) => {
                    if (guess === letter) {
                        points += 100 / length
                        newBoard[index] = letter;
                        miss = false;
                        newNotices = [...newNotices, `+${Math.ceil(100 / length)}`]
                    }
                });

                if (miss) { 
                    setMistakes(mistakes - 1)
                    // handle losing
                    if (mistakes <= 1) { setStatus('you lose') }
                } else {
                    setNotices(newNotices)
                    setNoticeStep(noticeStep + 1)
                    setScore(score + Math.ceil(points))
                }
                setBoard([...newBoard])
                // handle winning
                if (JSON.stringify(newBoard) == JSON.stringify(answer)) { setStatus('you win') }
            } else { // guess has already been guessed
                newNotices = [...newNotices, 'you already guessed that']
                setNotices(newNotices)
                setNoticeStep(noticeStep + 1)
            }
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
            <a className="refresh" href="/">New Game?</a>
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
                mistakes={mistakes}
                setMistakes={setMistakes}
                score={score}
                setScore={setScore}
                notices={notices}
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