import { FC, ReactNode, useCallback, useEffect, useMemo, useState, WheelEventHandler } from 'react'
import { useWindowSize, useLatest } from 'react-use'
import { atom, getDefaultStore, useAtom, useStore } from 'jotai'

export interface Props {
  sections: ReactNode[]
}

const Slideshow: FC<Props> = ({ sections }) => {
  const [offset, setOffset] = useState(0)
  const [contentOffset, setContentOffset] = useState(0)
  const windowSize = useWindowSize()
  const maxOffset = windowSize.width * (sections.length - 1)

  const wheelHandler: WheelEventHandler = e => {
    const { deltaX, deltaY } = e
    const variation = (Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY) * 2
    const newOffset = offset + variation * 0.3
    if (newOffset < 0) {
      setOffset(0)
    } else if (newOffset > maxOffset) {
      setOffset(maxOffset)
    } else {
      setOffset(newOffset)
    }
  }

  const updateContentOffset = () => {
    const diff = offset - contentOffset
    if (Math.abs(diff) < 0.001) return
    setContentOffset(contentOffset + diff * 0.06)
  }

  useEffect(() => {
    requestAnimationFrame(updateContentOffset)
  })

  return (
    <div
      className="flex w-max relative"
      style={{ transform: `translateX(${-contentOffset}px)` }}
      onWheel={wheelHandler}
    >
      {sections.map((node, i) => (
        <div key={i} className="h-[100vh] w-[100vw] flex-shrink-0">
          {node}
        </div>
      ))}
    </div>
  )
}

export default Slideshow