import Box from './Box'
import './assets/Board.css'

export default function Board(props) {
    const board = props.board
    const answer = props.answer

    return (
        <div className='board'>
            {board.map((letter, index) => <Box key={index} value={letter} isSpace={answer[index] == ' '} />)}
        </div>
    );
}

