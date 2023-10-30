import { atom, getDefaultStore } from 'jotai'

const store = getDefaultStore()

// 页面是否准备好用户交互了
export const isInteractionReadyAtom = atom(false)

isInteractionReadyAtom.onMount = () => {
  setTimeout(() => {
    store.set(isInteractionReadyAtom, true)
  }, 2000)
}

// 页面滚动距离
export const scrollOffsetAtom = atom(0)