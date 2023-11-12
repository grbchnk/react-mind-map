// Класс, который подписывается на store и выводит threads в консоль
export default class Canvas {
  // Приватная переменная для хранения экземпляра класса
  static #instance = null

  constructor(store) {
    this.store = store
    this.interval = null
    // Подписываемся на изменения store
    this.unsubscribe = store.subscribe(this.handleStoreChange.bind(this))
  }

  handleStoreChange() {
    const state = this.store.getState()
    const threads = state.threads.threads

    // Если threads существует и не равна предыдущему значению
    if (threads && threads !== this.prevThreads) {
      // Сохраняем текущее значение threads
      this.prevThreads = threads
      // Останавливаем предыдущий интервал, если он был
      if (this.interval) {
        clearInterval(this.interval)
      }
      // Запускаем новый интервал, который каждые 10 мс выводит threads в консоль
      this.interval = setInterval(() => {
        console.log(threads)
      }, 10)
    }
  }

  stop() {
    this.unsubscribe()
    // Останавливаем интервал, если он был
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  static getInstance(store) {
    // Если экземпляр класса не существует
    if (!ThreadLogger.#instance) {
      // Создаем его с помощью конструктора и передаем store
      ThreadLogger.#instance = new ThreadLogger(store)
    }
    // Возвращаем экземпляр класса
    return ThreadLogger.#instance
  }
}
