import { useEffect, useRef } from 'react'

const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef<Function>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = savedCallback.current

    if (tick) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [callback, delay])
}

export { useInterval }
