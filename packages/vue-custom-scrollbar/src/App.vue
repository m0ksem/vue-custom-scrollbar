<script setup lang="ts">
import VueCustomScrollbar from './components/VueCustomScrollbar.vue';
</script>

<template>
  <VueCustomScrollbar style="height: 500px; width: 300px" thickness="16px" right bottom left top trackColor="transparent" inner>
    <div class="test-long-thing" />

    <template #thumb="{ placement, focused }">
      <div 
        class="custom-thumb" 
        :class="{
         [`custom-thumb--${placement}`]: true,
          'custom-thumb--focused': focused 
        }"
      />
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
    transition: all 0.5s ease;
    &--horizontal {
      background: linear-gradient(90deg, #480ca8, #4895ef);
    }

    &--vertical {
      background: linear-gradient(0, #480ca8, #4895ef);
    }

    &--focused {
      &.custom-thumb {
        &--horizontal {
          background: linear-gradient(90deg, #c307e4, #5c5af3);
        }

        &--vertical {
          background: linear-gradient(0, #c307e4, #5c5af3);
        }
      }
    }
  }
</style>
