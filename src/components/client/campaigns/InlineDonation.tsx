import { useState } from 'react'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { CampaignResponse } from 'gql/campaigns'

import { Button, CircularProgress, Grid, IconButton, Menu, Typography } from '@mui/material'
import { AddLinkOutlined, Favorite } from '@mui/icons-material'
import { lighten } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
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
import CustomListItem from 'components/common/navigation/CustomListItem'
import { socialMedia } from './helpers/socialMedia'
import { CampaignState } from './helpers/campaign.enums'
import { AlertStore } from 'stores/AlertStore'

const PREFIX = 'InlineDonation'

const classes = {
  inlineDonationWrapper: `${PREFIX}-inlineDonationWrapper`,
  reachedAndTargetMoneyWrapper: `${PREFIX}-reachedAndTargetMoneyWrapper`,
  reachedAndTargetMoney: `${PREFIX}-reachedAndTargetMoney`,
  donorsSharesCount: `${PREFIX}-donorsSharesCount`,
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
    padding: theme.spacing(0, 1.75),
  },

  [`& .${classes.reachedAndTargetMoney}`]: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.common.black,
  },

  [`& .${classes.donorsSharesCount}`]: {
    textTransform: 'capitalize',
    margin: theme.spacing(1.7, 0),
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.common.black,
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
    marginTop: `-${theme.spacing(0.25)}`,
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
  const [status, copyUrl] = useCopyToClipboard(baseUrl + asPath, 1000)
  const active = status === 'copied' ? 'inherit' : 'primary'
  const [page, setPage] = useState<number>(0)
  const pageSize = 5

  const {
    id: campaignId,
    targetAmount: target,
    summary,
    currency,
    allowDonationOnComplete,
    state: campaignState,
    slug: campaignSlug,
  } = campaign

  const reached = summary?.reachedAmount ?? 0
  const donors = summary?.donors ?? 0
  const {
    data: { items: donations, total: all_rows } = { items: [] },
    error: donationHistoryError,
    isLoading: isDonationHistoryLoading,
  } = useCampaignDonationHistory(campaignId, page, pageSize)
  const { mobile } = useMobile()
  const [isOpen, setIsOpen] = useState(false)
  const rowCount = page * pageSize + donations.length
  const detailsShown = isOpen || !mobile

  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleClose = () => setAnchorEl(null)

  return (
    <StyledGrid item xs={12} p={3} className={classes.inlineDonationWrapper}>
      {/* //TODO */}
      {/* <Grid className={classes.campaignInfoWrapper}>
         <Grid>
          <Typography className={classes.campaignInfoKey}>{t('campaign.documents')}:</Typography>
          <Typography className={classes.campaignInfoKey}>{t('campaign.guarantor')}:</Typography>
          <Typography className={classes.campaignInfoKey}>{t('campaign.others')}:</Typography>
        </Grid>
        <Grid>
          <ExternalLink href={''}>
            <Typography className={classes.campaignInfoValue}>documents</Typography>
          </ExternalLink>
          <ExternalLink href={''}>
            <Typography className={classes.campaignInfoValue}>guarant</Typography>
          </ExternalLink>
          <ExternalLink href={''}>
            <Typography className={classes.campaignInfoValue}>others</Typography>
          </ExternalLink>
        </Grid>
      </Grid> */}
      <Grid className={classes.reachedAndTargetMoneyWrapper}>
        <Typography component="span" className={classes.reachedAndTargetMoney}>
          {moneyPublic(reached, currency)}
        </Typography>
        <Typography component="span" className={classes.reachedAndTargetMoney}>
          {moneyPublic(target, currency)}
        </Typography>
      </Grid>
      <Grid>
        <CampaignProgress campaignId={campaignId} raised={reached} target={target} />
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
              copyUrl()
            }}
            color={active}
          />
        </Menu>
        <Grid item xs={12} mt={2}>
          <LinkButton
            fullWidth
            href={routes.campaigns.oneTimeDonation(campaignSlug)}
            disabled={campaignState === CampaignState.complete && !allowDonationOnComplete}
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
            <Typography className={classes.donorsSharesCount}>
              {t('campaign.donors')}: {donors}
            </Typography>
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
