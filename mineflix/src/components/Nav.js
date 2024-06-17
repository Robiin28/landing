import React, { useState } from "react";
import Modal from "./Modal"; // Ensure this component is properly defined
import ReactDOM from "react-dom";

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
      <h1>Hello Nav</h1>
      <button onClick={displayModal}>Show Modal</button>
      <Modal showModal={showModal} hideModal={hideModal} />
    </>,
    document.getElementById('footer')
  );
}

export default Nav;
