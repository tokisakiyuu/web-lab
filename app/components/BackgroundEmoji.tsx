import { useSpring, animated, config } from '@react-spring/web'
import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { isInteractionReadyAtom } from '../state'

const BackgroundEmoji = ({ is }: { is: string }) => {
  const isIneractionReady = useAtomValue(isInteractionReadyAtom)
  const [springs, api] = useSpring(() => ({
    y: '50vh',
    x: '50vw',
    rotateZ: 0,
    rotateY: 0,
    scale: 1,
    opacity: 0
  }), [])

  useEffect(() => {
    if (!isIneractionReady) return
    showAnimate()
    randomAnimate(false, 0)
      .then(() => randomAnimate(true, 5000))
  }, [isIneractionReady])

  const randomAnimate = async (loop: boolean, delay: number) => {
    return api.start({
      to: async (start, stop) => {
        return start({
          x: randomIn(10, 90) + 'vw',
          y: randomIn(10, 90) + 'vh',
          rotateZ: randomIn(0, 8) * 360,
          rotateY: randomIn(0, 8) * 360,
          scale: randomIn(1, 5)
        })
      },
      loop,
      delay,
      config: config.molasses
    })
  }

  const showAnimate = async () => {
    return api.start({
      to: {
        opacity: 1
      },
      config: {
        ...config.default,
        duration: 200
      }
    })
  }

  return (
    <div className='w-0 h-0'>
      <animated.div
        className='inline-block'
        style={{
          fontSize: 40,
          lineHeight: 1,
          borderRadius: 4,
          willChange: 'tranfrom',
          ...springs,
        }}
      >
        {is}
      </animated.div>
    </div>
  )
}

function randomIn(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default BackgroundEmoji