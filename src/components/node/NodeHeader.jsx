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
import { addThread } from "../../redux/threadSlice"

const NodeHeader = (props) => {
  const dispatch = useDispatch()

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
          icon={BsNodePlus}
          hoverIcon={BsNodePlusFill}
          size={30}
          onClick={() => {
            dispatch(addThread("node_" + props.id))
          }}
        />
      </div>
    </div>
  )
}

export default NodeHeader
