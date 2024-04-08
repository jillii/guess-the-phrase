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

    useEffect(() => {
        const elem = input.current;
        elem.focus()

        function refocus(elm) {
            elm.focus()
        }
        elem.addEventListener('blur', function() {
            refocus(elem)
        });
    
    }, [])

    return <input id="input" type="text" maxLength="1" onChange={handleSubmit} ref={input} autoFocus />;
}

