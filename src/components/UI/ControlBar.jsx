import ReactDOM from "react-dom"
import styles from "./ControlBar.module.css"
import { useState } from "react"
import {
  BsPlusCircleFill,
  BsPlusCircle,
  BsMoonStarsFill,
  BsMoonStars,
  BsInfoCircle,
  BsInfoCircleFill,
} from "react-icons/bs"
import IconButton from "./IconButton"
import CreateNodeForm from "./CreateNodeForm"
import { motion } from "framer-motion"

const portal = document.getElementById("portal-modal")

const ControlBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={styles["control-bar"]}>
      <IconButton
        className="icon-button"
        icon={BsInfoCircle}
        hoverIcon={BsInfoCircleFill}
      />
      <motion.div whileHover={{ scale: 1.2 }}>
        <IconButton
          className="icon-button"
          icon={BsPlusCircle}
          hoverIcon={BsPlusCircleFill}
          onClick={openModal}
        />
      </motion.div>

      <IconButton
        className="icon-button"
        icon={BsMoonStars}
        hoverIcon={BsMoonStarsFill}
      />

      {isModalOpen &&
        ReactDOM.createPortal(<CreateNodeForm onClose={closeModal} />, portal)}
    </div>
  )
}

export default ControlBar
