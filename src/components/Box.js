import React, { useEffect, useState } from 'react'
import "./Box.css"

const Box = ({ index, position, top, left, data, selected, setSelected, showCheckBox=true, maxHeight=250 }) => {
    const [checkedBox, setCheckedBox] = useState(!showCheckBox)
    const boxCheck = (e) => {
        if (e.target.checked) {
            setSelected({...selected, [index]: data})
            setCheckedBox(true)
        }
        else {
            setSelected(Object.fromEntries(Object.entries(selected).filter(([key, val]) => {
                return key != index
            })))
            setCheckedBox(false)
        }
    }
    return (
        <section className='box-container' style={{gridColumnStart: parseInt(position)+1, 
        gridColumnEnd: parseInt(position)+2}} data-index={index} data-position={position} data-data={data}>
            <span className={`box ${checkedBox ? "checked-box" : ""}`} 
            style={{
            height: data,
            "--box-height": `${data}px`,
            "--box-position": `${position}`,
            "--box-top": `${top}`,
            "--box-left": `${left}`
            // "--max-box-height": `${maxHeight}px`
            }}>
            {data}
            {showCheckBox && <input type="checkbox"
            className="checkbox"
            onInput={boxCheck} />}</span>
            {!showCheckBox &&
            <span className={`box ${checkedBox ? "checked-box" : ""} static`} data-index={index} data-position={position} data-data={data}
            style={{gridColumnStart: position+1, 
            gridColumnEnd: position+2,
            height: maxHeight + 4,
            "--box-height": `${data}px`,
            "--box-position": `${position}`,
            "--box-top": `${top}`,
            "--box-left": `${left}`
            // "--max-box-height": `${maxHeight}px`
            }}>
            </span>}
        </section>
    )
}

export default Box