import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Modal from './Modal'
let node = null
const ModalWrapper = (props) =>{
    useEffect(()=>{
        node && ReactDOM.render(<Modal {...props} />,node)
    })
    useEffect(()=>{
        node = document.createElement('div')
        document.body.appendChild(node)
        ReactDOM.render(<Modal {...props} />,node)
        // eslint-disable-next-line
    },[])
    return(
        <script />
    )
}
export default ModalWrapper
