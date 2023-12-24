import Box from './Box'
import './assets/Board.css'

export default function Board(props) {
    const answer = props.answer
    const guess = props.guess
    let status = 0
    let delay = 0
    // handle lose
    if (props.mistakes <= 0) {
        status = -1
    }
    // handle win
    if (JSON.stringify(props.board) == JSON.stringify(props.answer)) {
        status = 1
    }

    const board = props.board.map((letter, index) => {
        if (guess === answer[index]) {delay = delay + .5}
        return <Box key={index} value={letter} isSpace={answer[index] == ' '} delay={guess === answer[index] ? delay : '0'} status={status} />
    })

    return (
        <div className='board'>
            {board}
        </div>
    );
}
