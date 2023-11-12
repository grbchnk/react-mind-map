import { createSlice } from "@reduxjs/toolkit"

const threadSlice = createSlice({
  name: "thread",
  initialState: {
    threads: [],
  },
  reducers: {
    addThread(state, action) {
      const { threads } = state
      const lastThread = threads[threads.length - 1]

      if (!threads.length || lastThread.end) {
        threads.push({ start: action.payload, end: null })
      } else if (lastThread.start !== action.payload) {
        lastThread.end = action.payload
      }
    },
    removeThread(state, action) {},
  },
})

export const { addThread, removeThread } = threadSlice.actions

export default threadSlice.reducer
