import { USER_INFO, LOGIN_INFO, TENANTID } from "../mutation-types";
import { defineStore } from "pinia";

import { store } from "@/store";

export interface ISettingState {
  theme: "dark" | "light";
}
export const useSettingStore = defineStore({
  id: "app-user",
  state: (): ISettingState => ({
    theme: "light",
  }),
  getters: {},
  actions: {
    setTheme(theme: "dark" | "light") {
      this.theme = theme;
    },
  },
});

// Need to be used outside the setup
export function useSettingStoreWidthOut() {
  return useSettingStore(store);
}
