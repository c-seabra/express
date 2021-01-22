import { RefObject, useEffect } from 'react'

const useClickOutsideListenerRef = (
  ref: RefObject<HTMLElement>,
  handler: (event?: MouseEvent | TouchEvent) => void,
  // Node which is some container which click shouldn't trigger the handler
  domNode?: HTMLElement | null
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        domNode?.contains(event.target as Node)
      ) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [domNode, ref, handler])
}

export default useClickOutsideListenerRef
