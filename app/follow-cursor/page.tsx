'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const Explain = dynamic(() => import('./Explain'), { ssr: false })

const FollowCursor = () => {
  const [debug, setDebug] = useState(false)

  return (
    <main className='relative'>
      <Explain debug={debug} />
      <div className='bg-black absolute right-0 bottom-0 select-none'>
        <label className='p-3 flex items-center text-white text-sm'>
          <input type="checkbox" onChange={e => setDebug(e.target.checked)} />
          <span className='ml-1'>可视化</span>
        </label>
      </div>
    </main>
  )
}

export default FollowCursor