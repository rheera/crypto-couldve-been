<template>
  <ion-segment
    @ion-change="changeSegment($event.detail.value ?? currentSegment)"
    :value="currentSegment"
  >
    <ion-segment-button
      v-for="(segmentButton, index) in segmentButtonsList"
      :key="segmentButton.value"
      :value="segmentButton.value"
    >
      <BaseIcon :icon-name="segmentButton.value" :width="36" :height="36">
        <component :is="AsyncComps[index]"></component>
      </BaseIcon>
    </ion-segment-button>
  </ion-segment>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from "vue";
import { IonSegment, IonSegmentButton } from "@ionic/vue";
import BaseIcon from "@/components/base/BaseIcon.vue";
import IconBitcoin from "@/components/icons/IconBitcoin.vue";
import IconStocks from "@/components/icons/IconStocks.vue";

export type segmentButtonType = {
  value: string;
  icon: string;
  path: string;
};

const props = defineProps<{
  segmentButtonsList: segmentButtonType[];
}>();

let AsyncComps: object[] = [];

// const AsyncComp = defineAsyncComponent(
//   () => import(`../icons/IconBitcoin.vue`)
// );

const currentSegment = ref(props.segmentButtonsList[0].value);

const emit = defineEmits<{
  (e: "current-segment", currentSegment: string): void;
}>();

function changeSegment(newSegment: string) {
  currentSegment.value = newSegment;
  emit("current-segment", currentSegment.value);
}

function getAllIconComponents() {
  props.segmentButtonsList.forEach((iconComponent) => {
    let AsyncComp = defineAsyncComponent(() => import(iconComponent.path));
    AsyncComps.push(AsyncComp);
  });
}

onMounted(() => {
  getAllIconComponents();
});
</script>
