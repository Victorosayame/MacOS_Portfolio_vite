/**
 * STEP 10: Create Dock Component - Application Launcher
 * ========================================================
 * The Dock is the primary navigation element inspired by macOS dock functionality.
 * Responsibilities:
 * - Display application/window icons in a horizontal bar
 * - Provide quick access to all portfolio sections
 * - Show active state for open windows
 * - Handle application open/close toggle logic
 * - Render tooltips with app names on hover
 *
 * Features:
 * - Interactive icon scaling animation based on mouse proximity
 * - Real-time window state management via Zustand store
 * - Disabled state for non-interactive apps
 * - Accessibility support with aria-labels
 */

import { dockApps } from "#constants";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
// STEP 12: Implement Tooltips for Dock Icons via react-tooltip
// Enhances UX by showing app names on hover - helpful for users unfamiliar with icons
import { Tooltip } from "react-tooltip";

const Dock = () => {
  // STEP 11: Create Reference for Dock Container
  // Used to target the dock element for GSAP animations and event listeners
  const dockRef = useRef(null);
  // STEP 15: Access Window Management Store
  // Get openWindow, closeWindow functions and current windows state to control app lifecycle
  const { openWindow, closeWindow, windows } = useWindowStore();

  const toggleApp = (app) => {
    // STEP 15 (continued): Toggle Window Open/Close State
    // Check if window exists, then open or close accordingly
    if (!app.canOpen) return () => {};
    const window = windows[app.id];

    if (!window) {
      console.error(`Window not found for app: ${app.id}`);
      return;
    }

    if (window.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }

    console.log(windows);
  };

  /**
   * STEP 13: Animate Dock Icons on Mouse Proximity
   * ================================================
   * Creates a dynamic "magnetic" effect for dock icons:
   * - Icons scale up and shift upward as mouse approaches
   * - Effect intensity decreases with distance using exponential formula
   * - Icons smoothly return to normal state on mouse leave
   * - Uses GSAP for smooth, performant animations
   *
   * This magnetic effect mimics macOS dock behavior and improves interactivity
   */
  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return () => {};

    const icons = dock.querySelectorAll(".dock-icon");

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
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();

      animateIcons(e.clientX - left);
    };

    const resetIcons = () =>
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        }),
      );

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
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
              onClick={() => toggleApp({ id, canOpen })}
            >
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
  );
};

export default Dock;
