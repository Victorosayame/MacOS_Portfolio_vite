//step16hoc
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { useLayoutEffect, useRef } from "react";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    //ste19 implement focus on click
    useGSAP(() => {
      const currentElement = ref.current;
      if(!currentElement || !isOpen) return () => {};

      currentElement.style.display = "block";

      gsap.fromTo(currentElement, {
        scale: 0.8,
        opacity: 0,
        y: 40,
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      })
    }, [isOpen])

    //step20 implement drag windows
    useGSAP(() => {
      const currentElement = ref.current;
      if(!currentElement) return;


      const [instance] = Draggable.create(currentElement, {  onPress: () => focusWindow(windowKey) })

      return () => instance.kill();
    }, [])

    //step19
    useLayoutEffect(() => {
      const currentElement = ref.current;
      if(!currentElement) return;

      currentElement.style.display = isOpen ? "block" : "none"
    }, [isOpen])

    return (
        <section 
           id={windowKey} 
           ref={ref} 
           style={{ zIndex }}
           className="absolute"
           >
            <Component {...props} />
        </section>
    )
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
  return <div>WindowWrapper</div>;
};

export default WindowWrapper;
