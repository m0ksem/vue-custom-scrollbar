import { computed, unref } from "vue"
import { MaybeRef } from "@vueuse/core"

const createElement = (tag: string, style: Partial<CSSStyleDeclaration>) => {
  const el = document.createElement(tag)

  Object.keys(style).forEach((key: any) => { el.style[key] = style[key]! } )

  return el
}

export const useScrollBarSize = (el?: MaybeRef<HTMLElement>) => {
  const parent = createElement('div', { visibility: 'hidden', overflow: 'scroll' })
  const child = createElement('div', {})

  parent.appendChild(child)

  const scrollbarSize = computed(() => {    
    (unref(el) || document.body).appendChild(parent)

    // Difference with parent with scrollbar and child without scrollbar
    const size = parent.offsetWidth - child.offsetWidth

    parent.parentElement?.removeChild(parent)
    return size
  })

  return {
    scrollbarSize
  }
}