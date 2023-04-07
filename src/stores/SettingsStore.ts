import { defineStore } from "pinia";
import { CheckUserDarkMode } from "@/helpers/checkUserDarkMode";

export const useSettingsStore = defineStore("SettingsStore", {
  state: () => {
    return {
      darkMode: true,
      useSystemLightMode: false,
    };
  },

  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      // if they want dark mode, stop listening to user's scheme
      if (this.darkMode) {
        document.body.classList.add("dark");
        // CheckUserDarkMode(false);
      } else {
        document.body.classList.remove("dark");
      }
    },
    toggleUseSystemLightMode() {
      this.useSystemLightMode = !this.useSystemLightMode;

      // if they want to use system light mode check what their light preferences is and change to that
      if (this.useSystemLightMode) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
        toggleDarkTheme(prefersDark.matches);
        function toggleDarkTheme(shouldRemove: boolean) {
          document.body.classList.toggle("dark", shouldRemove);
        }
        this.darkMode = false;
        CheckUserDarkMode(true);
      } else {
        CheckUserDarkMode(false);
      }
    },
  },
});
