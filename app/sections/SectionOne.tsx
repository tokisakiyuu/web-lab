import dynamic from 'next/dynamic'
import cx from 'clsx'
import { useAtomValue } from 'jotai'
import { isInteractionReadyAtom } from '../state'
import TextDelaySlideUp from '../components/TextDelaySlideUp'
import TextSlideUp from '../components/TextSlideUp'
import GithubIcon from '../components/icons/github.svg'
import ZhihuIcon from '../components/icons/zhihu.svg'
import BiliBiliIcon from '../components/icons/bilibili.svg'
import MailIcon from '../components/icons/mail.svg'
import { Pin } from '../components/PointerSpirit'
import BackgroundEmoji from '../components/BackgroundEmoji'

const MY_NAME = 'TokisakiYuu'
const Time = dynamic(async () => import('../components/Time'), { ssr: false })

const SectionOne = () => {
  const isWating = !useAtomValue(isInteractionReadyAtom)

  return (
    <section className="bg-background-color relative">

      <div className='absolute left-0 top-0 opacity-20'>
        {['😄', '😭', '😑', '🥸', '🤔', '🥴', '🤗', '😧', '😥', '🥺', '🤩', '😏', '🥰'].map((e, i) => (
          <BackgroundEmoji key={i} is={e} />
        ))}
      </div>

      <div className='absolute left-0 top-0 h-[100vh] w-[100vw] flex-shrink-0 flex flex-col'>
        <div className={cx({ 'animate-[fade-in_1s_cubic-bezier(.64,0,.32,1)_forwards]': !isWating }, 'flex items-center text-primary-color p-5 opacity-0')}>
          <div className='flex items-center gap-1'>
            <Pin className='w-[15px] h-[15px]'>
              <GithubIcon />
            </Pin>
            <div>·</div>
            <Pin className='w-[18px] h-[18px]'>
              <ZhihuIcon />
            </Pin>
            <div>·</div>
            <Pin className='w-[18px] h-[18px]'>
              <BiliBiliIcon />
            </Pin>
            <div>·</div>
            <Pin className='w-[18px] h-[18px]'>
              <MailIcon />
            </Pin>
          </div>
          
          <Pin className={cx({ 'animate-[fade-in_1s_cubic-bezier(.64,0,.32,1)_forwards]': !isWating }, 'text-primary-color ml-auto text-sm opacity-0')}>
            <a
              href="https://github.com/tokisakiyuu/web-lab"
              target='_blank'
            >
              repo
            </a>
          </Pin>
        </div>

        <h2 className={cx('mx-auto mt-8 text-primary-color font-mono', { 'invisible': isWating })}>
          <TextSlideUp text='欢迎来到' playing={!isWating} className='text-2xl' />
          <TextSlideUp text='有鱼的杂物间' playing={!isWating} className='text-5xl mt-3' />
        </h2>

        <Pin className='m-auto isolate'>
          <Time className='text-primary-color text-4xl font-mono inline-block animate-[zoom-out_5s]' />
        </Pin>

        <div className={cx('mt-auto flex justify-center', { 'invisible': isWating })}>
          <TextDelaySlideUp className='text-primary-color text-[15vw] tracking-tighter' text={MY_NAME} playing={!isWating} />
        </div>
      </div>
    </section>
  )
}

export default SectionOne