import './assets/Popup.css'
import {useRef, useState, useEffect} from 'react'

export default function Popup (props) {
    const id = props.id
    const popup = useRef()
    const close = useRef()
    const open_on_session_start = props.open_on_session_start
    const [visible, setVisible] = useState(false);

    if (open_on_session_start) {
        useEffect(() => {
        let pop_status = localStorage.getItem('pop_status');
        if(!pop_status){
            setVisible(true);
            localStorage.setItem('pop_status', 1);
        }
        }, [])
    }

    useEffect(() => {
        close.current.addEventListener('click', function(){
            popup.current.classList.remove('active')
            document.getElementById('input').focus() // refocus on input
        })
    }, [])

    return (
        <div id={id} ref={popup} className={`popup${visible ? ' active' : ''}`}>
            <div ref={close} className="popup-close"></div>
            {props.children}
        </div>
    )
}