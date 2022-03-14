import BearCarousel, { TBearSlideItemDataList, BearSlideItem } from 'bear-react-carousel'
import 'bear-react-carousel/dist/index.css'
import { Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    campaignSlider: {
      margin: theme.spacing(3, 0),

      '& .bear-react-carousel__pagination-group': {
        top: '100%',
      },
    },
  }),
)

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
  const classes = useStyles()

  return images.length > 0 ? (
    <BearCarousel
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
    />
  ) : null
}

export default CampaignSlider
