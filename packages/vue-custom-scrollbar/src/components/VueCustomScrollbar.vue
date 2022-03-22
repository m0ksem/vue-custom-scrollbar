<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useScrollBarWidth } from '../hooks/useScrollbarWidth'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { px } from '../utils'
import Scrollbar from './ScrollBar.vue'

const props = defineProps({
  top: { type: Boolean, default: false },
  left: { type: Boolean, default: false },
  bottom: { type: Boolean, default: false },
  right: { type: Boolean, default: false },
  inner: { type: Boolean, default: false },
  thickness: { type: [String, Number] },
  color: { type: String, default: '#9d4edd' },
  trackColor: { type: String, default: '#3c096c'}
})

const { scrollbarSize } = useScrollBarWidth()

const computedThickness = computed(() => props.thickness || scrollbarSize.value)

const scrollableElStyle = computed(() => ({
  'margin-right':  px(-scrollbarSize.value),
  'margin-bottom': px(-scrollbarSize.value),
}))

const innerElStyle = computed(() => {
  if (props.inner) { return undefined }

  return {
    padding: [props.top, props.right, props.bottom, props.left]
      .map((p) => p ? px(computedThickness.value, 'thickness') : '0')
      .join(' ')
  }
})

const scrollableRef = ref<HTMLElement>()
const innerRef = ref<HTMLElement>()

const scrollPosition = useScrollPosition(scrollableRef)

const { width: scrollableWidth, height: scrollableHeight } = useElementSize(scrollableRef)
const { width: innerWidth, height: innerHeight } = useElementSize(innerRef)

const fakeScrollbarSize = computed(() => ({
  x: (scrollableWidth.value - scrollbarSize.value) / innerWidth.value * 100,
  y: (scrollableHeight.value - scrollbarSize.value) / innerHeight.value * 100
}))

type ScrollbarParams = { main: 'x' | 'y', cross: 'x' | 'y', position: 'top' | 'left' | 'right' | 'bottom' }

const scrollbars = computed(() => {
  const scrollbars: ScrollbarParams[] = []
  if (props.top) { scrollbars.push({ main: 'x', cross: 'y', position: 'top' }) }
  if (props.left) { scrollbars.push({ main: 'y', cross: 'x', position: 'left' }) }
  if (props.right) { scrollbars.push({ main: 'y', cross: 'x', position: 'right' }) }
  if (props.bottom) { scrollbars.push({ main: 'x', cross: 'y', position: 'bottom' }) }
  return scrollbars
})
</script>

<template>
  <div class="vue-custom-scrollbar">
    <div class="vue-custom-scrollbar__scrollable" :style="scrollableElStyle" ref="scrollableRef">
      <div class="vue-custom-scrollbar__inner" :style="innerElStyle" ref="innerRef">
        <slot />
      </div>      
    </div>

    <Scrollbar 
      v-for="{ main, position} in scrollbars"
      :key="position"
      :size="fakeScrollbarSize[main]" 
      :position="position"
      :thickness="computedThickness"
      :color="color"
      :trackColor="trackColor"
      v-model="scrollPosition[main]"
    >
      <template #thumb="bind">
        <slot name="thumb" v-bind="bind" />
      </template>
      <template #track="bind">
        <slot name="track" v-bind="bind" />
      </template>
    </Scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.vue-custom-scrollbar {
  overflow: hidden;
  display: flex;
  position: relative;
  box-sizing: border-box;

  &__scrollable {
    flex-grow: 1;
    overflow: scroll;
    min-width: 100%;
    min-height: 100%;
    box-sizing: border-box;
  }

  &__inner {
    width: max-content;
    height: max-content;
  }
}
</style>
