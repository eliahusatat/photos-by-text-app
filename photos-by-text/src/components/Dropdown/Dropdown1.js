import React, { useState ,useEffect } from 'react';
import './Dropdown1.scss';

function Dropdown1({ title = 'search history', items, multiSelect = false , onChangeDropdown}) {
// function Dropdown() {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    // const toggle = () => setOpen(!open);
    // Dropdown.handleClickOutside = () => setOpen(false);

    function handleOnClick(item) {
        if (!selection.some(current => current.value === item.value)) {
            if (!multiSelect) {
                setSelection([item]);
            } else if (multiSelect) {
                setSelection([...selection, item]);
            }
        } else {
            let selectionAfterRemoval = selection;
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.value !== item.value
            );
            setSelection([...selectionAfterRemoval]);
        }
    }

    // function isItemInSelection(item) {
    //     if (selection.some(current => current.value === item.value)) {
    //         return true;
    //     }
    //     return false;
    // }

    useEffect(() => {
        if (selection.length > 0) {
            onChangeDropdown(selection[0].value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selection]);

    return (
        // <div className="dd-wrapper">
        //     <div
        //         tabIndex={0}
        //         className="dd-header"
        //         role="button"
        //         onKeyPress={() => toggle(!open)}
        //         onClick={() => toggle(!open)}
        //     >
        //         <div className="dd-header__title">
        //             <p className="dd-header__title--bold">{title}</p>
        //         </div>
        //
        //     </div>
        //     {open && (
        //         <ul className="dd-list">
        //             {items.map((item,index) => (
        //                 <li className="dd-list-item" key={index}>
        //                     <button type="button" onClick={() => handleOnClick(item)}>
        //                         <span>{item.value}</span>
        //                         {/*<span>{isItemInSelection(item) && 'Selected'}</span>*/}
        //                     </button>
        //                 </li>
        //             ))}
        //         </ul>
        //     )}
        // </div>
        <div className="dropdown">
            <button className="dropbtn">{title}</button>
            <div className="dropdown-content">
                         <ul className="dd-list">
                             {items.map((item,index) => (
                                                 <li className="dd-list-item" key={index}>
                                                     <button type="button" onClick={() => handleOnClick(item)}>
                                                         <span>{item.value}</span>
                                                         {/*<span>{isItemInSelection(item) && 'Selected'}</span>*/}
                                                     </button>
                                                 </li>
                            ))}
                        </ul>
            </div>
        </div>
    );
}



export default Dropdown1;
