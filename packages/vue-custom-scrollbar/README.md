# Vue custom scrollbar

## Component api

### Props
| Name | Type | Description | Default | 
| ---- | ---- | ----------- | ------- | 
| top |  Boolean | Renders top scrollbar |  false|
| left |  Boolean | Renders left scrollbar |  false |
| bottom |  Boolean | Renders bottom scrollbar |  false |
| right |  Boolean | Renders right scrollbar |  false |
| inner |  Boolean | Renders scrollbar inside of container |  false |
| thickness |  [String, Number] | Thichness of scrollbar | - |
| color |  String | Tumb color |  '#9d4edd' |
| trackColor |  String | Scrollbar background color |  '#3c096c'|

### Slots
| Name | Description | Bind |
| ---- | ----------- | ---- |
| default | Content inside scrollbale container | - | 
| thumb | Thing that user need to move using mouse | `ScrollbarSlotBind` |
| track | Scrollbar background | `ScrollbarSlotBind` |

```ts
type ScrollbarSlotBind = {
  horizontal: boolean,
  vertical: boolean,
  placement: 'horizontal' | 'vertical',
  focused: boolean
}
```

## Usage example

```vue
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
```