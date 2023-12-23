import './assets/Status.css'

export default function Status(props) {
    const len = props.failedGuesses.length


    return(
        <div className="status-bar">
            <p className="wavy-text">
                {props.status.split('').map((letter, index) => <span style={{'--i':index + 1}}>{letter}</span>)}
            </p>
            {len > 0 && 'Failed guesses: ' + props.failedGuesses.join(' ')}
        </div>
    );
}