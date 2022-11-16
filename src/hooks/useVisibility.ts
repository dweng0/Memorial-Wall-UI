import React from 'react'

/**
 * Flag bounds for left, top, right, bottom
 * @returns
 */
export const useVisibility = (): [
  React.RefCallback<Element>,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
] => {

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
  return [currentElement, outOfBoundsLeft, outOfBoundsTop, outOfBoundsRight, outOfBoundsBottom, intersecting]
}
