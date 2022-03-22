<script setup lang="ts">
  import { computed, PropType } from 'vue';
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
    size: { type: [String, Number], required: true },
    thickness: { type: [String, Number], default: '18px' },
    color: { type: String },
    trackColor: { type: String }
  })

  const isHorizontalPosition = () => props.position === 'bottom' || props.position === 'top'

  const getSizeKey = () => isHorizontalPosition() ? 'width' : 'height'

  const getThicknessKey = () => isHorizontalPosition() ? 'height': 'width'

  const getGuidelinePositionKey = () => isHorizontalPosition() ? 'left' : 'top'

  const thumbWrapperStyle = computed(() => ({
    [getGuidelinePositionKey()]: percent(props.modelValue),
    [getSizeKey()]: percent(props.size, 'size'),
    [getThicknessKey()]: px(props.thickness, 'thickness')
  }))

  const scrollbarStyle = computed(() => ({
    [getThicknessKey()]: px(props.thickness, 'thickness'),
  }))

  const slotBinds = computed(() => ({
    horizontal: isHorizontalPosition(),
    vertical: !isHorizontalPosition(),
    placement: isHorizontalPosition() ? 'horizontal' : 'vertical'
  }))
</script>

<template>
  <div class="scrollbar" :class="`scrollbar--${position}`" :style="scrollbarStyle">
    <div class="thumb-wrapper" :style="thumbWrapperStyle">
      <slot name="thumb" v-bind="slotBinds">
        <div class="thumb thumb--default" :style="{ background: color }" />
      </slot>
    </div>
    <div class="track-wrapper">
      <slot name="track" v-bind="slotBinds">
        <div class="track track--default" :style="{ background: trackColor }" />
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
  @mixin strach {
    width: 100%;
    height: 100%;
  }

  .scrollbar {
    position: absolute;
    .thumb-wrapper {
      position: absolute;
      z-index: 1;
      & > * {
        @include strach();
      }
    }

    .track-wrapper {
      position: absolute;
      z-index: 0;
      @include strach();
      & > * {
        @include strach();
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

    .thumb {
      &--default {
        background: rgba(26, 26, 26, 0.486);
        border-radius: 99999px;
      }
    }
  }
</style>