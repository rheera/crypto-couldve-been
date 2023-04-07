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
  const print = (value: string) => {
    console.log("here ", value);
  };
  checkName("darkMode", print);
  // checkUserDarkMode.addDarkModeListener();
});
</script>
