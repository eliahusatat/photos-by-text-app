import React from 'react'
import './Modal.css'

/***
 * generic modal component according to : https://www.digitalocean.com/community/tutorials/how-to-use-opacity-and-transparency-to-create-a-modal-in-css
 * @param children : the content of the modal
 * @param shown booleans : whether the modal should be shown or not
 * @param close func : function to close the modal
 */
const Modal = ({ children, shown, close }) =>{
    return shown ? (
        <div className="modal-backdrop"
            onClick={() => {
                // close modal when outside of modal is clicked
                close();
            }}>
            <div className="modal-content"
                onClick={e => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                {children}
            </div>
        </div>
    ) : null;
}

export default Modal
