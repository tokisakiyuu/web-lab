import { FC, useState, useEffect, ComponentProps, useRef } from "react"
import { atom, useAtomValue, useSetAtom } from 'jotai'
import clsx from 'clsx'
import { isInteractionReadyAtom } from '../state'

const isActiveAtom = atom(false)
const activeRectAtom = atom({ left: 0, top: 0, width: 0, height: 0 })

const PointerSpirit: FC = () => {
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 })
  const [{ x: cx, y: cy }, setCursorPos] = useState({ x: 0, y: 0 })
  const { x: rx, y: ry } = useCursorPosition()
  const isActive = useAtomValue(isActiveAtom)
  const activeRect = useAtomValue(activeRectAtom)
  const isInteractionReady = useAtomValue(isInteractionReadyAtom)
  const [isVisible, toVisible, stopAutoOff] = useAutoOff(false, 5000)

  useEffect(() => {
    if (isActive) {
      stopAutoOff()
      setCursorPos({ x: activeRect.left + activeRect.width / 2, y: activeRect.top + activeRect.height / 2 })
    } else {
      if ((cx !== rx) || (cy !== ry)) {
        toVisible()
        setCursorPos({ x: rx, y: ry })
      }
    }
  }, [isActive, rx, ry])

  const updateElfPosition = () => {
    const dx = cx - ballPos.x
    const dy = cy - ballPos.y
    setBallPos({
      x: ballPos.x + dx * 0.1,
      y: ballPos.y + dy * 0.1,
    })
  }

  useEffect(() => {
    requestAnimationFrame(updateElfPosition)
  })

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: ballPos.x,
        top: ballPos.y,
        width: 0,
        height: 0,
        mixBlendMode: 'multiply',
        transition: 'opacity 1.5s',
        opacity: (isInteractionReady && isVisible) ? 1 : 0
      }}
    >
      <div
        className={clsx(
          'bg-[#e91e63] pointer-events-none m-auto absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] transition-[width_.6s,height_.6s,border-radius_.6s]',
          isActive ? 'rounded-[12px]' : 'rounded-[50%]',
        )}
        style={{
          width: isActive ? activeRect.width + 12 : 20,
          height: isActive ? activeRect.height + 12 : 20
        }}
      />
    </div>
  )
}

function useCursorPosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    document.addEventListener('mousemove', mouseMoveHandler)
    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [])

  return pos
}

function useAutoOff(init: boolean = true, ms: number): [boolean, () => void, () => void] {
  const [timer, setTimer] = useState(() => setTimeout(() => setValue(false), ms))
  const [value, setValue] = useState(init)

  const reset = () => {
    setValue(true)
    cancel()
    setTimer(setTimeout(() => setValue(false), ms))
  }

  const cancel = () => {
    clearTimeout(timer)
  }

  return [value, reset, cancel]
}

export const Pin: FC<ComponentProps<'div'>> = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null)
  const setIsActive = useSetAtom(isActiveAtom)
  const setActiveRect = useSetAtom(activeRectAtom)

  return (
    <div
      {...props}
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        const { left, top, width, height } = ref.current.getBoundingClientRect()
        setActiveRect({ left, top, width, height })
        setIsActive(true)
      }}
      onMouseLeave={() => {
        if (!ref.current) return
        setIsActive(false)
      }}
    >
      {children}
    </div>
  )
}

export default PointerSpirit