import { atom, getDefaultStore } from 'jotai'

const store = getDefaultStore()

export const isInteractionReadyAtom = atom(false)

isInteractionReadyAtom.onMount = () => {
  setTimeout(() => {
    store.set(isInteractionReadyAtom, true)
  }, 2000)
}