import { useState } from 'react'

import { i18n, useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { CampaignResponse } from 'gql/campaigns'

import {
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  Menu,
  Typography,
} from '@mui/material'
import { AddLinkOutlined, Favorite } from '@mui/icons-material'
import { lighten } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import { baseUrl, routes } from 'common/routes'
import { moneyPublic } from 'common/util/money'
import { useCampaignDonationHistory } from 'common/hooks/campaigns'

import theme from 'common/theme'
import { useCopyToClipboard } from 'common/util/useCopyToClipboard'
import useMobile from 'common/hooks/useMobile'
import LinkButton from '../../common/LinkButton'
import CampaignProgress from './CampaignProgress'
import DonorsAndDonations from './DonorsAndDonations'
import DonationWishesInline from './DonationWishesInline'

import CustomListItem from 'components/common/navigation/CustomListItem'
import { socialMedia } from './helpers/socialMedia'
import { CampaignState } from './helpers/campaign.enums'
import { AlertStore } from 'stores/AlertStore'
import { useDonationWishesList } from 'common/hooks/donationWish'

const PREFIX = 'InlineDonation'

const classes = {
  inlineDonationWrapper: `${PREFIX}-inlineDonationWrapper`,
  reachedAndTargetMoneyWrapper: `${PREFIX}-reachedAndTargetMoneyWrapper`,
  moneyUnit: `${PREFIX}-moneyUnit`,
  moneyFraction: `${PREFIX}-moneyFraction`,
  donorsWishesTabs: `${PREFIX}-donorsWishesTabs`,
  donorsWishesTab: `${PREFIX}-donorsWishesTab`,
  selected: `${PREFIX}-selected`,
  donationPriceList: `${PREFIX}-donationPriceList`,
  dropdownLinkButton: `${PREFIX}-dropdownLinkButton`,
  dropdownLinkText: `${PREFIX}-dropdownLinkText`,
  buttonContainer: `${PREFIX}-buttonContainer`,
  sharesContainer: `${PREFIX}-sharesContainer`,
  openButton: `${PREFIX}-openButton`,
  donateButton: `${PREFIX}-donateButton`,
  noCommissionInfo: `${PREFIX}-noCommissionInfo`,
  infoIcon: `${PREFIX}-infoIcon`,
  campaignInfoWrapper: `${PREFIX}-campaignInfoWrapper`,
  campaignInfoKey: `${PREFIX}-campaignInfoKey`,
  campaignInfoValue: `${PREFIX}-campaignInfoValue`,
  pagination: `${PREFIX}-pagination`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`&.${classes.inlineDonationWrapper}`]: {
    boxShadow: '2px 4px 5px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#EEEEEE',
    height: 'fit-content',
    borderRadius: 0,

    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(3),
    },

    [theme.breakpoints.up('md')]: {
      marginTop: 0,
      borderRadius: theme.spacing(2.25),
    },
  },

  [`& .${classes.reachedAndTargetMoneyWrapper}`]: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  [`& .${classes.moneyUnit}`]: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.common.black,
    fontWeight: 500,
  },

  [`& .${classes.moneyFraction}`]: {
    display: 'inline-flex',
    fontSize: theme.typography.pxToRem(11),
    color: theme.palette.common.black,
    verticalAlign: 'top',
    margin: theme.spacing(0.25, 0, 0, 0.25),
  },

  [`& .${classes.donorsWishesTabs}`]: {
    display: 'rowflex',
    flexDirection: 'row',
    width: '100%',
    border: '1px solid grey',
    borderRadius: '60px',
    margin: theme.spacing(1.7, 0),
  },

  [`& .${classes.donorsWishesTab}`]: {
    textTransform: 'capitalize',
    display: 'flex',
    justifyContent: 'center',
    width: '50%',
    fontSize: theme.typography.pxToRem(13),
    backgroundColor: 'transparant',
    paddingBottom: theme.spacing(0.2),
    borderRadius: '60px',
    cursor: 'pointer',
  },

  [`& .${classes.selected}`]: {
    backgroundColor: '#b1defe',
  },

  [`& .${classes.donationPriceList}`]: {
    display: 'contents',
    textAlignLast: 'center',
  },

  [`& .${classes.dropdownLinkButton}`]: {
    '&:hover': {
      backgroundColor: lighten(theme.palette.primary.main, 0.9),
    },
  },

  [`& .${classes.dropdownLinkText}`]: {
    color: theme.palette.primary.dark,
    width: '100%',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  [`& .${classes.buttonContainer}`]: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexWrap: 'nowrap',
      marginTop: theme.spacing(2),
    },
  },

  [`& .${classes.sharesContainer}`]: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  [`& .${classes.openButton}`]: {
    textAlign: 'center',
    marginBottom: `-${theme.spacing(7)}`,
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#EEEEEE',
    minWidth: theme.spacing(6.35),
    minHeight: theme.spacing(6.35),
    paddingBottom: 'unset',
    boxShadow: '1px 6px 5px rgb(0 0 0 / 25%)',
  },

  [`& .${classes.donateButton}`]: {
    boxShadow:
      '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px rgb(0 0 0 / 14%), 0px 1px 3px rgb(0 0 0 / 12%)',
    height: theme.spacing(5.125),
    fontSize: theme.typography.pxToRem(16),
    letterSpacing: theme.typography.pxToRem(0.4),
    backgroundColor: theme.palette.secondary.main,

    '& svg': {
      color: '#ab2f26',
    },

    '&:hover': {
      backgroundColor: '#0098e3',
    },
  },

  [`& .${classes.noCommissionInfo}`]: {
    display: 'flex',
    gap: theme.spacing(0.25),
    marginTop: theme.spacing(1.7),

    '& p': {
      fontSize: theme.typography.pxToRem(12),
      color: theme.palette.common.black,
    },
  },

  [`& .${classes.infoIcon}`]: {
    marginTop: `${theme.spacing(0.125)}`,
    marginRight: `${theme.spacing(0.25)}`,
    fontSize: theme.typography.pxToRem(16),
    color: '#6d6d6d',
  },

  [`& .${classes.campaignInfoWrapper}`]: {
    display: 'flex',
    gap: theme.spacing(1.7),
    marginBottom: theme.spacing(3.8),
  },

  [`& .${classes.campaignInfoKey}`]: {
    color: '#343434',
    fontWeight: 700,
    textTransform: 'capitalize',
    textAlign: 'end',
  },

  [`& .${classes.campaignInfoValue}`]: {
    color: '#707070',
    fontWeight: 400,
    textTransform: 'capitalize',

    '&:hover': {
      color: '#0098e3',
      textDecoration: 'underline',
    },
  },

  [`& .${classes.pagination}`]: {
    justifyContent: 'flex-end',

    '& svg': {
      margin: 0,
      padding: 0,
      fontSize: theme.typography.pxToRem(15),
    },
  },
}))

