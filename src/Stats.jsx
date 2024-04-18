import Board from './Board'

export default function Stats(props) {
    const gamesPlayed = props.gamesPlayed
    const wins = props.wins
    const stats = props.stats

    return(
        <>
            <b>STATS</b>
            <p>Games played: {gamesPlayed}</p>
            <p>Win ratio: {wins == 0 ? 0 : (wins / gamesPlayed) * 100}%</p>
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