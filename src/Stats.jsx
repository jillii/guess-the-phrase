import Board from './Board'

export default function Stats(props) {
    const gamesPlayed = props.gamesPlayed
    const wins = props.wins
    const stats = props.stats
    const total = props.total

    return(
        <>
            <b>STATS</b>
            <p>Games played: {gamesPlayed}</p>
            <p>Win ratio: {wins == 0 ? 0 : (wins / gamesPlayed) * 100}%</p>
            <p>Total: <span id='total' onLoad={animateValue(total - stats[0].score, total)}>0</span></p>
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

function animateValue(start, end) {
    let counter = start
    const el = document.getElementById('total')

    if (el) {
        setInterval(function(){
            if (counter <= end) {
                el.innerHTML = Math.ceil(counter)
                counter++
            }
        }, 50);
    }
}