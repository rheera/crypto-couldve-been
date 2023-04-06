<template>
  <div>
    <ion-item>
      <ion-toggle @ion-change="toggleTheme()" :checked="settingsStore.darkMode"
        >Dark Mode</ion-toggle
      >
    </ion-item>
  </div>
</template>

<script setup lang="ts">
import { IonItem, IonToggle } from "@ionic/vue";
import { ref } from "vue";
import { useSettingsStore } from "@/stores/SettingsStore";
const settingsStore = useSettingsStore();

function toggleTheme() {
  settingsStore.darkMode
    ? document.body.classList.remove("dark")
    : document.body.classList.add("dark");
  settingsStore.darkMode = !settingsStore.darkMode;
}
</script>

<style scoped></style>
