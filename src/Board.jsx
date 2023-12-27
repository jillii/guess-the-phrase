import Box from './Box'
import './assets/Board.css'

export default function Board(props) {
    const answer = props.answer
    const guess = props.guess
    const currentBoard = props.board
    let status = 0
    let delay = 0
    let count = -2
    // handle lose
    if (props.mistakes <= 0) {
        status = -1
    }
    // handle win
    if (JSON.stringify(currentBoard) == JSON.stringify(props.answer)) {
        status = 1
    }

    const board = answer.join('').split(' ').map((word, index) => {
        count++
        return (
            <div className='word' key={index}>
                {word.split('').map((letter, index) => {
                    if (guess === answer[index]) {delay = delay + .5}
                    {count = count + 1}
                    return <Box key={index} value={currentBoard[count]} answer={answer[count]} delay={guess === answer[count] ? delay : '0'} status={status} />
                })}
            </div>
        )
    })

    return (
        <div className='board'>
            {board}
        </div>
    );
}
