import BearCarousel, { TBearSlideItemDataList, BearSlideItem } from 'bear-react-carousel'
import 'bear-react-carousel/dist/index.css'

const images = [
  { id: 1, image: 'https://dummyimage.com/900x400/dee2e6/6c757d.jpg' },
  { id: 2, image: 'https://dummyimage.com/900x400/dee2e6/6c757d.jpg' },
  { id: 3, image: 'https://dummyimage.com/900x400/dee2e6/6c757d.jpg' },
]

const bearSlideItemData: TBearSlideItemDataList = images.map((row) => {
  return {
    key: row.id,
    children: <BearSlideItem imageUrl={row.image} />,
  }
})

const CampaignSlider = () => {
  return (
    <BearCarousel
      data={bearSlideItemData}
      slidesPerView={2}
      isEnableLoop
      isEnableNavButton
      aspectRatio={{ widthRatio: 16, heightRatio: 9 }}
    />
  )
}

export default CampaignSlider
