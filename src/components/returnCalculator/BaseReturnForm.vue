<template>
  <form class="ion-padding" action="" @submit.prevent="submitForm">
    <ion-list>
      <ion-item>
        <ion-select
          aria-label="Investments"
          placeholder="Select Investment"
          interface="popover"
          @ion-change="selectedCoin = $event.detail.value"
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
          ref="investmentInput"
          label="Starting Investement ($)"
          label-placement="floating"
          placeholder="999"
          type="number"
          min="0"
          required
          @ion-input="validate(investmentInput, $event)"
          @ion-blur="markTouched(investmentInput)"
          errorText="Please enter a number greater than 0"
          v-model="startingInvestment"
          class="ion-valid"
        />
      </ion-item>
      <ion-item>
        <ion-input
          ref="buyingInput"
          label="Starting Date"
          label-placement="floating"
          placeholder="2010-05-22"
          type="date"
          required
          v-model="buyingDate"
          @ion-input="
            validSellingDate(buyingDate, sellingDate, buyingInput, sellingInput)
          "
          @ion-blur="markTouched(buyingInput)"
          errorText="Buying date must be before selling date"
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
          ref="sellingInput"
          label="Selling Date"
          label-placement="floating"
          placeholder="2023-03-22"
          type="date"
          required
          v-model="sellingDate"
          @ion-input="
            validSellingDate(buyingDate, sellingDate, buyingInput, sellingInput)
          "
          @ion-blur="markTouched(sellingInput)"
          errorText="Selling date must be after buying date"
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
import {validate, validateEmail, validSellingDate, markTouched} from "@/helpers/validationMethods"

const props = defineProps<{
  investmentsList: coinNameData[]
}>();

const allCoins = ref(props.investmentsList);
const selectedCoin = ref(props.investmentsList[0].id);

const startingInvestment = ref();
const buyingDate = ref("");
const coinBuyingPrice = ref(0);
const sellingDate = ref("");
const coinSellingPrice = ref(0);
const calculatedSellingPrice = ref(0);
const calculating = ref(false)
const investmentInput = ref(null)
const sellingInput = ref(null)
const buyingInput = ref(null)

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
// console.log(investmentInput.value);

  // investmentInput.value.focus()

});
</script>

<style scoped></style>
