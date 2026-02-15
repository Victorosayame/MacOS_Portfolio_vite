import {
  Contact,
  Dock,
  Finder,
  Home,
  Image,
  Navbar,
  Photo,
  Resume,
  Safari,
  Terminal,
  Text,
  Welcome,
} from "#components";
/**
 * STEP 17: Register GSAP Plugins in Root Component
 * ===================================================
 * This is the recommended place to register GSAP plugins globally.
 * The Draggable plugin is required for window drag functionality implemented
 * in the WindowWrapper HOC. By registering it here in the root component,
 * it becomes available to all child components that use GSAP animations.
 */
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
  );
};

export default App;
