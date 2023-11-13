import Canvas from "./components/Canvas"
import NodeList from "./components/NodeList"
import ControlBar from "./components/UI/ControlBar"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Hello World</h2>
      </header>
      <NodeList />
      <ControlBar />
      {console.log("Создался App")}
      <Canvas />
    </div>
  )
}

export default App
