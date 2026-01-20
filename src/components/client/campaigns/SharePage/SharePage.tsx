import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Box, Typography, Button, IconButton, Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Facebook, LinkedIn, Instagram, Email, ContentCopy, ArrowBack } from '@mui/icons-material'

import { routes, baseUrl } from 'common/routes'
import { useCopyToClipboard } from 'common/util/useCopyToClipboard'
import { AlertStore } from 'stores/AlertStore'
import { CampaignResponse } from 'gql/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'

// =============================================================================
// DESIGN TOKENS
// =============================================================================

const colors = {
  white: '#FFFFFF',
  black: '#000000',
  darkBlue: '#294E85',
  yellow: '#FFCB57',
  yellowHover: '#FFCA28',
  greyBackground: '#F5F5F5',
  greyBorder: '#E0E0E0',
}

const typography = {
  fontPrimary: 'Montserrat, sans-serif',
}

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

const PREFIX = 'SharePage'

const classes = {
  container: `${PREFIX}-container`,
  content: `${PREFIX}-content`,
  backButton: `${PREFIX}-backButton`,
  avatar: `${PREFIX}-avatar`,
  title: `${PREFIX}-title`,
  socialIcons: `${PREFIX}-socialIcons`,
  socialButton: `${PREFIX}-socialButton`,
  actionButton: `${PREFIX}-actionButton`,
  actionButtonYellow: `${PREFIX}-actionButtonYellow`,
}

const StyledContainer = styled(Box)(({ theme }) => ({
  [`&.${classes.container}`]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: colors.white,
    padding: theme.spacing(3),
    position: 'relative',
  },

  [`& .${classes.content}`]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
    gap: theme.spacing(3),
  },

  [`& .${classes.backButton}`]: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    color: colors.darkBlue,
  },

  [`& .${classes.avatar}`]: {
    width: 160,
    height: 160,
    border: `4px solid ${colors.white}`,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
  },

  [`& .${classes.title}`]: {
    fontFamily: typography.fontPrimary,
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 1.4,
    textAlign: 'center',
    color: colors.black,
    marginTop: theme.spacing(2),
  },

  [`& .${classes.socialIcons}`]: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(3),
    marginTop: theme.spacing(2),
  },

  [`& .${classes.socialButton}`]: {
    width: 56,
    height: 56,
    backgroundColor: colors.darkBlue,
    color: colors.white,
    '&:hover': {
      backgroundColor: '#1a3a6a',
    },
    '& svg': {
      fontSize: 28,
    },
  },

  [`& .${classes.actionButton}`]: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.greyBackground,
    border: `1px solid ${colors.greyBorder}`,
    color: colors.black,
    fontFamily: typography.fontPrimary,
    fontWeight: 500,
    fontSize: 16,
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#EBEBEB',
    },
  },

  [`& .${classes.actionButtonYellow}`]: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.yellow,
    border: 'none',
    color: colors.black,
    fontFamily: typography.fontPrimary,
    fontWeight: 500,
    fontSize: 16,
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
    '&:hover': {
      backgroundColor: colors.yellowHover,
    },
  },
}))

// =============================================================================
// COMPONENT
// =============================================================================

interface SharePageProps {
  campaign: CampaignResponse
}

export default function SharePage({ campaign }: SharePageProps) {
  const { t } = useTranslation('campaigns')
  const router = useRouter()
  const [, copyToClipboard] = useCopyToClipboard(1000)

  const campaignUrl = `${baseUrl}${routes.campaigns.viewCampaignBySlug(campaign.slug)}`
  const campaignImageUrl = campaignListPictureUrl(campaign)

  const handleBack = useCallback(() => {
    router.back()
  }, [router])

  const shareFacebook = useCallback(() => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      campaignUrl,
    )}&quote=${encodeURIComponent(campaign.title)}`
    window.open(shareUrl, 'facebook-share-dialog', 'width=626,height=436')
  }, [campaignUrl, campaign.title])

  const shareLinkedIn = useCallback(() => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      campaignUrl,
    )}`
    window.open(shareUrl, 'linkedin-share-dialog', 'width=626,height=436')
  }, [campaignUrl])

  const shareInstagram = useCallback(() => {
    // Instagram doesn't have a direct share URL, so we copy the link and show a message
    copyToClipboard(campaignUrl)
    AlertStore.show(
      t('share.instagram-copy-message', {
        defaultValue: 'Link copied! Paste it in your Instagram story or post.',
      }),
      'info',
    )
  }, [campaignUrl, copyToClipboard, t])

  const shareEmail = useCallback(() => {
    const subject = encodeURIComponent(campaign.title)
    const body = encodeURIComponent(
      `${t('share.check-out-campaign', {
        ns: 'common',
        defaultValue: 'Check out this campaign',
      })}:\n\n${campaign.title}\n\n${campaignUrl}`,
    )
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }, [campaign.title, campaignUrl, t])

  const copyLink = useCallback(async () => {
    try {
      await copyToClipboard(campaignUrl)
      AlertStore.show(
        t('alerts.link-copied', { ns: 'common', defaultValue: 'Link copied successfully!' }),
        'success',
      )
    } catch {
      AlertStore.show(
        t('alerts.copy-failed', { ns: 'common', defaultValue: 'Copy failed. Please try again.' }),
        'error',
      )
    }
  }, [campaignUrl, copyToClipboard, t])

  return (
    <StyledContainer className={classes.container}>
      <IconButton className={classes.backButton} onClick={handleBack} aria-label={t('back')}>
        <ArrowBack />
      </IconButton>

      <Box className={classes.content}>
        <Avatar src={campaignImageUrl} alt={campaign.title} className={classes.avatar} />

        <Typography className={classes.title}>
          {t('share.share-campaign-social', {
            defaultValue: 'Споделете кампанията в социалните мрежи',
          })}
        </Typography>

        <Box className={classes.socialIcons}>
          <IconButton
            className={classes.socialButton}
            onClick={shareFacebook}
            aria-label={t('share.facebook', { ns: 'common', defaultValue: 'Share on Facebook' })}>
            <Facebook />
          </IconButton>
          <IconButton
            className={classes.socialButton}
            onClick={shareLinkedIn}
            aria-label={t('share.linkedin', { ns: 'common', defaultValue: 'Share on LinkedIn' })}>
            <LinkedIn />
          </IconButton>
          <IconButton
            className={classes.socialButton}
            onClick={shareInstagram}
            aria-label={t('share.instagram', { defaultValue: 'Share on Instagram' })}>
            <Instagram />
          </IconButton>
        </Box>

        <Button className={classes.actionButtonYellow} onClick={shareEmail}>
          {t('share.send-email', { defaultValue: 'Изпратете като E-mail' })}
          <Email />
        </Button>

        <Button className={classes.actionButton} onClick={copyLink}>
          {t('share.copy-link', { defaultValue: 'Копиране на линка' })}
          <ContentCopy />
        </Button>
      </Box>
    </StyledContainer>
  )
}
