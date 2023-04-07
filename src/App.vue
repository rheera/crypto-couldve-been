<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { onMounted } from "vue";
import { Preferences } from "@capacitor/preferences";
import { CheckUserDarkMode } from "./helpers/checkUserDarkMode";
import { useSettingsStore } from "@/stores/SettingsStore";

const settingsStore = useSettingsStore();
onMounted(() => {
  // CheckUserDarkMode(true);
});
</script>
