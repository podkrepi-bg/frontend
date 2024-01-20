import React, { useMemo, useRef, useState } from 'react'
import { FullScreenImageSlider } from './ImageSlider'
import { ImageSlider } from 'components/common/campaign-file/roles'

type ChildComponentProps = {
  children: JSX.Element[] | JSX.Element
  images: ImageSlider[]
}

/**
 * Gallery component which allows images to expand whenever clicked.
 * @param {React.JSX.Element | React.JSX.Element[]} children Single React Element , or array of React Elements.
 * @param {ImageSlider[]} images List of images to show when gallery is expanded
 * @returns
 */
export default function Gallery({ children, images }: ChildComponentProps) {
  const initialImage = useRef<number>(0)
  const [toggleFullScreeSlider, setToggleFullScreenSlider] = useState(false)

  const onOpenFullScreenSlider = (index: number) => {
    setToggleFullScreenSlider(true)
    initialImage.current = index
  }

  const onCloseFullScreenSlider = () => {
    setToggleFullScreenSlider(false)
    initialImage.current = 0
  }

  const NestedChild = useMemo(() => {
    const childrenCount = React.Children.count(children)

    //if childrenCount > 1, assume list of thumbnail images are shown
    if (childrenCount > 1) {
      return React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          onClick: () => onOpenFullScreenSlider(index),
          style: { cursor: 'pointer' },
        })
      })
    }

    //if childrenCount === 1, assume the child is a component such as slider or gallery grid, and the list of images are nested.
    return React.Children.map(children, (child) => {
      //In some situations the child could be a single JSX.Element containing an image, thus child.props.children is an object rather than array
      if (images.length === 1) {
        return React.cloneElement(child, {
          style: { cursor: 'pointer' },
          onClick: () => onOpenFullScreenSlider(0),
        })
      }

      const modifiedNestedChild = child.props.children.map((elem: JSX.Element, index: number) => {
        return React.cloneElement(elem, {
          onClick: () => onOpenFullScreenSlider(index),
        })
      })

      return React.cloneElement(child, { style: { cursor: 'pointer' } }, modifiedNestedChild)
    })
  }, [])

  return (
    <>
      {NestedChild}
      {toggleFullScreeSlider && (
        <FullScreenImageSlider
          sliderImages={images}
          onOpen={toggleFullScreeSlider}
          onClose={onCloseFullScreenSlider}
          initialImage={initialImage}
        />
      )}
    </>
  )
}
