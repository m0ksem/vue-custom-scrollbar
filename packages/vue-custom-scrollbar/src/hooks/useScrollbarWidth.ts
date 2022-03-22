import { computed, ref, Ref, unref } from "vue"
import { MaybeRef } from "../types/vue"

export const useScrollBarWidth = (el?: MaybeRef<HTMLElement>) => {
  const parent = document.createElement('div')
  parent.style.visibility = 'hidden'
  parent.style.overflow = 'scroll'

  const child = document.createElement('div')
  child.style.height = '200%'

  parent.appendChild(child)

  const scrollbarSize = computed(() => {    
    ;(unref(el) || document.body).appendChild(parent)

    // Difference with parent with scrollbar and child without scrollbar
    const size = parent.offsetWidth - child.offsetWidth

    parent.parentElement?.removeChild(parent)
    return size
  })

  return {
    scrollbarSize
  }
}