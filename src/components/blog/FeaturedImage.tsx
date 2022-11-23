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
  objectFit?: 'cover' | 'contain'
  showPlaceholder?: boolean
} & Omit<ImageProps, 'src' | 'height'>
export default function FeaturedImage({
  src,
  height,
  objectFit = 'contain',
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
      <Image
        fill
        sizes="100vw"
        style={{ objectFit, objectPosition: 'center top' }}
        src={src}
        {...props}
      />
    </ImageWrapper>
  )
}

const ImageWrapper = ({ height, children }: PropsWithChildren<{ height: string }>) => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      height,
      borderRadius: 4,
      overflow: 'hidden',
    }}>
    {children}
  </Box>
)
