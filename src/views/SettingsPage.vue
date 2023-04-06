<template>
  <base-layout page-title="Settings" page-default-back-link="/">
    <ion-list> <dark-mode-toggle></dark-mode-toggle> </ion-list>
  </base-layout>
</template>

<script setup lang="ts">
import { IonList } from "@ionic/vue";
import DarkModeToggle from "@/components/settings/DarkModeToggle.vue";
</script>
<style scoped></style>
