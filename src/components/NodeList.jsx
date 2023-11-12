import { useSelector } from "react-redux"
import Node from "./node/Node"

function NodeList() {
  const nodes = useSelector((state) => state.nodes.nodes)
  return (
    <div>
      {nodes.map((node) => {
        return (
          <Node
            key={node.id}
            id={node.id}
            title={node.title}
            color={node.color}
          >
            {node.content}
          </Node>
        )
      })}
    </div>
  )
}

export default NodeList
