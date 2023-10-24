import { FC, ComponentProps } from "react"
import cx from 'clsx'

interface Props  {
  text: string
  playing?: boolean
}

const TextDelaySlideUp: FC<Props & ComponentProps<'div'>> = ({ text, playing = true, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={cx('overflow-hidden leading-none', className)}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={cx({ 'animate-[character-slide-up_1.2s_cubic-bezier(.64,0,.32,1)_forwards]': playing }, 'inline-block translate-y-[100%] opacity-0')}
          style={{ animationDelay: `${i * 80}ms` }}
        >{char}</span>
      ))}
    </div>
  )
}

export default TextDelaySlideUp