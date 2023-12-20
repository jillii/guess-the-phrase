import { useState } from 'react'

export default function Status(props) {
    const len = props.failedGuesses.length

    return(
        <div className="status-bar">
            <p>{props.status}</p>
            {len > 0 && 'Failed guesses: ' + props.failedGuesses.join(' ')}
        </div>
    );
}