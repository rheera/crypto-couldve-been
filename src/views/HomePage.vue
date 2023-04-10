<template>
  <base-layout page-title="Profit Calculator">
    <template v-slot:actions-end>
      <ion-button router-link="/settings">
        <ion-icon slot="icon-only" :icon="settingsOutline"></ion-icon>
      </ion-button>
    </template>

    <ion-segment
      @ion-change="whichCalculator = $event.detail.value"
      value="heart"
    >
      <ion-segment-button value="crypto">
        <ion-icon :icon="heart"></ion-icon>
      </ion-segment-button>
      <ion-segment-button value="stocks">
        <ion-icon :icon="home"></ion-icon>
      </ion-segment-button>
    </ion-segment>
    <base-return-form :investments-list="baseCoins"></base-return-form>
  </base-layout>
</template>

<script setup lang="ts">
import BaseReturnForm from "@/components/returnCalculator/BaseReturnForm.vue";
import { IonButton, IonIcon, IonSegment, IonSegmentButton } from "@ionic/vue";
import { settingsOutline, home, heart } from "ionicons/icons";
import baseCoins from "@/data/baseCoins.json";
import { ref } from "vue";
import BaseIcon from "@/components/base/BaseIcon.vue";
import IconBitcoin from "@/components/icons/IconBitcoin.vue";

const whichCalculator = ref("crypto");
</script>

<style scoped></style>
