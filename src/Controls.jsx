import './assets/controls.css'
export default function Controls(props) {
    return(
        <div className="controls">
            {props.children}
        </div>
    );
}