import { useEventListener, useDebounceFn } from "@vueuse/core";
import { ref } from "vue";
import { MaybeRef } from "../types/vue";

export const useFocusedByClick = (el: MaybeRef<HTMLElement | undefined>) => {
  const isFocused = ref(false)

  const unFocus = () => { isFocused.value = false }

  useEventListener(el, 'mousedown', () => { isFocused.value = true })
  useEventListener('mouseup', unFocus)
  useEventListener('blur', unFocus)

  return { isFocused }
}