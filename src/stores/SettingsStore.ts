import { defineStore } from "pinia";
import { checkUserDarkMode } from "@/helpers/checkUserDarkMode";
import { setName } from "@/helpers/persistDarkMode";

export const useSettingsStore = defineStore("SettingsStore", {
  state: () => {
    return {
      darkMode: false,
      useSystemLightMode: true,
    };
  },

  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      // if they want dark mode, stop listening to user's scheme
      if (this.darkMode) {
        setName("darkMode", "true");
        document.body.classList.add("dark");
        // CheckUserDarkMode(false);
      } else {
        setName("darkMode", "false");
        document.body.classList.remove("dark");
      }
    },
    toggleUseSystemLightMode() {
      this.useSystemLightMode = !this.useSystemLightMode;

      // if they want to use system light mode check what their light preferences is and change to that
      if (this.useSystemLightMode) {
        setName("darkMode", "false");
        setName("useSystemLightMode", "true");

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
        toggleDarkTheme(prefersDark.matches);
        function toggleDarkTheme(shouldRemove: boolean) {
          document.body.classList.toggle("dark", shouldRemove);
        }
        this.darkMode = false;
        checkUserDarkMode.addDarkModeListener();
      } else {
        setName("useSystemLightMode", "false");
        checkUserDarkMode.removeDarkModeListener();
      }
    },
  },
});
