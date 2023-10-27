'use client'
import { ComponentProps, FC, useEffect, useRef, useState } from "react"
import { atom, useAtomValue, useSetAtom } from 'jotai'

const MouseElf = () => {
  return (
    <div className="h-[100vh] overflow-scroll relative">
      <div className="flex">

        <Slot className="absolute w-28 h-32 bg-blue-600 top-[20px] left-[20px]"></Slot>

        <Slot className="absolute w-20 h-32 bg-purple-400 top-[100px] left-[900px]"></Slot>

        <Slot className="absolute w-2 h-8 bg-purple-400 top-[300px] left-[900px]"></Slot>

        <Slot className="absolute w-[200px] h-8 bg-purple-400 top-[500px] left-[600px]"></Slot>

        <Slot className="absolute w-[200px] h-[400px] bg-purple-400 top-[200px] left-[200px]"></Slot>

      </div>
      <Elf />
    </div>
  )
}

interface Rect {
  left: number
  top: number
  width: number
  height: number
}

const isActiveAtom = atom(false)
const activeRectAtom = atom<Rect>({ left: 0, top: 0, width: 0, height: 0 })

const Slot: FC<ComponentProps<'div'>> = ({ children, ...props }) => {
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
      onMouseMove={e => {
        const el = e.target as HTMLDivElement
        const { left, top } = el.getBoundingClientRect()
        const rx = e.clientX - left
        const ry = e.clientY - top
        console.log(rx, ry)
      }}
    >
      {children}
    </div>
  )
}

const Elf = () => {
  const [elfPosition, setElfPosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const isActive = useAtomValue(isActiveAtom)
  const activeRect = useAtomValue(activeRectAtom)

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      if (isActive) {
        setCursorPosition({ x: activeRect.left + activeRect.width / 2, y: activeRect.top + activeRect.height / 2 })
      } else {
        setCursorPosition({ x: e.clientX, y: e.clientY })
      }
    }
    document.addEventListener('mousemove', mouseMoveHandler)
    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [isActive])

  const updateElfPosition = () => {
    const dx = cursorPosition.x - elfPosition.x
    const dy = cursorPosition.y - elfPosition.y
    setElfPosition({
      x: elfPosition.x + dx * 0.1,
      y: elfPosition.y + dy * 0.1,
    })
  }

  useEffect(() => {
    requestAnimationFrame(updateElfPosition)
  })

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: elfPosition.x,
        top: elfPosition.y,
        width: 0,
        height: 0,
      }}
    >
      <div
        className="bg-red-600 pointer-events-none m-auto absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        style={{
          width: isActive ? activeRect.width : 20,
          height: isActive ? activeRect.height : 20,
          borderRadius: isActive ? 0 : '50%',
          transition: `width .6s, height .6s, border-Radius .6s`
        }}
      />
    </div>
  )
}

export default MouseElf