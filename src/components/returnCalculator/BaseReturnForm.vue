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
          v-model="startingInvestment"
        />
      </ion-item>
      <ion-item>
        <ion-input
          label="Starting Date"
          label-placement="floating"
          placeholder="2010-05-22"
          type="date"
          required
          v-model="buyingDate"
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
          v-model="sellingDate"
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
      <ion-item>Total Sold For: {{ calculatedSellingPrice }} </ion-item>
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
import { returnUpBackOutline } from "ionicons/icons";

const startingInvestment = ref(0);
const buyingDate = ref("");
const coinBuyingPrice = ref(0);
const sellingDate = ref("");
const coinSellingPrice = ref(0);
const calculatedSellingPrice = ref(0);

const buyingDateReversed = computed(() => {
  return reverseString(buyingDate.value);
});

const sellingDateReversed = computed(() => {
  return reverseString(sellingDate.value);
});

const coinOwned = computed(() => {
  return startingInvestment.value / coinBuyingPrice.value;
});

function reverseString(s: string) {
  return s.split("-").reverse().join("-");
}

async function getBuyingPrice() {
  await getPrice("bitcoin", buyingDateReversed.value)
    .then((response) => {
      coinBuyingPrice.value = response.data.market_data.current_price.usd;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getSellingPrice() {
  await getPrice("bitcoin", sellingDateReversed.value)
    .then((response) => {
      coinSellingPrice.value = response.data.market_data.current_price.usd;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getTotalSoldFor(amtCoinOwned: number, priceOfCoin: number) {
  return amtCoinOwned * priceOfCoin;
}

async function submitForm() {
  await getBuyingPrice();
  await getSellingPrice();
  //   const amtOfCoinOwned = coinBuyingPrice.value * startingInvestment.value;
  console.log("price of bough", coinBuyingPrice.value);
  console.log("price of sold", coinSellingPrice.value);
  console.log("coin owned", coinOwned.value);

  calculatedSellingPrice.value = Number(
    (coinOwned.value * coinSellingPrice.value).toFixed(2)
  );
}
</script>

<style scoped></style>
