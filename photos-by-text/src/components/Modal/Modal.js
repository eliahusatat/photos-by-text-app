import React from 'react'
import './Modal.scss'
const Modal = ({open,close,children}) =>{
    const classModal = open ? "modal--open" : "modal--close"

    return(
        <div className={classModal}>
            <div className="modal">
                <span className="close" onClick={close}>X</span>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal
