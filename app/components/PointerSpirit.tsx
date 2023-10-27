import { FC, useState, useEffect, ComponentProps, useRef, ReactNode } from "react"
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { isInteractionReadyAtom } from '../state'

const isActiveAtom = atom(false)
const activeRectAtom = atom({ left: 0, top: 0, width: 0, height: 0 })

const PointerSpirit: FC = () => {
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 })
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const realCursorPos = useCursorPosition()
  const isActive = useAtomValue(isActiveAtom)
  const activeRect = useAtomValue(activeRectAtom)
  const isInteractionReady = useAtomValue(isInteractionReadyAtom)
  const [isVisible, toVisible, stopAutoOff] = useAutoOff(false, 5000)

  useEffect(() => {
    if (isActive) {
      stopAutoOff()
      setCursorPos({ x: activeRect.left + activeRect.width / 2, y: activeRect.top + activeRect.height / 2 })
    } else {
      toVisible()
      setCursorPos({ x: realCursorPos.x, y: realCursorPos.y })
    }
  }, [isActive, realCursorPos.x, realCursorPos.y])

  const updateElfPosition = () => {
    const dx = cursorPos.x - ballPos.x
    const dy = cursorPos.y - ballPos.y
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
        className="bg-[#e91e63] pointer-events-none m-auto absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        style={{
          width: isActive ? activeRect.width : 60,
          height: isActive ? activeRect.height : 60,
          borderRadius: isActive ? 0 : '50%',
          transition: `width .6s, height .6s, border-Radius .6s`,
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