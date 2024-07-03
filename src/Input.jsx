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
        const elem = input.current
        const popup = document.getElementById('popup')
        elem.click()
    }, [])

    return <input autoFocus id="input" type="text" maxLength="1" style={{opacity: '0'}} onChange={handleSubmit} ref={input} />;
}