type Props = {
  campaign: CampaignResponse
}

export default function InlineDonation({ campaign }: Props) {
  const { t } = useTranslation('campaigns')
  const { asPath } = useRouter()
  const [status, copyUrl] = useCopyToClipboard(1000)
  const active = status === 'copied' ? 'inherit' : 'primary'
  const [page, setPage] = useState<number>(0)
  const { mobile } = useMobile()
  const pageSize = mobile ? 3 : 5
  const {
    id: campaignId,
    targetAmount: target,
    summary,
    allowDonationOnComplete,
    state: campaignState,
    slug: campaignSlug,
  } = campaign
  const reached = summary ? summary.reachedAmount + (summary.guaranteedAmount ?? 0) : 0
  const reachedAmount = moneyPublic(reached)
  const targetAmount = moneyPublic(campaign.targetAmount)

  // Split amounts into integer and decimal parts for styled display
  const getAmountParts = (formattedAmount: string) => {
    // For Bulgarian: "1234,56 евро" → ["1234", "56", "евро"]
    // For English: "1,234.56 EUR" → ["1,234", "56", "EUR"]
    const parts = formattedAmount.split(' ')
    const currency = parts[parts.length - 1] // Last part is currency
    const amountWithDecimals = parts.slice(0, -1).join(' ') // Everything before currency

    const decimalSeparator = i18n?.language === 'bg' ? ',' : '.'
    const [integerPart, decimalPart] = amountWithDecimals.split(decimalSeparator)

    return { integerPart, decimalPart: decimalPart || '00', currency }
  }

  const reachedParts = getAmountParts(reachedAmount)
  const targetParts = getAmountParts(targetAmount)

  const donors = summary?.donors ?? 0
  const {
    data: { items: donations, total: all_rows } = { items: [] },
    error: donationHistoryError,
    isLoading: isDonationHistoryLoading,
  } = useCampaignDonationHistory(campaignId, page, pageSize)
  const [isOpen, setIsOpen] = useState(false)
  const rowCount = page * pageSize + donations.length
  const detailsShown = isOpen || !mobile

  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleClose = () => setAnchorEl(null)

  const [selected, setSelected] = useState('donors')

  const donorsDisplay = (
    <>
      <DonorsAndDonations donations={donations} />
      {donations && donations.length !== 0 ? (
        <Grid container className={classes.pagination}>
          <Typography m={1}>{`${page * pageSize + 1}-${rowCount}  ${t(
            'campaigns:of',
          )}  ${all_rows}`}</Typography>
          <IconButton
            aria-label="back"
            disabled={page == 0}
            onClick={() => setPage((index) => index - 1)}>
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="next"
            disabled={rowCount == all_rows}
            onClick={() => setPage((index) => index + 1)}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Grid>
      ) : null}
    </>
  )

  const { data: wishList } = useDonationWishesList(
    campaignId,
    { pageIndex: 0, pageSize },
    { sortBy: 'createdAt', sortOrder: 'desc' },
    '',
  )

  const wishesDisplay = (
    <>
      {wishList && <DonationWishesInline wishList={wishList} />}
      {wishList?.totalCount !== 0 && (
        <Chip
          label={t('campaigns:cta.see-all')}
          deleteIcon={<ArrowForwardIcon />}
          onDelete={() => {
            return
          }}
          component="a"
          href="#wishes"
          clickable
          size="medium"
          sx={{
            border: `2px solid ${theme.palette.primary.dark}`,
            color: theme.palette.primary.dark,
            backgroundColor: '#EEEEEE',
            marginTop: theme.spacing(1.7),
            padding: '0 4px',
            '.MuiChip-label': {
              paddingRight: theme.spacing(1.7),
            },
            '.MuiChip-deleteIcon': {
              color: theme.palette.primary.dark,
              ':hover': {
                color: theme.palette.primary.dark,
              },
              fontSize: 'large',
            },
          }}
        />
      )}
    </>
  )

  return (
    <StyledGrid item xs={12} p={3} className={classes.inlineDonationWrapper}>
      <Grid className={classes.reachedAndTargetMoneyWrapper}>
        <Grid>
          <Typography component="span" className={classes.moneyUnit}>
            {reachedParts.integerPart}
          </Typography>
          <Typography component="span" className={classes.moneyFraction}>
            {reachedParts.decimalPart}
          </Typography>
          <Typography component="span"> {t('donations.eur')}</Typography>
        </Grid>
        <Grid>
          <Typography component="span" className={classes.moneyUnit}>
            {targetParts.integerPart}
          </Typography>
          <Typography component="span" className={classes.moneyFraction}>
            {targetParts.decimalPart}
          </Typography>
          <Typography component="span"> {t('donations.eur')}</Typography>
        </Grid>
      </Grid>
      <Grid pt={1}>
        <CampaignProgress state={campaignState} raised={reached} target={target} showPercentage />
      </Grid>
      <Grid container gap={2} className={classes.buttonContainer}>
        <Menu
          keepMounted
          id="share"
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
          {socialMedia(baseUrl + asPath).map(({ label, icon: Icon, url }) => (
            <CustomListItem
              key={label}
              icon={<Icon />}
              label={label}
              className={classes.dropdownLinkText}
              onClick={() => {
                window.open(url, '_blank')?.focus()
                return false
              }}
            />
          ))}
          <CustomListItem
            className={classes.dropdownLinkText}
            icon={<AddLinkOutlined />}
            label="Копирайте връзка към кампанията"
            onClick={() => {
              AlertStore.show(t('common:alerts.message-copy'), 'success')
              copyUrl(baseUrl + asPath)
            }}
            color={active}
          />
        </Menu>
        <Grid item xs={12} mt={2}>
          <LinkButton
            fullWidth
            href={routes.campaigns.oneTimeDonation(campaignSlug)}
            disabled={
              campaignState !== CampaignState.active &&
              !(campaignState === CampaignState.complete && allowDonationOnComplete)
            }
            variant="contained"
            endIcon={<Favorite />}
            className={classes.donateButton}>
            {t('cta.support')}
          </LinkButton>
        </Grid>
      </Grid>
      {detailsShown &&
        (donationHistoryError ? (
          'Error fetching donation history'
        ) : isDonationHistoryLoading ? (
          <CircularProgress sx={{ display: 'block', margin: `${theme.spacing(3)} auto` }} />
        ) : (
          <>
            <Grid className={classes.noCommissionInfo}>
              <InfoOutlinedIcon className={classes.infoIcon} />
              <Typography>{t('campaign.noCommissionInfo')}</Typography>
            </Grid>
            <FormControl className={classes.donorsWishesTabs}>
              <Typography
                className={[
                  classes.donorsWishesTab,
                  selected === 'donors' && classes.selected,
                ].join(' ')}
                data-testid="summary-donors"
                onClick={() => setSelected('donors')}>{`${t(
                'campaign.donors',
              )} (${donors})`}</Typography>
              <Typography
                className={[
                  classes.donorsWishesTab,
                  selected === 'wishes' && classes.selected,
                ].join(' ')}
                data-testid="summary-wishes"
                onClick={() => setSelected('wishes')}>{`${t('campaign.wishes')} (${
                wishList?.totalCount
              })`}</Typography>
            </FormControl>

            {selected === 'donors' ? donorsDisplay : wishesDisplay}
          </>
        ))}
      {mobile && (
        <Grid textAlign="center">
          <Button variant="text" onClick={() => setIsOpen(!isOpen)} className={classes.openButton}>
            {isOpen ? <ExpandLessIcon fontSize="large" /> : <ExpandMoreIcon fontSize="large" />}
          </Button>
        </Grid>
      )}
    </StyledGrid>
  )
}
