import { useSelector } from "react-redux"
import ThreadsDraw from "../helpers/ThreadsDraw"

const Canvas = () => {
  const threads = useSelector((state) => state.threads.threads)
  const threadsDraw = ThreadsDraw.getInstance()
  threadsDraw.start(threads)

  return (
    <div>
      {threads.map((thread) => {
        return (
          <div key={Math.random()}>
            <code>
              start: {thread.start}, end: {thread.end}
            </code>
          </div>
        )
      })}
    </div>
  )
}

export default Canvas
