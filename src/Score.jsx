import './assets/Score.css'

export default function Score(props) {
    const prev = props.prevScore
    const score = props.score

    return (
        <p className={`score${Math.ceil(score) === 1000 ? ' flashy-text' : ''}`} id="score" onLoad={animateValue(prev, score)}>{Math.ceil(prev)}</p>
    );
}

function animateValue(start, end) {
    let counter = start
    setInterval(function(){
        if (counter <= end) {
            document.getElementById('score').innerHTML = Math.ceil(counter)
            counter++
        }
    }, 10);
}