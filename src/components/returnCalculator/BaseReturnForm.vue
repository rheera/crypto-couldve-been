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
import { ref, computed } from "vue";
import { getPrice } from "@/services/CryptoCoinDataService";

const enteredStartingInvestment = ref(0);
const enteredDesc = ref("");
const enteredBuyingDate = ref("");
const calculatedBuyingPrice = ref(0);
const enteredSellingDate = ref("");
const calculatedSellingPrice = ref(0);
const calculatedReturn = ref(0);

const enteredBuyingDateReversed = computed(() => {
  return reverseString(enteredBuyingDate.value);
});

const enteredSellingDateReversed = computed(() => {
  return reverseString(enteredSellingDate.value);
});

function reverseString(s: string) {
  return s.split("-").reverse().join("-");
}

function calculateCurrentValue() {}

function submitForm() {
  getPrice("bitcoin", enteredBuyingDateReversed.value)
    .then((response) => {
      console.log(response.data);
      calculatedBuyingPrice.value = response.data.market_data.current_price.usd;
      calculatedReturn.value =
        enteredStartingInvestment.value / calculatedBuyingPrice.value;
    })
    .catch((error) => {
      console.log(error);
    });
  calculatedReturn.value =
    enteredStartingInvestment.value / calculatedBuyingPrice.value;
}
</script>

<style scoped></style>
