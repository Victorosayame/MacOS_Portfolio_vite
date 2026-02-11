import { Dock, Navbar, Terminal, Welcome } from "#components";
//step17
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";


gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />


      <Terminal />
    </main>
  )
}

export default App