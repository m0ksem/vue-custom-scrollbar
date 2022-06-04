<script setup lang="ts">
  import { computed, PropType, ref, watch } from 'vue';
  import { useScrollDrag } from '../hooks/useScrollDrag';
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
    trackColor: { type: String },
    hide: { type: Boolean },
    hideTimeout: { type: Number },
  })

  const emit = defineEmits(['update:modelValue'])

  const thumbRef = ref<HTMLElement>()
  const scrollbarRef = ref<HTMLElement>()

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

  const scrollbarClass = computed(() => ({
    ['scrollbar--focused']: isFocused.value,
    [`scrollbar--${props.position}`]: true,
    ['scrollbar--hidden']: props.hide,
  }))

  const autoHideDelay = computed(() => `${props.hideTimeout}ms`)

  const { position: dragPosition, isFocused } = useScrollDrag(scrollbarRef, thumbRef)

  watch(dragPosition, ({ x, y }) => {
    const newSize = isHorizontalPosition() ? x : y

    emit('update:modelValue', newSize)
  })

  const slotBinds = computed(() => ({
    horizontal: isHorizontalPosition(),
    vertical: !isHorizontalPosition(),
    placement: isHorizontalPosition() ? 'horizontal' : 'vertical',
    focused: isFocused.value
  }))
</script>

<template>
  <div class="scrollbar" :class="scrollbarClass" :style="scrollbarStyle" ref="scrollbarRef">
    <div class="thumb-wrapper" :style="thumbWrapperStyle" ref="thumbRef">
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
        transition: all 0.2s ease-in-out;
      }
    }

    &--focused {
      .thumb {
        &--default {
          background: rgba(26, 26, 26, 0.6);
        }
      }
    }

    &--hidden {
      transition: opacity 0.2s ease-in-out v-bind(autoHideDelay);
      opacity: 0;
      &:not(.scrollbar--focused) {
        &:hover {
          opacity: 1.0;
          transition-delay: 0ms;          
        }
      }
    }
  }
</style>