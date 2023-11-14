import { useSelector } from "react-redux"
import ThreadsDraw from "../helpers/ThreadsDraw"

const Canvas = () => {
  const threadsDraw = ThreadsDraw.getInstance()
  const threads = useSelector((state) => state.threads.threads)
  const isDrawingTimerRunning = useSelector(
    (state) => state.threads.isDrawingTimerRunning
  )

  if (isDrawingTimerRunning) {
    threadsDraw.start(threads)
  } else {
    threadsDraw.stop(threads)
  }

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
