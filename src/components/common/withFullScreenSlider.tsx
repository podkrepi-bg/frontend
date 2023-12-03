import React, { useRef, useState } from 'react'
import { FullScreenImageSlider } from './CampaignImageSlider'
import { ImageProps } from 'next/image'
import { ImageSlider } from 'components/common/campaign-file/roles'

type ChildComponentProps = ImageProps & {
  images: ImageSlider[]
  index: number
}

/**
 * HOC which expands an Image whenever user clicks it
 * @param WrappedComponent Next's `Image` component
 * @param images: An array of returned Images
 * @param index: Index of the clicked image
 * @returns
 */
export default function withFullScreenSlider(WrappedComponent: React.ComponentType<ImageProps>) {
  const [toggleFullScreeSlider, setToggleFullScreenSlider] = useState(false)
  const initialImage = useRef<number>(0)

  const onOpenFullScreenSlider = (index: number) => {
    setToggleFullScreenSlider(true)
    initialImage.current = index
  }

  const onCloseFullScreenSlider = () => {
    setToggleFullScreenSlider(false)
    initialImage.current = 0
  }

  return (props: ChildComponentProps) => (
    <>
      <WrappedComponent
        {...props}
        onClick={() => onOpenFullScreenSlider(props.index)}
        style={{ ...props.style, cursor: 'pointer' }}
      />
      {toggleFullScreeSlider && props.index === props.images.length - 1 && (
        <FullScreenImageSlider
          sliderImages={props.images}
          onOpen={toggleFullScreeSlider}
          onClose={onCloseFullScreenSlider}
          initialImage={initialImage}
        />
      )}
    </>
  )
}
