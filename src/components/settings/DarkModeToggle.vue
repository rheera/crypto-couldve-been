<template>
  <div>
    <ion-item>
      <ion-toggle @ion-change="toggleTheme()" :checked="darkMode"
        >Dark Mode</ion-toggle
      >
    </ion-item>
  </div>
</template>

<script setup lang="ts">
import { IonItem, IonToggle } from "@ionic/vue";
import { ref } from "vue";

const darkMode = ref(false);

function toggleTheme() {
  darkMode.value
    ? document.body.classList.remove("dark")
    : document.body.classList.add("dark");
  darkMode.value = !darkMode.value;
}
</script>

<style scoped></style>
