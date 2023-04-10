<script setup lang="ts">
export interface Props {
  iconName?: string;
  width?: number;
  height?: number;
  iconColor?: string;
  hoverColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  iconName: "svgIcon",
  width: 18,
  height: 18,
  iconColor: "currentColor",
  hoverColor: "none",
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    :aria-labelledby="iconName"
    role="presentation"
    :class="`hover:fill-${hoverColor}`"
    :fill="iconColor"
  >
    <title :id="iconName" lang="en">{{ iconName }}</title>
    <g>
      <slot />
    </g>
  </svg>
</template>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px; /* yes, I'm that particular about formatting */
}
</style>
