import BearCarousel, { TBearSlideItemDataList, BearSlideItem } from 'bear-react-carousel'
import { styled } from '@mui/material/styles'
import 'bear-react-carousel/dist/index.css'
const PREFIX = 'CampaignSlider'

const classes = {
  campaignSlider: `${PREFIX}-campaignSlider`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.campaignSlider}`]: {
    margin: theme.spacing(3, 0),

    '& .bear-react-carousel__pagination-group': {
      top: '100%',
    },
  },
}))

const slideSource = '/img/campaign-banner.png'

const images = [
  { id: 1, image: slideSource },
  { id: 2, image: slideSource },
  { id: 3, image: slideSource },
]

const bearSlideItemData: TBearSlideItemDataList = images.map((row) => {
  return {
    key: row.id,
    children: <BearSlideItem imageUrl={row.image} />,
  }
})

const CampaignSlider = () => {
  if (images.length === 0) {
    return null
  }

  return (
    <Root>
      {/* <BearCarousel
        data={bearSlideItemData}
        slidesPerView={1}
        isEnableLoop
        isEnableNavButton={images.length > 1 ? true : false}
        spaceBetween={15}
        autoPlayTime={5000}
        isEnableAutoPlay
        isEnablePagination
        aspectRatio={{ widthRatio: 16, heightRatio: 9 }}
        className={classes.campaignSlider}
        breakpoints={{
          600: {
            slidesPerView: 2,
          },
        }}
      /> */}
    </Root>
  )
}

export default CampaignSlider
