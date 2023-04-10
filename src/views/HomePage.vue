<template>
  <base-layout page-title="Profit Calculator">
    <template v-slot:actions-end>
      <ion-button router-link="/settings">
        <ion-icon slot="icon-only" :icon="settingsOutline"></ion-icon>
      </ion-button>
    </template>

    <ion-segment
      @ion-change="whichCalculator = $event.detail.value ?? 'crypto'"
      :value="whichCalculator"
    >
      <ion-segment-button value="crypto">
        <BaseIcon icon-name="upvote" :width="36" :height="36"
          ><IconBitcoin
        /></BaseIcon>
      </ion-segment-button>
      <ion-segment-button value="stocks">
        <BaseIcon icon-name="upvote" :width="36" :height="36"
          ><IconStocks
        /></BaseIcon>
      </ion-segment-button>
    </ion-segment>
    <base-return-form
      v-if="whichCalculator === 'crypto'"
      :investments-list="baseCoins"
    ></base-return-form>
    <base-return-form v-else :investments-list="baseStocks"></base-return-form>
  </base-layout>
</template>

<script setup lang="ts">
import BaseReturnForm from "@/components/returnCalculator/BaseReturnForm.vue";
import { IonButton, IonIcon, IonSegment, IonSegmentButton } from "@ionic/vue";
import { settingsOutline, home, heart } from "ionicons/icons";
import baseCoins from "@/data/baseCoins.json";
import baseStocks from "@/data/baseStocks.json";
import { ref } from "vue";
import BaseIcon from "@/components/base/BaseIcon.vue";
import IconBitcoin from "@/components/icons/IconBitcoin.vue";
import IconStocks from "@/components/icons/IconStocks.vue";

const whichCalculator = ref("crypto");
</script>

<style scoped></style>
