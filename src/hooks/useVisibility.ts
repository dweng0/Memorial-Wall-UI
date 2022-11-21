import React from 'react'

/**
 * Flag bounds for left, top, right, bottom (like css margins/paddings)
 * @example const {ref, left} = useVisibility() //pass the ref into the element you want to check and put a use effect on the flag/s
 * @returns true for any of the flags that are intersecting
 */
export const useVisibility = (): {
ref:  React.RefCallback<Element>,
  top:boolean,
  right:boolean,
  bottom:boolean,
  left:boolean,
  intersecting:boolean,
} => {

  const [outOfBoundsLeft, setOutOfBoundsLeft] = React.useState(false)
  const [outOfBoundsRight, setOutOfBoundsRight] = React.useState(false)
  const [outOfBoundsTop, setOutOfBoundsTop] = React.useState(false)
  const [outOfBoundsBottom, setOutOfBoundsBottom] = React.useState(false)
  const [intersecting, setIntersecting] = React.useState(false)

  const reset = () => { 
    setOutOfBoundsLeft(false)
    setOutOfBoundsRight(false)
    setOutOfBoundsTop(false)
    setOutOfBoundsBottom(false)
    setIntersecting(false)
  }

  const observer = React.useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        const rect = entry.boundingClientRect
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
        const windowWidth = window.innerWidth || document.documentElement.clientWidth
        setIntersecting(entry.isIntersecting)
        setOutOfBoundsBottom(rect.bottom >= windowHeight)
        setOutOfBoundsTop(rect.top + rect.height <= 0)
        setOutOfBoundsLeft(rect.left + rect.width <= 0)
        setOutOfBoundsRight(rect.right >= windowWidth)
      }),
    [setIntersecting, setOutOfBoundsBottom, setOutOfBoundsTop, setOutOfBoundsLeft, setOutOfBoundsRight],
  )

  /**
   * Only connect to the observer if the element exists, ptherwise, disconnect and reset bounds
   */
  const currentElement = React.useCallback(
    (ele: Element | null) => {
      if (ele) {
        observer.observe(ele)
      } else {
        observer.disconnect()
        reset();
      }
    },
    [observer],
  )

  return { 
  ref: currentElement,
  left: outOfBoundsLeft,
  right: outOfBoundsRight,
  top: outOfBoundsTop,
  bottom: outOfBoundsBottom,
  intersecting
  }
}