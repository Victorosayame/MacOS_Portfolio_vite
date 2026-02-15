/**
 * STEP 16: WindowWrapper HOC (Higher-Order Component)
 * ======================================================
 * A Higher-Order Component that wraps window components to provide:
 * 1. Window state management (open/close, z-index, data)
 * 2. Focus mechanism (brings window to front on click)
 * 3. Drag functionality (allows moving windows around screen)
 * 4. Animation effects (smooth open/close transitions)
 * 5. Layout management with proper z-index based on focus
 *
 * How it works:
 * - Wraps any component and returns a window-enhanced version
 * - Takes windowKey parameter to identify which window in state
 * - Applies GSAP animations for smooth entrance/exit effects
 * - Sets up GSAP Draggable for drag-to-move functionality
 * - Integrates with Zustand store for global state
 */
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

    /**
     * STEP 19: Implement Window Open Animation with Focus
     * =====================================================
     * When a window opens or gains focus:
     * - Initial state: scaled down (0.8) and transparent (opacity 0)
     * - Animated to: full size (1.0) and visible (opacity 1)
     * - Vertical movement: appears to "pop" up from below (y: 40 → 0)
     * - Animation settings: 0.4s duration with power3.out easing (smooth deceleration)
     * - Only runs if window is actually open (isOpen = true)
     * - GSAP context automatically managed by useGSAP hook
     */
    useGSAP(() => {
      const currentElement = ref.current;
      if (!currentElement || !isOpen) return () => {};

      currentElement.style.display = "block";

      gsap.fromTo(
        currentElement,
        {
          scale: 0.8,
          opacity: 0,
          y: 40,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        },
      );
    }, [isOpen]);

    /**
     * STEP 20: Implement Draggable Window Functionality
     * ==================================================
     * Enables users to drag windows by their headers across the screen:
     * - Uses GSAP Draggable plugin for performant dragging
     * - Auto-calculates boundary constraints based on element position
     * - On mouse press during drag: brings window to focus (highest z-index)
     * - Window automatically becomes topmost when user starts dragging
     * - Returns cleanup function that destroys Draggable instance on unmount
     *
     * User Experience:
     * - Smooth drag with no lag
     * - Windows jump to front when clicked, confirming focus
     * - All windows can be arranged/organized by user
     */
    useGSAP(() => {
      const currentElement = ref.current;
      if (!currentElement) return;

      const [instance] = Draggable.create(currentElement, {
        onPress: () => focusWindow(windowKey),
      });

      return () => instance.kill();
    }, []);

    // STEP 19 (continued): Handle Window Visibility State
    // Updates DOM display property based on isOpen state for proper layering
    useLayoutEffect(() => {
      const currentElement = ref.current;
      if (!currentElement) return;

      currentElement.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
  return <div>WindowWrapper</div>;
};

export default WindowWrapper;
