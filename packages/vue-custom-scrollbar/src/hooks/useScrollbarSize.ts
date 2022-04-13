import { computed, unref } from "vue"
import { MaybeRef } from "@vueuse/core"
import { useDocument } from './useDocument'

export const useScrollBarSize = (el?: MaybeRef<HTMLElement>) => {
  const document = useDocument()

  const createElement = (tag: string, style: Partial<CSSStyleDeclaration> = {}) => {
    if (!document.value) { return null }

    const el = document.value.createElement(tag)
  
    Object.keys(style).forEach((key: any) => { el.style[key] = style[key]! } )
  
    return el
  }

  const elements = computed(() => {  
    const parent = createElement('div', { visibility: 'hidden', overflow: 'scroll' })
    const child = createElement('div')

    if (!parent || !child) { return { parent, child } }

    parent.appendChild(child)

    return { parent, child }
  })


  const scrollbarSize = computed(() => {
    const { parent, child } = elements.value;

    // SSR scrollbar size = 0
    if (!child || !parent || !document.value) { return 0 }

    (unref(el) || document.value?.body)?.appendChild(parent)

    // Difference with parent with scrollbar and child without scrollbar
    const size = parent.offsetWidth - child.offsetWidth

    parent.parentElement?.removeChild(parent)

    return size
  })

  return {
    scrollbarSize
  }
}