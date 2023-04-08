<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { onMounted } from "vue";
import { checkUserDarkMode } from "./helpers/checkUserDarkMode";
import { useSettingsStore } from "@/stores/SettingsStore";
import { checkName } from "@/helpers/persistDarkMode";

const settingsStore = useSettingsStore();
onMounted(() => {
  /**
   *
   * TODO: figure out a way to take out these functions and put them in persistDarkMode
   * They aren't going there because the store needs to instantiate before they run
   */
  const checkPersistDarkMode = (value: string) => {
    if (value === "true") {
      settingsStore.toggleUseSystemLightMode(false);
      settingsStore.toggleDarkMode(true);
    } else {
      checkName("useSystemLightMode", checkPersistUserLightMode);
    }
  };

  const checkPersistUserLightMode = (value: string) => {
    if (value === "true") {
      settingsStore.toggleUseSystemLightMode(true);
    } else {
      settingsStore.toggleDarkMode(false);
      settingsStore.toggleUseSystemLightMode(false);

      // document.body.classList.remove("dark");
    }
  };
  checkName("darkMode", checkPersistDarkMode);
  // checkUserDarkMode.addDarkModeListener();
});
</script>
