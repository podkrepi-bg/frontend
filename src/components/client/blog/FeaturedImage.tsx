import { Box } from '@mui/material'
import Image, { ImageProps } from 'next/image'
import { PropsWithChildren } from 'react'

const defaultImage = {
  src: '/img/family.jpg',
  objectPosition: '-820px center',
}

type Props = {
  height: string
  src?: string | null
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  objectPosition?: string
  showPlaceholder?: boolean
} & Omit<ImageProps, 'src' | 'height'>
export default function FeaturedImage({
  src,
  height,
  objectFit = 'contain',
  objectPosition = 'center center',
  showPlaceholder = false,
  ...props
}: Props) {
  if (!src) {
    if (!showPlaceholder) return null
    return (
      <ImageWrapper height={height}>
        <Image
          fill
          sizes="100vw"
          style={{ objectFit, objectPosition: defaultImage.objectPosition }}
          src={defaultImage.src}
          {...props}
        />
      </ImageWrapper>
    )
  }
  return (
    <ImageWrapper height={height}>
      <Image fill sizes="100vw" style={{ objectFit, objectPosition }} src={src} {...props} />
    </ImageWrapper>
  )
}

const ImageWrapper = ({ height, children }: PropsWithChildren<{ height: string }>) => (
  <Box
    sx={{
      height,
      width: '100%',
      borderRadius: 2,
      overflow: 'hidden',
      position: 'relative',
    }}>
    {children}
  </Box>
)
