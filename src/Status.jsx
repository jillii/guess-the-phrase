import './assets/Status.css'

export default function Status(props) {
    const mistakes = props.mistakes
    console.log(mistakes)

    return(
        <div className="status-bar">
            {props.status &&
                <p className="wavy-text">
                    {props.status.split('').map((letter, index) => <span style={{'--i':index + 1}}>{letter}</span>)}
                </p>
            }
            {mistakes < 5 &&
                <div className='mistakes'>
                    <p>Mistakes remaining:</p>
                    <div className='bubbles'>
                        {[...Array(5)].map((x, index) => <div key={index} className={`bubble${mistakes > index ? ' hidden' : ''}`}></div>)}
                    </div>
                </div>
            }
        </div>
    );
}