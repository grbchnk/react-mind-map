import { configureStore } from "@reduxjs/toolkit"
import nodeReducer from "./nodeSlice"
import threadReducer from "./threadSlice"

export default configureStore({
  reducer: {
    nodes: nodeReducer,
    threads: threadReducer,
  },
})
