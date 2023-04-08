<template>
  <form class="ion-padding" action="" @submit.prevent="submitForm">
    <ion-list>
      <ion-item>
        <ion-input
          label="Starting Investement ($)"
          label-placement="floating"
          placeholder="999"
          type="number"
          required
          v-model="enteredStartingInvestment"
        />
      </ion-item>
      <ion-item>
        <ion-input
          label="Starting Date"
          label-placement="floating"
          placeholder="2010-05-22"
          type="date"
          required
          v-model="enteredBuyingDate"
        />

        <!-- <ion-datetime-button datetime="datetime"></ion-datetime-button> -->

        <!-- <ion-modal :keep-contents-mounted="true">
          <ion-datetime
            id="datetime"
            presentation="date"
            :show-default-buttons="true"
          ></ion-datetime>
        </ion-modal> -->
      </ion-item>
      <ion-item>
        <ion-input
          label="Selling Date"
          label-placement="floating"
          placeholder="2023-03-22"
          type="date"
          required
          v-model="enteredSellingDate"
        />

        <!-- <ion-datetime-button datetime="datetime"></ion-datetime-button> -->

        <!-- <ion-modal :keep-contents-mounted="true">
          <ion-datetime
            id="datetime"
            presentation="date"
            :show-default-buttons="true"
          ></ion-datetime>
        </ion-modal> -->
      </ion-item>
      <ion-item>Total Sold For: {{ calculatedReturn }} </ion-item>
    </ion-list>
    <ion-button type="submit" expand="block">Save</ion-button>
  </form>
</template>

<script setup lang="ts">
import {
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
} from "@ionic/vue";
import { ref } from "vue";

const enteredStartingInvestment = ref(0);
const enteredDesc = ref("");
const enteredBuyingDate = ref("");
const enteredSellingDate = ref("");
const calculatedReturn = ref(0);

function submitForm() {
  calculatedReturn.value = enteredStartingInvestment.value * 2;
}
</script>

<style scoped></style>
