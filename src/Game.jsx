import Board from './Board'
import Input from './Input'
import Popup from './Popup'
import Notice from './Notice'
import Status from './Status'
import Guess from './Guess'
import Score from './Score'
import Controls from './Controls'
import Stats from './Stats'
import confetti from 'canvas-confetti'
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
    const defaults = {spread: 360, ticks: 100, gravity: 1, decay: 0.94, startVelocity: 20, colors: ['0000ff', 'ff00ff', '7fff00', 'ff4500', 'FDFFB8']}
    const storage = JSON.parse(window.sessionStorage.getItem("stats"))
    const [stats, setStats] = useState(storage)
    const [gamesPlayed, setGamesPlayed] = useState(JSON.parse(window.sessionStorage.getItem("gamesPlayed")) || 0)
    const [wins, setWins] = useState(JSON.parse(window.sessionStorage.getItem("wins")) || 0)
    const [total, setTotal] = useState(JSON.parse(window.sessionStorage.getItem("total")) || 0)
    
    function stars() {
        confetti({...defaults, particleCount: 20, scalar: 1.2, shapes: ['star']})
        confetti({...defaults, particleCount: 80, scalar: 0.75, shapes: ['circle']})
    }

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
                    if (mistakes <= 1) { 
                        setStatus('you lose')
                    }
                } else {
                    setNotices(newNotices)
                    setNoticeStep(noticeStep + 1)
                    setScore(score + Math.ceil(points))
                }
                setBoard([...newBoard])
                // handle winning
                if (JSON.stringify(newBoard) == JSON.stringify(answer)) {
                    setStatus('you win')
                }
            
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
        if (!!status) {
            // handle winning
            if (status === 'you win') {
                [...Array(mistakes)].map(x => {
                    newNotices = [...newNotices, '+10']
                })
                setNotices(newNotices)
                setScore(score + (mistakes * 10))

                setTimeout(stars, 0)
                setTimeout(stars, 500)
                setTimeout(stars, 800)
                setTimeout(stars, 1200)
                setTimeout(stars, 1600)

                setWins(wins + 1)
            }
            // update stats
            const newStats = {
                board: board,
                answer: answer,
                score: score + mistakes * 10,
                win: JSON.stringify(board) == JSON.stringify(answer),
                mistakes: 4 - mistakes
            }
            if (storage) {
                setStats([newStats, ...storage])
            } else {
                setStats([newStats])
            }

            setGamesPlayed(gamesPlayed + 1)
            setTotal(total + score + mistakes * 10)
        }
    }, [status]);
    // post game (win or lose)
    useEffect(() => {
        if (!!stats && !!status) {
            window.sessionStorage.setItem('stats', JSON.stringify(stats))
            window.sessionStorage.setItem('gamesPlayed', JSON.stringify(gamesPlayed))
            window.sessionStorage.setItem('wins', JSON.stringify(wins))
            window.sessionStorage.setItem('total', JSON.stringify(total))
        }
    }, [stats])
    // console.log(total)
    return(
        <> 
            <Input onGuess={handleGuess} />
            <Controls>
                <a href=".">Restart</a>
                <a href='#' onClick={e => {e.preventDefault(); document.getElementById('rules').classList.add('active')}}>Rules</a>
                {stats && <a href='#' onClick={e => {e.preventDefault(); document.getElementById('stats').classList.add('active')}}>Stats</a>}
            </Controls>
            <Popup id="rules" open_on_session_start={true}>
                <b>Rules</b>
                <p>We give you a random phrase, and you have to guess what it is. Use your keyboard to guess a letter. When you think you know the answer, click "MAKE A GUESS" to guess the whole phrase.</p>
                <b>Scoring</b>
                <p>Each letter you guess correctly is 100 divided by the length of the phrase. If you guess the whole phrase correctly, each letter you uncover will be 200 divided by the length of the phrase. Upon winning, you will be awared 10 extra points for each mistake you did not use.</p>
                <b>Penalties</b>
                <p>You have 4 mistakes, before you lose. You will not be penalized for guessing the same wrong letter twice. Incorrectly gueesing the whole phrase will cost one mistake.</p>
            </Popup>
            {stats &&
                <Popup id="stats">
                    <Stats gamesPlayed={gamesPlayed} wins={wins} total={total} stats={stats} status={status} />
                </Popup>
            }
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
