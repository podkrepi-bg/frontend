import { useMemo, useState } from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'
import { baseUrl, routes } from 'common/routes'
import { money } from 'common/util/money'
import { useSinglePriceList } from 'common/hooks/donation'
import LinkButton from 'components/common/LinkButton'
import CampaignProgress from './CampaignProgress'
import DonorsAndDonations from './DonorsAndDonations'
import {
  Button,
  CircularProgress,
  Grid,
  lighten,
  List,
  ListItem,
  ListItemText,
  Menu,
  Typography,
} from '@mui/material'
import { AddLinkOutlined, Favorite } from '@mui/icons-material'
import ShareIcon from '@mui/icons-material/Share'
import { useCampaignDonationHistory } from 'common/hooks/campaigns'
import theme from 'common/theme'
import { useRouter } from 'next/router'
import CustomListItem from 'components/admin/navigation/CustomListItem'
import { socialMedia } from './helpers/socialMedia'
import { useCopyToClipboard } from 'common/util/useCopyToClipboard'
import { AlertStore } from 'stores/AlertStore'

const PREFIX = 'InlineDonation'

const classes = {
  inlineDonationWrapper: `${PREFIX}-inlineDonationWrapper`,
  reachedMoney: `${PREFIX}-reachedMoney`,
  targetMoney: `${PREFIX}-targetMoney`,
  donorsSharesCount: `${PREFIX}-donorsSharesCount`,
  donationPriceList: `${PREFIX}-donationPriceList`,
  dropdownLinkButton: `${PREFIX}-dropdownLinkButton`,
  dropdownLinkText: `${PREFIX}-dropdownLinkText`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`&.${classes.inlineDonationWrapper}`]: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(1),
    height: 'fit-content',
    boxShadow: '1px 2px 8px #8888888c',
  },

  [`& .${classes.reachedMoney}`]: {
    fontSize: theme.spacing(5),
    fontWeight: 500,
  },

  [`& .${classes.targetMoney}`]: {
    fontSize: theme.spacing(3),
  },

  [`& .${classes.donorsSharesCount}`]: {
    fontWeight: 'bold',
    fontSize: theme.spacing(2),
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
}))

type Props = {
  campaign: CampaignResponse
}

export default function InlineDonation({ campaign }: Props) {
  const { t } = useTranslation()
  const router = useRouter()
  const { asPath } = useRouter()
  const [showDonationPriceList, setDonationPriceList] = useState(false)
  const onClick = () => setDonationPriceList(true)
  const [status, copyUrl] = useCopyToClipboard(baseUrl + asPath, 1000)
  const active = status === 'copied' ? 'inherit' : 'primary'
  const target = campaign.targetAmount
  const summary = campaign.summary.find(() => true)
  const reached = summary?.reachedAmount ?? 0
  const donors = summary?.donors ?? 0
  const { data: prices } = useSinglePriceList()
  const {
    data: donations,
    error: donationHistoryError,
    isLoading: isDonationHistoryLoading,
  } = useCampaignDonationHistory(campaign.id)

  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const sortedPrices = useMemo(() => {
    if (!prices) return []
    return prices?.sort((a, b) => {
      if (a.unit_amount === null || b.unit_amount === null) return 0
      return a.unit_amount - b.unit_amount
    })
  }, [prices])

  return (
    <StyledGrid item xs={12} mt={5} p={3} className={classes.inlineDonationWrapper}>
      <Grid mb={2}>
        <Typography component="span" className={classes.reachedMoney}>
          {money(reached)}
        </Typography>{' '}
        {t('campaigns:campaign.from')}{' '}
        <Typography component="span" className={classes.targetMoney}>
          {money(target)}
        </Typography>
      </Grid>
      <CampaignProgress raised={reached} target={target} />
      <Grid display="inline-block" m={3} ml={0}>
        <Typography className={classes.donorsSharesCount}>{donors}</Typography>
        <Typography>{t('campaigns:campaign.donors')}</Typography>
      </Grid>
      <Grid display="inline-block" m={3} ml={0}>
        <Typography className={classes.donorsSharesCount}>{0}</Typography>
        <Typography>{t('campaigns:campaign.shares')}</Typography>
      </Grid>
      <Grid container gap={2}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<ShareIcon />}
          color="secondary"
          onClickCapture={handleMenu}>
          {t('campaigns:cta.share')}
        </Button>
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
        <LinkButton
          fullWidth
          href="#"
          onClick={onClick}
          variant="contained"
          color="secondary"
          startIcon={<Favorite color="action" />}>
          {t('common:support')}
        </LinkButton>
        {showDonationPriceList && (
          <List className={classes.donationPriceList}>
            {sortedPrices.map((price, index) => {
              if (!price) return null
              return (
                <ListItem button key={index}>
                  <ListItemText
                    onClick={() =>
                      router.push({
                        pathname: routes.campaigns.oneTimeDonation(campaign.slug),
                        query: {
                          price: price.id,
                        },
                      })
                    }
                    primary={`${(price.unit_amount ?? 100) / 100} лв.`}
                    secondary={price.metadata.title}
                  />
                </ListItem>
              )
            })}
          </List>
        )}
      </Grid>
      {donationHistoryError ? (
        'Error fetching donation history'
      ) : isDonationHistoryLoading ? (
        <CircularProgress sx={{ display: 'block', margin: `${theme.spacing(3)} auto` }} />
      ) : (
        <DonorsAndDonations donations={donations} />
      )}
      {/* <pre>{JSON.stringify(prices, null, 2)}</pre> */}
    </StyledGrid>
  )
}
