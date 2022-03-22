<script setup lang="ts">
import VueCustomScrollbar from './components/VueCustomScrollbar.vue';
</script>

<template>
  <VueCustomScrollbar style="height: 300px; width: 300px" thickness="8px" right bottom left top>
    <div class="test-long-thing" />
  </VueCustomScrollbar>
</template>

<style>
  .test-long-thing {
    background: linear-gradient(45deg, rgb(255, 23, 15), rgb(41, 23, 202));
    overflow: auto;
    resize: both;
    height: 1000px;
    width: 1000px;
  }
</style>
