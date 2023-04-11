<template>
  <base-layout page-title="Profit Calculator">
    <template v-slot:actions-end>
      <ion-button router-link="/settings">
        <ion-icon slot="icon-only" :icon="settingsOutline"></ion-icon>
      </ion-button>
    </template>
    <segment-layout
      :segment-buttons-list="segmentButtons"
      @current-segment="setCalc"
    >
    </segment-layout>

    <base-return-form
      v-if="whichCalculator === 'crypto'"
      :investments-list="baseCoins"
    ></base-return-form>
    <base-return-form v-else :investments-list="baseStocks"></base-return-form>
  </base-layout>
</template>

<script setup lang="ts">
import BaseReturnForm from "@/components/returnCalculator/BaseReturnForm.vue";
import SegmentLayout from "@/components/base/SegmentLayout.vue";
import { IonButton, IonIcon } from "@ionic/vue";
import { settingsOutline } from "ionicons/icons";
import baseCoins from "@/data/baseCoins.json";
import baseStocks from "@/data/baseStocks.json";
import segmentButtons from "@/data/segmentButtons.json";
import { ref } from "vue";

const whichCalculator = ref("crypto");

function setCalc(currentSegment: string) {
  whichCalculator.value = currentSegment;
}
</script>

<style scoped></style>
