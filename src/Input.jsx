import { useRef, useState } from "react";

export default function Input(props) {
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onGuess(inputRef.current.value.toUpperCase())   
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                ref={inputRef}
                placeholder="Make a guess"
                maxLength="1"
            />
            <button type="submit">Enter</button>
        </form>
    );
}