import { createSlice } from "@reduxjs/toolkit"

const threadSlice = createSlice({
  name: "thread",
  initialState: {
    threads: [],
    isDrawingTimerRunning: false,
  },
  reducers: {
    addThread(state, action) {
      const { threads } = state
      const lastThread = threads[threads.length - 1]

      if (!threads.length || lastThread.end) {
        threads.push({ start: action.payload, end: null })
      } else if (lastThread.start !== action.payload) {
        lastThread.end = action.payload
      } else if (lastThread.start === action.payload) {
        state.threads.pop()
      }
    },
    removeLastThread(state) {
      state.threads.pop()
      console.log("удалилось")
    },
    startDrawingTimer(state) {
      state.isDrawingTimerRunning = true
      console.log("Таймер в true из слайсера")
    },
    stopDrawingTimer(state) {
      state.isDrawingTimerRunning = false
      console.log("Таймер в false из слайсера")
    },
  },
})

export const {
  addThread,
  removeLastThread,
  startDrawingTimer,
  stopDrawingTimer,
} = threadSlice.actions

export default threadSlice.reducer
