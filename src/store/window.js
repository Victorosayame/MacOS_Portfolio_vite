/**
 * STEP 14: Create Global Window State Store with Zustand
 * =========================================================
 * Installation: npm install zustand
 *
 * This store manages the state of ALL windows in the application:
 * - Open/close status for each window
 * - Z-index for proper layering (which window is on top)
 * - Associated data for each window (e.g., file data for text viewer)
 * - Z-index counter to manage automatic layering on focus
 *
 * Middleware:
 * - Immer middleware: Allows "mutating" state for simpler, more intuitive updates
 * - Handles immutability automatically behind the scenes
 *
 * State Structure:
 * {
 *   windows: { [windowKey]: { isOpen, zIndex, data } },
 *   nextZIndex: number
 * }
 *
 * Actions:
 * - openWindow(windowKey, data?): Opens window and sets z-index
 * - closeWindow(windowKey): Closes window and resets to default z-index
 * - focusWindow(windowKey): Brings window to front by incrementing z-index
 */
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const existingWindow = state.windows[windowKey];
        if (!existingWindow) return;
        existingWindow.isOpen = true;
        existingWindow.zIndex = state.nextZIndex;
        existingWindow.data = data ?? existingWindow.data;
        state.nextZIndex++;
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        const existingWindow = state.windows[windowKey];
        //if the windowKey is invalid, do nothing
        if (!existingWindow) return;
        existingWindow.isOpen = false;
        existingWindow.zIndex = INITIAL_Z_INDEX;
        existingWindow.data = null;
      }),
    focusWindow: (windowKey) =>
      set((state) => {
        const existingWindow = state.windows[windowKey];
        existingWindow.zIndex = state.nextZIndex++;
      }),
  })),
);

export default useWindowStore;
