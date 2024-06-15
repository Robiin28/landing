import React from 'react';

const Modal = (props) => {
  // Inline styles for modal and overlay
  const modalStyle = {

    position: 'fixed',
    width:'300px',
    height:'500px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'grey',
    padding: '30px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: '1001',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    opacity: props.showModal ? 1 : 0,
    visibility: props.showModal ? 'visible' : 'hidden',
  };
  const overlayStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly reduce the opacity for a better blur effect
    zIndex: '1000',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    opacity: props.showModal ? 1 : 0,
    visibility: props.showModal ? 'visible' : 'hidden',
    pointerEvents: props.showModal ? 'auto' : 'none', // Prevents interaction when hidden
    backdropFilter: props.showModal ? 'blur(8px)' : 'none', // Apply blur effect
    WebkitBackdropFilter: props.showModal ? 'blur(10px)' : 'none', // Safari support
  };
  return (
    <>
      {/* Modal Content */}
      <div style={modalStyle}>
        <h2>Alert Message</h2>
        <p>Sample paragraph</p>
        <button className={'btn'} onClick={props.hideModal}>OK</button>
      </div>
      {/* Overlay */}
      <div 
        style={overlayStyle} 
        onClick={props.hideModal}
      >

      </div>
    </>
  );
};

export default Modal;
