import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import cx from 'clsx'
import TextDelaySlideUp from '../components/TextDelaySlideUp'
import TextSlideUp from '../components/TextSlideUp'

const MY_NAME = 'TokisakiYuu'
const Time = dynamic(async () => import('../components/Time'), { ssr: false })

const SectionOne = () => {
  const [isWating, setIsWating] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsWating(false)
    }, 2000)
  }, [])

  return (
    <div className="bg-background-color h-[100vh] w-[100vw] flex-shrink-0 flex flex-col">
      <h2 className={cx('mx-auto mt-8 text-primary-color font-mono', { 'invisible': isWating })}>
        <TextSlideUp text='有鱼的' playing={!isWating} className='text-xl' />
        <TextSlideUp text='Web实验空间' playing={!isWating} className='text-5xl mt-3' />
      </h2>
      <div className='m-auto'>
        <Time className='text-primary-color text-4xl font-mono inline-block animate-[zoom-out_5s]' />
      </div>
      <div className={cx('mt-auto flex justify-center', { 'invisible': isWating })}>
        <TextDelaySlideUp className='text-primary-color text-[15vw] tracking-tighter' text={MY_NAME} playing={!isWating} />
      </div>
    </div>
  )
}

export default SectionOne