'use client'
import Slideshow from './components/Slideshow'
import SectionOne from './sections/SectionOne'
import SectionTwo from './sections/SectionTwo'
import SectionThree from './sections/SectionThree'
import PointerSpirit from './components/PointerSpirit'

export default function Home() {
  return (
    <main className='font-mono'>
      <Slideshow sections={[<SectionOne />, <SectionTwo />, <SectionThree />]} />
      <PointerSpirit />
    </main>
  )
}