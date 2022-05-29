import React, { useState, useEffect, useRef } from 'react'
import Box from './Box.js'
import './Compare.css'

const Compare = ({ selected, setComparing }) => {
  const [selObj, setSelObj] = useState({})
  const [position, setPosition] = useState("static")
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  var mouseDownPos = null
  const compareRef = useRef()
  var obj = {}
  const handleMouseDown = (event) => {
    console.log(event.target)
    console.log(event.target.parentElement.children[0].getBoundingClientRect())
    if (event.target.classList.contains("checked-box")) {
      mouseDownPos = event.target.parentElement.children[0]
      console.log(mouseDownPos)
      // console.log(mouseDownPos.dataset.position, mouseDownPos.dataset.index)
      // setSelObj({...selObj, [event.target.dataset.index]: {...selObj[event.target.dataset.index], position: "fixed"},
      // })
      mouseDownPos.style.position = "fixed"
      mouseDownPos.style.zIndex = 2
      mouseDownPos.style.top = event.clientY - mouseDownPos.getBoundingClientRect().height/2 + "px";
      // setTop(event.clientY - mouseDownPos.getBoundingClientRect().height/2 + "px");
      mouseDownPos.style.left = event.clientX - mouseDownPos.getBoundingClientRect().width/2 + "px";
      // setLeft(event.clientX - mouseDownPos.getBoundingClientRect().width/2 + "px")
    }
    window.addEventListener("mousemove", handleDrag)
  }
  const handleDrag = (event) => {
    mouseDownPos.style.top = event.clientY - mouseDownPos.getBoundingClientRect().height/2 + "px"
    mouseDownPos.style.left = event.clientX - mouseDownPos.getBoundingClientRect().width/2 + "px";
  }
  const handleMouseUp = (event) => {
    console.log(event.target)
    mouseDownPos.style.position = "revert";

    // setSelObj({...selObj, [event.target.dataset.index]: {...selObj[event.target.dataset.index], position: "revert"},
  // })
    console.log(event.target.dataset.position, event.target.dataset.index, event.target.className)
    if (event.target.classList.contains("checked-box") && mouseDownPos) {
      var newGCS = event.target.parentElement.style.gridColumn.split(' / ')[0]
      var initGCS = mouseDownPos.parentElement.style.gridColumn.split(' / ')[0]
      console.log(initGCS + " hey", newGCS, " hey")
      // event.target.style.gridColumnStart = parseInt(mouseDownPos.parentElement.style.gridColumn.split(' / ')[0])
      // event.target.style.gridColumnEnd = parseInt(mouseDownPos.parentElement.style.gridColumn.split(' / ')[0]) + 1

      // mouseDownPos.parentElement.style.gridColumnStart = parseInt(initGCS)
      // mouseDownPos.parentElement.style.gridColumnEnd = parseInt(initGCS) + 1

      setSelObj({...selObj, [event.target.parentElement.dataset.index]: {...selObj[event.target.parentElement.dataset.index], position: parseInt(initGCS)-1}, 
          [mouseDownPos.parentElement.dataset.index]: {...selObj[mouseDownPos.parentElement.dataset.index], position: parseInt(newGCS)-1}})        
      // console.log(event.target)
      // console.log(event.target.getBoundingClientRect().x)
      // // event.target.parentElement.children[0].style.left = 0
      // event.target.parentElement.children[0].style.position = "fixed"
      // event.target.parentElement.children[0].style.left = mouseDownPos.parentElement.children[1].getBoundingClientRect().x - 4 + "px"
      // // event.target.parentElement.children[0].style.position 
      // console.log(event.target.parentElement.children[0].getBoundingClientRect().x)
      // mouseDownPos.style.left = 0
      // mouseDownPos.style.left = event.target.getBoundingClientRect().x + "px"
      // console.log(mouseDownPos.getBoundingClientRect().x)
      mouseDownPos.style.zIndex = 1
      // console.log(mouseDownPos.dataset.position, mouseDownPos.dataset.index)
      // setSelObj({...selObj, [event.target.dataset.index]: {...selObj[event.target.dataset.index], position: mouseDownPos.dataset.position}, 
      //   [mouseDownPos.dataset.index]: {...selObj[mouseDownPos.dataset.index], position: event.target.dataset.position}
      // // })
      // setSelObj({...selObj, [event.target.parentElement.children[0].dataset.index]: {...selObj[event.target.parentElement.children[0].dataset.index], data: mouseDownPos.dataset.data},
      //   [mouseDownPos.dataset.index]: {...selObj[mouseDownPos.dataset.index], data: event.target.parentElement.children[0].dataset.data},
      // })
    }
    // else {
    //     mouseDownPos.style.position = "revert";
    //   }
    window.removeEventListener("mousemove", handleDrag)
  }
  useEffect(()=> {
    for (var i=0; i < Object.keys(selected).length; i++) {
      console.log(i)
      obj[i] = {position: i, data: selected[Object.keys(selected)[i]]}
    }
    setSelObj(obj)
  }, [])
  useEffect(() => {
    console.log(compareRef.current.children[2])
  }, [compareRef])
  
  
  const [closeCompare, setCloseCompare] = useState(false)
  return (
    <section className={`overlay ${closeCompare ? 'close' : '' }`} onMouseUp={handleMouseUp}>
        <section className='compare-window' dragger="dragger" ref={compareRef} 
        style={{"--selected-length": `${Object.keys(selected).length}`}}
        onMouseDown={handleMouseDown} >
         {/* onMouseMove={handleDrag}> */}
            {Object.keys(selObj).map((i) => {
                return <Box index={i} position={selObj[i]["position"]} top={top} left={left} data={selObj[i]["data"]} selected={selected} 
                showCheckBox={false} maxHeight={Math.max(...Object.values(selected))} />
            })}
            <button className="close-compare" onClick={() => {
              setCloseCompare(true);
              setTimeout(()=>{setComparing(false)}, 400)
              }}><p>+</p></button>
        </section>
    </section>
  )
}

export default Compare