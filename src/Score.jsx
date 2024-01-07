import './assets/Score.css'

export default function Score(props) {
    const prev = props.prevScore
    const score = props.score

    console.log(prev)
    console.log(score)

    return (
        <p className={`score${Math.ceil(score) === 1000 ? ' flashy-text' : ''}`} id="score" onLoad={animateValue(prev, score)}>{Math.ceil(prev)}</p>
    );
}

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