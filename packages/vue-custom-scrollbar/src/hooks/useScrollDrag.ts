import { computed } from "@vue/reactivity";
import { useEventListener } from "@vueuse/core";
import { ref, unref } from "vue";
import { MaybeRef } from "../types/vue";
import { clamp } from "../utils";
import { useFocusedByClick } from "./useFocusedByClick";

export const useScrollDrag = (
  scrollbar: MaybeRef<HTMLElement | undefined>,
  thumb: MaybeRef<HTMLElement | undefined>
) => {
  /** Thumb position in percents */
  const position = ref({
    x: 0,
    y: 0,
  })

  const { isFocused } = useFocusedByClick(thumb)

  const onMouseMove = (ev: MouseEvent) => {
    if (!isFocused.value) { return }

    const parent = unref(scrollbar)?.getBoundingClientRect()
    const child = unref(thumb)?.getBoundingClientRect()
    if (!parent || !child) return
    
    const offsetTop = child.top - parent.top
    const offsetLeft = child.left - parent.left

    const newY = clamp(0, offsetTop + ev.movementY, parent.height - child.height)
    const newX = clamp(0, offsetLeft + ev.movementX, parent.width - child.width)

    const yPercent = newY / parent.height * 100
    const xPercent = newX / parent.width * 100

    position.value = { 
      y: yPercent,
      x: xPercent,
    }
  }

  useEventListener('mousemove', onMouseMove)

  return {
    position,
    isFocused
  }
}