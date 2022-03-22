<script setup lang="ts">
import VueCustomScrollbar from './components/VueCustomScrollbar.vue';
</script>

<template>
  <VueCustomScrollbar style="height: 300px; width: 300px" thickness="8px" right bottom left top trackColor="transparent" inner>
    <div class="test-long-thing" />

    <template #thumb="{ placement }">
      <div class="custom-thumb" :class="`custom-thumb--${placement}`"></div>
    </template>
  </VueCustomScrollbar>
</template>

<style lang="scss">
  .test-long-thing {
    background: linear-gradient(45deg, #10002b, #e0aaff);
    overflow: auto;
    resize: both;
    height: 1000px;
    width: 1000px;
  }

  .custom-thumb {
    background: linear-gradient(90deg, #480ca8, #4895ef);

    &--vertical {
      background: linear-gradient(0, #480ca8, #4895ef);
    }
  }
</style>
