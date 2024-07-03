import Board from './Board'
import { useRef, useEffect } from 'react'

export default function Stats(props) {
    const totalRef = useRef()
    const gamesPlayed = props.gamesPlayed
    const wins = props.wins
    const stats = props.stats
    const total = props.total
    const status = props.status

    useEffect(() => {
        if (!!stats && !!status) {
            setTimeout(function(){
                document.getElementById('stats').classList.add('animate', 'active')
                animateValue(totalRef.current, total - stats[0].score, total)
                console.log(stats[0].score)
            }, 2000)
        }
    }, [status])


    return(
        <>
            <b>STATS</b>
            <p>Games played: {gamesPlayed}</p>
            <p>Win ratio: {wins == 0 ? 0 : (wins / gamesPlayed) * 100}%</p>
            <p>Total: <span ref={totalRef}>{total}</span></p>
            <div className='stat-wrapper'>
                {stats.map((item, index) => {
                    return (
                        <div key={index} className='stat'>
                            <p>{item.win ? 'success' : 'fail'}</p>
                            <p>Score: {item.score}</p>
                            {item.win && item.mistakes > 0 && <p>Mistakes: {item.mistakes}</p>}
                            <Board key={index} board={item.board} answer={item.answer} mistakes={0} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

const animateValue = (el, start, end) => {
    let counter = start

    if (el) {
        setInterval(function(){
            if (counter <= end) {
                el.innerHTML = Math.ceil(counter)
                counter++
            }
        }, 50);
    }
}