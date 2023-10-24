import { ComponentProps, FC } from "react"
import cx from 'clsx'

interface Props {
  text: string
  playing: boolean
}

const TextSlideUp: FC<Props & ComponentProps<'div'>> = ({ text, playing, className, ...rest }) => {
  return (
    <div {...rest} className={cx('overflow-hidden leading-none', className)}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={cx({ 'animate-[character-slide-up_1s_cubic-bezier(.64,0,.32,1)_forwards]': playing }, 'inline-block translate-y-[100%] opacity-0')}
        >{char}</span>
      ))}
    </div>
  )
}

export default TextSlideUp