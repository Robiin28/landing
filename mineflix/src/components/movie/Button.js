

function Button(props) {
    return (
        <div>
            <button onClick={props.eventHandler} disabled={props.disable}>{props.children}</button>
        </div>
  );
}
export default Button;
