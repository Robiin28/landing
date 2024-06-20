import React, { useState } from "react";
import Modal from "./Modal"; // Ensure this component is properly defined
import ReactDOM from "react-dom";
import './nav.css'

function Nav() {
  const [showModal, setShowModal] = useState(false);

  function displayModal() {
    setShowModal(true);
  }

  function hideModal() {
    setShowModal(false);
  }

  return ReactDOM.createPortal(
    <>
      <button onClick={displayModal}  className={"modal"}>Show Modal</button>
      <Modal showModal={showModal} hideModal={hideModal} />
    </>,
    document.getElementById('footer')
  );
}

export default Nav;
