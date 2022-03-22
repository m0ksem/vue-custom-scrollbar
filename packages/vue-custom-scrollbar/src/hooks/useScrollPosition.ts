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

  onMounted(() => {
    unref(el)?.addEventListener('scroll', onScroll)
  })

  onBeforeUnmount(() => {
    unref(el)?.removeEventListener('scroll', onScroll)
  })

  watch(() => el, () => {
    unref(el)?.addEventListener('scroll', onScroll)
  })

  return scrollPosition
}