//step10 create a Dock component that will serve as the dock for the macOS portfolio website. This component will be responsible for displaying application icons and providing quick access to various sections of the portfolio, similar to the dock functionality found in macOS.

import { dockApps } from "#constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {  useRef } from "react";
//step12 implement tooltips for the dock icons using the react-tooltip library. This will enhance the user experience by providing additional information about each application when users hover over the icons in the dock, making it easier for visitors to navigate and understand the purpose of each icon.
import { Tooltip } from "react-tooltip";

const Dock = () => {
  //step11 define a new ref hook
  const dockRef = useRef(null);

  const toogleApp = (app) => {}

  //step13 use the useGSAP hook to create an animation effect for the dock icons when they are clicked. This will add a dynamic and interactive element to the dock, making it more engaging for users as they interact with the application icons.
  useGSAP(() => {
    const dock = dockRef.current;
    if(!dock) return () => {};

    const icons =dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2.5) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        })
      })
    }

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();

      animateIcons(e.clientX - left);
    };

    const resetIcons = () => icons.forEach((icon) => gsap.to(icon, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power1.out",
    }))

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    }
  }, []);

  
  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button 
            type="button" 
            className="dock-icon" 
            aria-label={name} 
            data-tooltip-id="dock-tooltip" 
            data-tooltip-content={name} 
            data-tooltip-delay-show={150} 
            disabled={!canOpen} 
            onClick={() => toogleApp({ id, canOpen })}>
              <img 
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}

        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  )
}

export default Dock