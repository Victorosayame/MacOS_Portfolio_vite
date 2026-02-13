import { Contact, Dock, Finder, Home, Image, Navbar, Photo, Resume, Safari, Terminal, Text, Welcome } from "#components";
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
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photo />
      <Home />
    </main>
  )
}

export default App