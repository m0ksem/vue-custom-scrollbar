import { useEventListener } from "@vueuse/core";
import { onBeforeUnmount, onMounted, reactive, unref, watch } from "vue";
import { MaybeRef } from "../types/vue";

export const useScrollPosition = (el: MaybeRef<HTMLElement | undefined>) => {
  const scrollPosition = reactive({
    x: 0,
    y: 0
  })

  const onScroll = (ev: Event) => {
    const target = ev.target as HTMLElement;

    scrollPosition.x = target.scrollLeft / target.scrollWidth * 100
    scrollPosition.y = target.scrollTop / target.scrollHeight * 100
  }

  useEventListener(el, 'scroll', onScroll)

  watch(scrollPosition, () => {
    const target = unref(el)
    if (!target) return
    target.scrollTo({
      top: scrollPosition.y / 100 * target.scrollHeight,
      left: scrollPosition.x / 100 * target.scrollWidth,
     })
  })

  return scrollPosition
}