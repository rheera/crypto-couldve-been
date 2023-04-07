import { defineStore } from "pinia";
import { CheckUserDarkMode } from "@/helpers/checkUserDarkMode";

export const useSettingsStore = defineStore("SettingsStore", {
  state: () => {
    return {
      darkMode: false,
      useSystemLightMode: false,
    };
  },

  actions: {
    toggleDarkMode() {
      this.darkMode
        ? document.body.classList.remove("dark")
        : document.body.classList.add("dark");
      this.darkMode = !this.darkMode;
    },
    toggleUseSystemLightMode() {
      // if they want to use system light mode check what their light preferences is and change to that
      if (!this.useSystemLightMode) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
        toggleDarkTheme(prefersDark.matches);
        function toggleDarkTheme(shouldRemove: boolean) {
          document.body.classList.toggle("dark", shouldRemove);
        }
        this.darkMode = false;
      } else {
        CheckUserDarkMode(false);
      }
      this.useSystemLightMode = !this.useSystemLightMode;
    },
  },
});
