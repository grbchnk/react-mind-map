export default class ThreadsDraw {
  static #instance = null

  constructor() {
    this.canvas = document.createElement("canvas")
    this.canvas.id = "canvas"
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    document.body.appendChild(this.canvas)

    this.mouse = { x: 0, y: 0 }
    document.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
    })
    this.interval = null
  }

  calculateCoordsWithMouse(rect1) {
    const dx =
      rect1.x < this.mouse.x
        ? this.mouse.x - (rect1.x + rect1.width)
        : rect1.x - this.mouse.x

    const dy =
      rect1.y < this.mouse.y
        ? this.mouse.y - (rect1.y + rect1.height)
        : rect1.y - this.mouse.y

    const startX =
      dx <= 0
        ? this.mouse.x
        : rect1.x < this.mouse.x
        ? rect1.x + rect1.width
        : rect1.x
    const startY =
      dy <= 0
        ? this.mouse.y
        : rect1.y < this.mouse.y
        ? rect1.y + rect1.height
        : rect1.y

    return [
      { x: startX, y: startY },
      { x: this.mouse.x, y: this.mouse.y },
    ]
  }

  calculateCoordsWithRect(rect1, rect2) {
    const midX1 = rect1.x + rect1.width / 2
    const midY1 = rect1.y + rect1.height / 2
    const midX2 = rect2.x + rect2.width / 2
    const midY2 = rect2.y + rect2.height / 2

    const dx = Math.max(
      0,
      Math.abs(midX1 - midX2) - (rect1.width + rect2.width) / 2
    )
    const dy = Math.max(
      0,
      Math.abs(midY1 - midY2) - (rect1.height + rect2.height) / 2
    )

    const startX =
      dx === 0 ? midX1 : midX1 < midX2 ? rect1.x + rect1.width : rect1.x
    const startY =
      dy === 0 ? midY1 : midY1 < midY2 ? rect1.y + rect1.height : rect1.y
    const endX =
      dx === 0 ? midX2 : midX1 < midX2 ? rect2.x : rect2.x + rect2.width
    const endY =
      dy === 0 ? midY2 : midY1 < midY2 ? rect2.y : rect2.y + rect2.height

    // const directionX =
    //   startX < midX1 ? "слева" : startX > midX1 ? "Справа" : "по центру"
    // const directionY =
    //   startY < midY1 ? "сверху" : startY > midY1 ? "снизу" : "по центру"

    return [
      { x: startX, y: startY },
      { x: endX || this.mouse.x, y: endY || this.mouse.y },
    ]
  }

  draw(threads) {
    let ctx = this.canvas.getContext("2d")

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (let thread of threads) {
      const rect1 = document
        .getElementById(thread.start)
        .getBoundingClientRect()
      const rect2 = document.getElementById(thread.end)?.getBoundingClientRect()

      const [start, end] = rect2
        ? this.calculateCoordsWithRect(rect1, rect2)
        : this.calculateCoordsWithMouse(rect1)

      const grad = ctx.createLinearGradient(start.x, start.y, end.x, end.y)
      grad.addColorStop(
        0,
        document.getElementById(thread.start).style.borderColor
      )
      grad.addColorStop(
        1,
        thread.end
          ? document.getElementById(thread.end).style.borderColor
          : "black"
      )

      ctx.strokeStyle = grad
      ctx.lineWidth = 3

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(start.x, start.y, 5, 0, Math.PI * 2)
      ctx.arc(end.x, end.y, 5, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      ctx.lineTo(end.x, end.y)
      ctx.stroke()
    }
  }

  stop(threads) {
    this.draw(threads)
    clearInterval(this.interval)
  }

  start(threads) {
    if (threads.length > 0) {
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.interval = setInterval(() => {
        console.log("Таймер")
        this.draw(threads)
      }, 10)
    }
  }

  static getInstance() {
    if (!ThreadsDraw.#instance) {
      ThreadsDraw.#instance = new ThreadsDraw()
    }
    return ThreadsDraw.#instance
  }
}
