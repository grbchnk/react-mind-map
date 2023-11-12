import React, { useState } from "react"
import styles from "./CreateNodeForm.module.css"
import { useDispatch } from "react-redux"
import { addNode } from "../../redux/nodeSlice"
import { Tooltip } from "react-tooltip"

const CreateNodeForm = (props) => {
  const [node, setNode] = useState({
    id: new Date().toISOString(),
    title: "",
    content: "",
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    color: "#F25E95",
  })

  const [validInput, setValidInput] = useState({
    title: false,
    content: false,
    color: false,
  })

  const [isOpenTooltip, setIsOpenTooltip] = useState({
    title: false,
    content: false,
    color: false,
  })

  const dispatch = useDispatch()

  const colors = [
    "#F25E95",
    "#F27935",
    "#499F8E",
    "#5959F2",
    "#5F8F2F",
    "#F2A03D",
    "#BF1515",
    "#F2D03D",
    "#800080",
    "#000000",
  ]

  const handleChange = (e) => {
    const { value, name } = e.target

    setValidInput({ ...validInput, [name]: !!value.trim() })

    setNode((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validInput.title && validInput.content && validInput.color) {
      dispatch(addNode(node))
      props.onClose()
    }

    setIsOpenTooltip({
      title: !validInput.title,
      content: !validInput.content,
      color: !validInput.color,
    })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    props.onClose()
  }

  return (
    <div className={styles.createNodeForm} onClick={props.onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className={styles.createNodeForm__form}
      >
        <label className={styles.createNodeForm__label}>
          Заголовок:
          <input
            type="text"
            name="title"
            onChange={handleChange}
            className={styles.createNodeForm__input}
            data-tooltip-id="tooltip-title"
            data-tooltip-content="Введите заголовок"
          />
          <Tooltip
            id="tooltip-title"
            place="right"
            isOpen={isOpenTooltip.title && !validInput.title}
          />
        </label>
        <label className={styles.createNodeForm__label}>
          Содержание:
          <textarea
            name="content"
            onChange={handleChange}
            className={styles.createNodeForm__textarea}
            data-tooltip-id="tooltip-content"
            data-tooltip-content="Это поле не может быть пустым"
          />
          <Tooltip
            id="tooltip-content"
            place="right"
            isOpen={isOpenTooltip.content && !validInput.content}
          />
        </label>
        Цвет:
        <label
          className={styles.createNodeForm__label}
          data-tooltip-id="tooltip-color"
          data-tooltip-content="Выберите цвет"
        >
          {colors.map((color, index) => (
            <label key={index} className={styles.createNodeForm__colorOption}>
              <input
                id={`radio-${color.substring(1)}`}
                type="radio"
                name="color"
                value={color}
                onChange={handleChange}
                className={styles.createNodeForm__colorInput}
                style={{ backgroundColor: color }}
              />
            </label>
          ))}
          <Tooltip
            id="tooltip-color"
            place="left"
            isOpen={isOpenTooltip.color && !validInput.color}
          />
        </label>
        <div className={styles["createNodeForm__buttons-inner"]}>
          <button type="submit" className={styles.createNodeForm__button}>
            Создать
          </button>
          <button
            onClick={handleCancel}
            className={styles.createNodeForm__button}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateNodeForm
