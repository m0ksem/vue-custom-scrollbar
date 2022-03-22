<script setup lang="ts">import { computed, PropType } from 'vue';
import { percent, px } from '../utils';

  const props = defineProps({
    modelValue: { 
      type: Number, required: true,
      validator(value: number) {
        return value >= 0 && value <= 100
      } 
    },
    position: {
      type: String as PropType<'bottom' | 'right' | 'left' | 'top'>, default: 'right', 
      validator(value: string) {
        return ['bottom', 'right', 'left', 'top'].includes(value)
      }
    },
    size: {
      type: [String, Number], required: true,
    },
    thickness: {
      type: [String, Number], default: '18px'
    }
  })

  const scrollClass = computed(() => [
    'scroll', `scroll--${props.position}`
  ])

  const isHorizontalPosition = () => props.position === 'bottom' || props.position === 'top'

  const getSizeKey = () => isHorizontalPosition() ? 'width' : 'height'

  const getThicknessKey = () => isHorizontalPosition() ? 'height': 'width'

  const getGuidelinePositionKey = () => isHorizontalPosition() ? 'left' : 'top'

  const barStyle = computed(() => ({
    [getGuidelinePositionKey()]: percent(props.modelValue),
    [getSizeKey()]: percent(props.size, 'size'),
    [getThicknessKey()]: px(props.thickness, 'thickness')
  }))

  const scrollStyle = computed(() => ({
    [getThicknessKey()]: px(props.thickness, 'thickness')
  }))
</script>

<template>
  <div class="scroll" :class="scrollClass" :style="scrollStyle">
    <div class="bar" :style="barStyle">
      <slot name="bar" v-bind="{ horizontal: isHorizontalPosition }">
        
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
  .scroll {
    position: absolute;
    .bar {
      position: absolute;
      & > * {
        width: 100%;
        height: 100%;
      }
    }

    &--right {
      right: 0;
      height: 100%;
    }

    &--bottom {
      bottom: 0;
      width: 100%;
    }

    &--top {
      top: 0;
      width: 100%;
    }

    &--left {
      left: 0;
      height: 100%;
    }
  }
</style>