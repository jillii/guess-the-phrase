import { useState } from 'react'

export default function Status(props) {

    return(
        <div className="status-bar">
            <p>{props.status}</p>
            {props.failedGuesses.length > 0 && 'Failed guesses: ' + props.failedGuesses.join(' ')}
        </div>
    );
}