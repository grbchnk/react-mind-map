import { createSlice } from "@reduxjs/toolkit"

const nodeSlice = createSlice({
  name: "nodes",
  initialState: {
    nodes: [
      {
        id: 0,
        title: "Философия",
        content:
          "Познание начинается с удивления. Но не удивляйтесь, если ваш кофе вдруг начнет говорить с вами. Это просто понедельник.",
        color: "#F25E95",
      },
      {
        id: 1,
        title: "Искусство",
        content:
          "Искусство - это свобода души. Но если ваша душа решит написать автобиографию, убедитесь, что она использует хороший словарь.",
        color: "#BF1515",
      },
      {
        id: 2,
        title: "Наука",
        content:
          "Наука - это ключ к будущему. Но если вы случайно откроете дверь в прошлое, не забудьте выключить свет.",
        color: "#F2A03D",
      },
    ],
  },
  reducers: {
    addNode(state, action) {
      state.nodes.push({
        id: new Date().getTime(),
        title: action.payload.title,
        content: action.payload.content,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: action.payload.color,
      })
    },
    removeNode(state, action) {},
    moveNode(state, action) {
      const nodeId = action.payload
      if (state.nodes[state.nodes.length - 1].id !== nodeId) {
        const nodeIndex = state.nodes.findIndex((node) => node.id === nodeId)

        if (nodeIndex !== -1) {
          const [node] = state.nodes.splice(nodeIndex, 1)
          state.nodes.push(node)
        }
      }
    },
  },
})

export const { addNode, removeNode, moveNode } = nodeSlice.actions

export default nodeSlice.reducer
