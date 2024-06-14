
import React,{useState} from "react";
import Modal from "./Modal";
import ReactDOM from "react-dom";


function Nav() {
 let[showModel,updateShowModel]=useState(false);
     function displayModel(){
         updateShowModel(true);
        }
        function hideModal(){
          updateshowModal(false);
        }
  return ReactDOM.createPortal(
    <>
    <h1>helllooo nav</h1>
    <button onClick={displayModel}>show Model</button>
    <Modal showModal={showModal} hideModal={hideModal}></Modal>
    </>,
    document.getElementById('footer')
  );
}

export default Nav;
