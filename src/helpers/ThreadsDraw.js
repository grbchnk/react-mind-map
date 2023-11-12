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
    this.prevThreads = null
  }

  draw(threads) {
    let ctx = this.canvas.getContext("2d")

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (let thread of threads) {
      let start = document.getElementById(thread.start).getBoundingClientRect()
      let end = thread.end
        ? document.getElementById(thread.end).getBoundingClientRect()
        : this.mouse

      ctx.strokeStyle = "black"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      ctx.lineTo(end.x, end.y)
      ctx.stroke()
    }
  }

  start(threads) {
    if (threads.length > 0 && threads !== this.prevThreads) {
      this.prevThreads = threads
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.interval = setInterval(() => {
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
