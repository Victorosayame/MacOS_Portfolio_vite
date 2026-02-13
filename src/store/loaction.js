//step26 create window store, this will manage the state of folder structure and location, including their open/close status, z-index for layering, and any associated data. We use the Immer middleware to allow for easy state updates without mutating the state directly.

import { locations } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const DEFAULT_LOCATION = locations.work;

//create useLoaction Store
const useLocationStore = create(immer((set) => ({
  activeLocation: DEFAULT_LOCATION,

  setActiveLocation: (location) => set((state) => {
    if(location === undefined) return
    state.activeLocation = location;
  }),

  resetActiveLocation: () => set((state) => {
    state.activeLocation = DEFAULT_LOCATION;
  })
})));

export default useLocationStore;