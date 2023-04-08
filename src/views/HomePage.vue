<template>
  <base-layout page-title="All Memories">
    <template v-slot:actions-end>
      <ion-button router-link="/settings">
        <ion-icon slot="icon-only" :icon="settingsOutline"></ion-icon>
      </ion-button>
    </template>
    <base-return-form
      @save-memory="
        {
        }
      "
    ></base-return-form>
  </base-layout>
</template>

<script setup lang="ts">
import BaseReturnForm from "@/components/returnCalculator/BaseReturnForm.vue";
import { IonButton, IonIcon } from "@ionic/vue";
import { settingsOutline } from "ionicons/icons";
</script>

<style scoped></style>
