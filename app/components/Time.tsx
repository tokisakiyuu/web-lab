import { useState, useEffect, FC, ComponentProps } from 'react'
import dayjs from 'dayjs'

const Time: FC<ComponentProps<'span'>> = (props) => {
  const [time, setTime] = useState(() => dayjs().format('HH:mm:ss'))

  useEffect(() => {
    setInterval(() => {
      setTime(dayjs().format('HH:mm:ss'))
    }, 1000)
  }, [])

  return <span {...props}>{time}</span>
}

export default Time