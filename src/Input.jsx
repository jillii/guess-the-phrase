import { useRef, useEffect } from "react"
import './assets/Input.css'

export default function Input(props) {
    const input = useRef(null)

    const handleSubmit = () => {
        const value = input.current.value.toUpperCase()

        props.onGuess(value)
        // reset
        input.current.value = ''
    }

    const handleBlur = (e) => {
        setTimeout(function(){
            if (document.activeElement.id !== 'guessInput') {
                e.target.focus()
            }
         },1);
    }

    return <input id="input" type="text" style={{opacity: '0'}} maxLength="1" onChange={handleSubmit} ref={input} onBlur={handleBlur} autoFocus />;
}

