//step14 install zustand and create window store, this will manage the state of all windows in the app, including their open/close status, z-index for layering, and any associated data. We use the Immer middleware to allow for easy state updates without mutating the state directly.
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";

const useWindowStore = create(immer((set) => ({
  windows: WINDOW_CONFIG,
  nextZIndex: INITIAL_Z_INDEX + 1,

  openWindow: (windowKey, data = null) => set((state) => {
    const existingWindow = state.windows[windowKey];
    if(!existingWindow) return;
    existingWindow.isOpen = true;
    existingWindow.zIndex = state.nextZIndex;
    existingWindow.data = data ?? existingWindow.data;
    state.nextZIndex++;
  }),
  closeWindow: (windowKey) => set((state) => {
    const existingWindow = state.windows[windowKey];
    //if the windowKey is invalid, do nothing
    if(!existingWindow) return;
    existingWindow.isOpen = false;
    existingWindow.zIndex = INITIAL_Z_INDEX;
    existingWindow.data = null;
  }),
  focusWindow: (windowKey) => set((state) => {
    const existingWindow = state.windows[windowKey];
    existingWindow.zIndex = state.nextZIndex++;
  })
})))

export default useWindowStore;