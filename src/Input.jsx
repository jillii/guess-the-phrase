import { useRef, useState } from "react"
import './assets/Input.css'

export default function Input(props) {
    const inputRef = useRef()
    const [possibleGuesses, setPossibleGuesses] = useState(['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'])


    const handleSubmit = (e) => {
        e.preventDefault();
        const input = inputRef.current.value.toUpperCase()

        props.onGuess(input)
        setPossibleGuesses(possibleGuesses.filter(x => x !== input))
        // reset select
        inputRef.current.value = 'Select'
    }

    return (
        <div className="select">
            <select className="style widthHeight" onChange={handleSubmit} ref={inputRef}>
                <option value="select" style={{pointerEvents: 'none'}}>Select</option>
                {possibleGuesses.map((letter, index) =>
                    <option key={index} value={letter}>{letter}</option>
                )}
            </select>
        </div>
    );
}