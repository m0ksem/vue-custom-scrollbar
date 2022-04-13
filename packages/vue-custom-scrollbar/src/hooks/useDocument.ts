import { computed, ComputedRef } from "@vue/reactivity"

export const useDocument = (): ComputedRef<Document | undefined> => { 
  return computed<Document | undefined>(() => typeof document !== 'undefined' ? document : undefined)
}