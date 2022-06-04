import React, { useEffect, useState} from 'react'
import "./Box.css"

const Box = ({ index, position, data, selected, setSelected, showCheckBox=true, maxHeight=250, setBoxList}) => {
    const [checkedBox, setCheckedBox] = useState(!showCheckBox)
    const boxCheck = (e) => {
        if (e.target.checked) {
            setSelected({...selected, [index]: data})
            setCheckedBox(true)
        }
        else {
            setSelected(Object.fromEntries(Object.entries(selected).filter(([key, val]) => {
                return key !== index
            })))
            setCheckedBox(false)
        }
    }

    const [spanLength, setSpanLength] = useState(false);
    useEffect(() => {
        try {
            setSpanLength(window.innerHeight - 80 >= data)
          } catch (error) {
            setSpanLength(false)
          }
    }, [ data, checkedBox])
    
    return (
        <section className='box-container' style={{gridColumnStart: (!isNaN(position) ? parseInt(position)+1 : 0), 
        gridColumnEnd: (!isNaN(position) ? parseInt(position)+2 : 0)}} data-index={index} data-position={position} data-data={data}>
            <span className={`box ${checkedBox ? "checked-box" : ""}`} 
            style={{
            height: `${data}px`,
            "--box-height": `${data}px`,
            "--box-position": `${position}`,
            "--shadow-color": `${spanLength ? "rgb(32,76,234)" : 'red'}`
            }}>
            {showCheckBox ? <input
            style={{
                width: `${data.toString().length}ch`,
            }}
             value={data} type="number" onChange={(event) => {setBoxList((prevBoxList) => {return {...prevBoxList, [index] : event.target.value}});setSelected((prevSelected) => {return (prevSelected[index] ? {...prevSelected, [index]: event.target.value} : {...prevSelected})}) }}/> : <p>{data}</p>}
            {showCheckBox && <input type="checkbox"
            className="checkbox"
            onInput={boxCheck} />}</span>
        {!showCheckBox &&
        <span className={`box ${checkedBox ? "checked-box" : ""} static`} data-index={index} data-position={position} data-data={data}
            style={{gridColumnStart: position+1, 
            gridColumnEnd: position+2,
            height: maxHeight,
            "--box-height": `${data}px`,
            "--box-position": `${position}`,
            }}>
            </span>}
        </section>
    )
}

export default Box