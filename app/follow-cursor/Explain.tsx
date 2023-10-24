import { FC, useEffect, useState } from 'react'
import { Stage, Layer, Circle, Arrow } from 'react-konva'
import Konva from 'konva'
import { useWindowSize } from 'react-use'

// https://konvajs.org/api/Konva.html
// https://github.com/konvajs/react-konva

interface Props {
  debug?: boolean
}

const Explain: FC<Props> = ({ debug }) => {
  const windowSize = useWindowSize()
  const [pointerLoc, setPointerLoc] = useState({ x: 0, y: 0 })
  const [ballLoc, setBallLoc] = useState({ x: 0, y: 0 })

  const moveHandler = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const { clientX, clientY } = e.evt
    setPointerLoc({ x: clientX, y: clientY })
  }

  const updateBallLoc = () => {
    const dx = pointerLoc.x - ballLoc.x
    const dy = pointerLoc.y - ballLoc.y
    setBallLoc({
      x: ballLoc.x + dx * 0.03,
      y: ballLoc.y + dy * 0.03
    })
  }

  useEffect(() => {
    requestAnimationFrame(updateBallLoc)
  })

  return (
    <Stage
      width={windowSize.width}
      height={windowSize.height}
      onMouseMove={moveHandler}
    >
      <Layer>
        <Circle
          x={ballLoc.x}
          y={ballLoc.y}
          width={14}
          height={14}
          fill='red'
        />
        {debug && (
          <>
            <Circle
              x={pointerLoc.x}
              y={pointerLoc.y}
              width={14}
              height={14}
              fill='green'
            />
            <Arrow
              x={ballLoc.x}
              y={ballLoc.y}
              points={[0, 0, pointerLoc.x - ballLoc.x, pointerLoc.y - ballLoc.y]}
              pointerLength={15}
              pointerWidth={5}
              fill='black'
              stroke='black'
              strokeWidth={1}
            />
          </>
        )}
      </Layer>
    </Stage>
  )
}

export default Explain