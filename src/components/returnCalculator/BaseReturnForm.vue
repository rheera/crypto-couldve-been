<template>
  <form class="ion-padding" action="" @submit.prevent="submitForm">
    <ion-list>
      <ion-item>
        <ion-select
          aria-label="coins"
          placeholder="Select Coin"
          interface="popover"
          @ion-change="selectedCoin = $event.detail.value"
          required
        >
          <ion-select-option
            v-for="coin in allCoins"
            :key="coin.id"
            :value="coin.id"
            >{{ coin.name }} ({{ coin.symbol }})</ion-select-option
          >
        </ion-select>
      </ion-item>
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
    <ion-button type="submit" expand="block">
      <p v-if="!calculating">Calculate</p>
      <ion-spinner v-else name="crescent"></ion-spinner>
    </ion-button>
  </form>
</template>

<script setup lang="ts">
import {
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
} from "@ionic/vue";
import { ref, Ref, computed, onMounted } from "vue";
import { getPrice, getCoinList } from "@/services/CryptoCoinDataService";
import {type coinNameData} from "@/data/types"

const props = defineProps<{
  investmentsList: coinNameData[]
}>();

const allCoins = ref(props.investmentsList);
const selectedCoin = ref("bitcoin");

const startingInvestment = ref();
const buyingDate = ref("");
const coinBuyingPrice = ref(0);
const sellingDate = ref("");
const coinSellingPrice = ref(0);
const calculatedSellingPrice = ref(0);
const calculating = ref(false)

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
  await getPrice(selectedCoin.value, buyingDateReversed.value)
    .then((response) => {
      coinBuyingPrice.value = response.data.market_data.current_price.usd;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getSellingPrice() {
  await getPrice(selectedCoin.value, sellingDateReversed.value)
    .then((response) => {
      coinSellingPrice.value = response.data.market_data.current_price.usd;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function submitForm() {
  calculating.value = true;
  await getBuyingPrice();
  await getSellingPrice();
  //   const amtOfCoinOwned = coinBuyingPrice.value * startingInvestment.value;
  // console.log("price of bough", coinBuyingPrice.value);
  // console.log("price of sold", coinSellingPrice.value);
  // console.log("coin owned", coinOwned.value);

  calculatedSellingPrice.value = Number(
    (coinOwned.value * coinSellingPrice.value).toFixed(2)
  );
  calculating.value = false;

}

onMounted(() => {
  /**
   * If we wanted to load all the coins coinGecko has ... way too many
   */
  // getCoinList()
  //   .then((response) => {
  //     allCoins.value = response.data;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});
</script>

<style scoped></style>
