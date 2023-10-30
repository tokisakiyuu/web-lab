'use client'
import { useSpring, useSprings, animated, useSpringRef, config } from '@react-spring/web'
import { useEffect, useState } from 'react'

const ComplexAnimation = () => {
  const [springs, api] = useSpring(() => ({ y: '50vh', x: '50vw', rotateZ: 0, rotateY: 0, scale: 1 }), [])

  useEffect(() => {
    api.start({
      to: async (start, stop) => {
        return start({
          x: randomIn(10, 90) + 'vw',
          y: randomIn(10, 90) + 'vh',
          rotateZ: randomIn(0, 8) * 360,
          rotateY: randomIn(0, 8) * 360,
          scale: randomIn(1, 5)
        })
      },
      loop: true,
      delay: 1000,
      config: config.molasses
    })
  }, [])

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
        😊
      </animated.div>
    </div>
  )
}

function randomIn(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Page = () => {
  return (
    <div>
      <ComplexAnimation />
      <ComplexAnimation />
      <ComplexAnimation />
      <ComplexAnimation />
      <ComplexAnimation />
      <ComplexAnimation />
      <ComplexAnimation />
      <ComplexAnimation />
      <ComplexAnimation />
      <ComplexAnimation />
    </div>
  )
}

export default Page