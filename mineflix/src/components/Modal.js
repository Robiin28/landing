const Modal=(props)=>{
    return<>
   <div className={`alert ${props.showModal ? '':'hidden'}`}>
   <h2>alert message</h2>
   <p>sample paragraph</p>
   <button className="modal-btn" onClick={props.hideModal}>OK</button>
   </div>
   <div className={`overlay ${props.showModal ? '': 'hidden'}`}></div>
    </>
}
export default Modal;