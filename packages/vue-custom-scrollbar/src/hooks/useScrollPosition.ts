import { useEventListener, MaybeRef, reactiveComputed } from "@vueuse/core";
import { reactive, unref, watch } from "vue";

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

  const scroll = () => {
    const target = unref(el)
    if (!target) return
    target.scrollTo({
      top: scrollPosition.y / 100 * target.scrollHeight,
      left: scrollPosition.x / 100 * target.scrollWidth,
     })
  }
  
  return new Proxy(scrollPosition, {
    set(target, key: string, value) {
      (target as any)[key] = value
      scroll()
      return true
    }
  })
}