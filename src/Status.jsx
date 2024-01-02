import './assets/Status.css'

export default function Status(props) {
    const mistakes = props.mistakes

    return(
        <div className="status-bar">
            {mistakes > 0 &&
                <div className='mistakes'>
                    <p>Mistakes remaining:</p>
                    <div className='bubbles'>
                        {[...Array(4)].map((x, index) => <div key={index} className={`bubble${mistakes < index + 1 ? ' hidden' : ''}`}><div className='bubble-inner'></div></div>)}
                    </div>
                </div>
            }
            {props.status &&
                <p className="wavy-text">
                    {props.status.split('').map((letter, index) => <span key={index} style={{'--i':index + 1}}>{letter}</span>)}
                </p>
            }
        </div>
    );
}