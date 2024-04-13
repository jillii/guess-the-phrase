import { useRef, useEffect } from "react"
import Popup from "./Popup"
import './assets/Guess.css'

// try to guess the whole phrase
export default function Guess(props) {
    const inputRef = useRef()
    const popupOpenRef = useRef()
    const answer = props.answer
    const length = props.length
    const status = props.status
    const setStatus = props.setStatus
    const board = props.board
    const setBoard = props.setBoard
    const score = props.score
    const setScore = props.setScore
    const notices = props.notices
    const setNotices = props.setNotices
    const noticeStep = props.noticeStep
    const setNoticeStep = props.setNoticeStep

    const handleGuess = (e) => {
        e.preventDefault()
        const input = inputRef.current.value.toUpperCase()
        if (input === '') {
            setNotices(['make a guess...'])
            setNoticeStep(noticeStep + 1)
        } else {
            if (input === answer.join('')) { // correct guess
                let points = 0
                let newNotices = []
                board.map((x, index) => {
                    if (x === ' ' && answer[index] !== ' ') {
                        points += 200 / length
                        newNotices = [...newNotices, `+${Math.ceil(200 / length)}`]
                    }
                })
                setNotices(newNotices)
                setStatus('you win')
                setBoard([...answer])
                setScore(score + points)
            } else { // wrong guess
                props.setMistakes(props.mistakes - 1)
                setNotices(['maybe next time'])
                setNoticeStep(noticeStep + 1)
            }
            inputRef.current.value = ''
        }
    }
    // handle popup open
    useEffect(() =>{
        popupOpenRef.current.addEventListener('click', function(){
            inputRef.current.focus()
        })
    }, [])

    return(
        status === '' && (
            <>
                <Popup id="popup">
                    <form id="guessForm" onSubmit={handleGuess} method="get">
                        <input id="guessInput" type="text" ref={inputRef} placeholder="Solve the puzzle" />
                        <input type="submit" value="Enter" className="button submit-guess" />
                    </form>
                </Popup>
                <button ref={popupOpenRef} className="btn popup-open do-it" onClick={e => {e.preventDefault(); document.getElementById('popup').classList.add('active')}}>Make a Guess</button>
            </>
        )
    );
}