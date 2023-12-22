import Box from './Box'
import './assets/Board.css'

export default function Board(props) {
    const answer = props.answer
    const guess = props.guess
    let delay = 0

    const board = props.board.map((letter, index) => {
        if (guess === answer[index]) {delay = delay + .5}
        return <Box key={index} value={letter} isSpace={answer[index] == ' '} delay={guess === answer[index] ? delay : '0'} />
    })

    return (
        <div className='board'>
            {board}
        </div>
    );
}
