import './assets/Score.css'
import { memo } from 'react';

export default memo(function Score(props) {
    const prev = props.prevScore
    const score = props.score

    return (
        <p className={`score${Math.ceil(score) === 1000 ? ' flashy-text' : ''}`} id="score" onLoad={animateValue(prev, score)}>{Math.ceil(prev)}</p>
    );
})

function animateValue(start, end) {
    let counter = start
    const el = document.getElementById('score')

    if (el) {
        setInterval(function(){
            if (counter <= end) {
                el.innerHTML = Math.ceil(counter)
                counter++
            }
        }, 50);
    }
}