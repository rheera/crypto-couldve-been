<template>
  <div>
    <ion-item>
      <ion-toggle
        @ion-change="settingsStore.toggleDarkMode(!settingsStore.darkMode)"
        :checked="settingsStore.darkMode"
        :disabled="settingsStore.useSystemLightMode"
        >Dark Mode</ion-toggle
      >
    </ion-item>
    <ion-item>
      <ion-toggle
        @ion-change="
          settingsStore.toggleUseSystemLightMode(
            !settingsStore.useSystemLightMode
          )
        "
        :checked="settingsStore.useSystemLightMode"
        >Use System Light/Dark Mode</ion-toggle
      >
    </ion-item>
  </div>
</template>

<script setup lang="ts">
import { IonItem, IonToggle } from "@ionic/vue";
import { ref } from "vue";
import { useSettingsStore } from "@/stores/SettingsStore";
import { Preferences } from "@capacitor/preferences";

const settingsStore = useSettingsStore();
const setDarkMode = async () => {
  await Preferences.set({
    key: "darkMode",
    value: String(!settingsStore.darkMode),
  });
};

const checkDarkMode = async () => {
  const { value } = await Preferences.get({ key: "darkMode" });

  console.log(`Hello ${value}!`);
};
</script>

<style scoped></style>
