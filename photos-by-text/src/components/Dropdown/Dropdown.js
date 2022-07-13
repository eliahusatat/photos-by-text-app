import React, { useState ,useEffect } from 'react';
import './Dropdown.scss';

/***
 * generic dropdown component according to:
 * @param title : string - The title of the dropdown button
 * @param items array  - items to display in the dropdown
 * @param multiSelect : boolean - multiple items to be selected?
 * @param onChangeDropdown :function - called when the dropdown is changed
 */
function Dropdown({ title = 'search history', items, multiSelect = false , onChangeDropdown}) {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    const toggle = () => setOpen(!open);


    function handleOnClick(item) {
        if (!selection.some(current => current.value === item.value)) {  // if not selected insert to selection list
            if (!multiSelect) {
                setSelection([item]);
            } else if (multiSelect) {
                setSelection([...selection, item]);
            }
        } else { // if already selected remove selection
            let selectionAfterRemoval = selection;
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.value !== item.value
            );
            setSelection([...selectionAfterRemoval]);
        }
        setOpen(false); // on every click clos the dropdown
    }

    // run onChangeDropdown on every selected item on dropdown change
    useEffect(() => {
        if (selection.length > 0) {
            selection.forEach(item => {
                onChangeDropdown(item.value);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selection]);

    return (
        <div className="dd-wrapper">
            <div
                tabIndex={0}
                className="dd-header"
                role="button"
                onKeyPress={() => toggle(!open)}
                onClick={() => toggle(!open)}>
                <div className="dd-header__title">
                    <p className="dd-header__title--bold">{title}</p>
                </div>
            </div>
            {open && (
                <ul className="dd-list">
                    {items.map((item,index) => (
                        <li className="dd-list-item" key={index}>
                            <button type="button" onClick={() => handleOnClick(item)}>
                                <span>{item.value}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;
