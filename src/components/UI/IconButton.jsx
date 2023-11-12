import React, { useState } from "react"

const IconButton = (props) => {
  const [hovered, setHovered] = useState(false)

  const Icon = hovered ? props.hoverIcon : props.icon

  return (
    <Icon
      onClick={props.onClick}
      className={props.className}
      size={props.size}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  )
}

export default IconButton
