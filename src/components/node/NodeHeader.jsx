import styles from "./Node.module.css"
import IconButton from "../UI/IconButton"
import { BsNodePlus, BsNodePlusFill } from "react-icons/bs"
import {
  RiFolderUploadLine,
  RiFolderUploadFill,
  RiFolderDownloadLine,
  RiFolderDownloadFill,
} from "react-icons/ri"
import { useDispatch } from "react-redux"
import { addThread, removeLastThread } from "../../redux/threadSlice"
import { startDrawingTimer, stopDrawingTimer } from "../../redux/threadSlice"

const NodeHeader = (props) => {
  const dispatch = useDispatch()

  const handleMouseDown = () => {
    dispatch(startDrawingTimer())
    dispatch(addThread("node_" + props.id))
    document.addEventListener("mouseup", handleDocumentMouseUp)
  }

  const handleDocumentMouseUp = (e) => {
    var element = e.target
    let found = false

    while (element) {
      if (element.id.startsWith("node_")) {
        found = true
        dispatch(addThread(element.id))
        break
      }
      element = element.parentElement
    }

    if (!found) {
      dispatch(removeLastThread())
    }

    document.removeEventListener("mouseup", handleDocumentMouseUp)
    dispatch(stopDrawingTimer())
  }

  return (
    <div
      className={styles["node__header"]}
      style={{
        backgroundColor: props.color,
      }}
      onMouseDown={props.startDrag}
      onDoubleClick={props.handleClickVisible}
    >
      <p className={styles["node__header__title"]}>{props.title}</p>
      <div className={styles["node__header__buttons"]}>
        <IconButton
          className={styles["node__header__icon-button"]}
          onClick={props.handleClickVisible}
          icon={
            props.contentVisible ? RiFolderUploadLine : RiFolderDownloadLine
          }
          hoverIcon={
            props.contentVisible ? RiFolderUploadFill : RiFolderDownloadFill
          }
        />
        <IconButton
          onMouseDown={(event) => {
            event.stopPropagation()
            handleMouseDown()
          }}
          icon={BsNodePlus}
          hoverIcon={BsNodePlusFill}
          size={30}
        />
      </div>
    </div>
  )
}

export default NodeHeader
