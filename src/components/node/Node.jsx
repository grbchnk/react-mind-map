import React, { useState, useEffect } from "react"
import styles from "./Node.module.css"
import { useDispatch } from "react-redux"
import { moveNode } from "../../redux/nodeSlice"
import NodeHeader from "./NodeHeader"

const Node = (props) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const dispatch = useDispatch()
  const [contentVisible, setContentVisible] = useState(true)
  const [dragging, setDragging] = useState(false)

  // console.log("Create Node id:" + props.id)

  const handleClickVisible = () => {
    setContentVisible(!contentVisible)
  }

  const moveNodeUp = () => {
    dispatch(moveNode(props.id))
  }

  const startDrag = () => {
    setDragging(true)
  }

  const stopDrag = () => {
    setDragging(false)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return
      setPosition((prevPosition) => ({
        x: prevPosition.x + e.movementX,
        y: prevPosition.y + e.movementY,
      }))
    }
    console.log("drag id " + props.id)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", stopDrag)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", stopDrag)
    }
  }, [dragging])

  return (
    <div
      className={styles["node"]}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        borderColor: props.color,
      }}
      id={`node_${props.id}`}
      onMouseEnter={moveNodeUp}
    >
      <NodeHeader
        id={props.id}
        title={props.title}
        color={props.color}
        startDrag={startDrag}
        handleClickVisible={handleClickVisible}
        contentVisible={contentVisible}
      />

      <div
        style={{ height: contentVisible ? "auto" : 0 }}
        className={styles["node__content"]}
      >
        <p>{props.children}</p>
      </div>

      <div className={styles["node__info"]}>
        <code>
          x: {position.x}, y: {position.y}
        </code>
      </div>
    </div>
  )
}

export default Node
