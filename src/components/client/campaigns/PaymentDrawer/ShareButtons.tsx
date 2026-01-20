import React, { useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, IconButton, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  FacebookOutlined,
  Email,
  Link as LinkIcon,
  Twitter,
  LinkedIn,
  WhatsApp,
} from '@mui/icons-material'

import { AlertStore } from 'stores/AlertStore'
import { useCopyToClipboard } from 'common/util/useCopyToClipboard'
import { ShareButtonsProps, SharePlatform, ShareOption } from './types'

/**
 * Share Buttons Component
 *
 * Provides social sharing functionality for campaigns.
 * From issue #2027:
 * - Facebook: Opens share dialog with campaign name and link
 * - Link: Copies URL to clipboard
 * - Email: Generates email with campaign as subject line
 *
 * Reference: https://developers.facebook.com/docs/plugins/share-button/#example
 */

const PREFIX = 'ShareButtons'

const classes = {
  container: `${PREFIX}-container`,
  button: `${PREFIX}-button`,
}

const StyledContainer = styled(Box)(({ theme }) => ({
  [`&.${classes.container}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },

  [`& .${classes.button}`]: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.primary.dark,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
    transition: 'all 0.2s ease-in-out',
  },
}))

const defaultPlatforms: SharePlatform[] = ['facebook', 'link', 'email']

const platformIcons: Record<SharePlatform, React.ElementType> = {
  facebook: FacebookOutlined,
  email: Email,
  link: LinkIcon,
  twitter: Twitter,
  linkedin: LinkedIn,
  whatsapp: WhatsApp,
}

export default function ShareButtons({
  campaignUrl,
  campaignTitle,
  campaignDescription = '',
  platforms = defaultPlatforms,
  onShare,
}: ShareButtonsProps) {
  const { t } = useTranslation('common')
  const [, copyToClipboard] = useCopyToClipboard(1000)

  const shareFacebook = useCallback(() => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      campaignUrl,
    )}&quote=${encodeURIComponent(campaignTitle)}`
    window.open(shareUrl, 'facebook-share-dialog', 'width=626,height=436')
    onShare?.('facebook')
  }, [campaignUrl, campaignTitle, onShare])

  const shareTwitter = useCallback(() => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      campaignUrl,
    )}&text=${encodeURIComponent(campaignTitle)}`
    window.open(shareUrl, 'twitter-share-dialog', 'width=626,height=436')
    onShare?.('twitter')
  }, [campaignUrl, campaignTitle, onShare])

  const shareLinkedIn = useCallback(() => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      campaignUrl,
    )}`
    window.open(shareUrl, 'linkedin-share-dialog', 'width=626,height=436')
    onShare?.('linkedin')
  }, [campaignUrl, onShare])

  const shareWhatsApp = useCallback(() => {
    const shareUrl = `https://api.whatsapp.com/send/?text=${encodeURIComponent(
      `${campaignTitle} - ${campaignUrl}`,
    )}`
    window.open(shareUrl, '_blank')
    onShare?.('whatsapp')
  }, [campaignUrl, campaignTitle, onShare])

  const copyLink = useCallback(async () => {
    try {
      await copyToClipboard(campaignUrl)
      AlertStore.show(t('alerts.link-copied'), 'success')
      onShare?.('link')
    } catch (err) {
      AlertStore.show(t('alerts.copy-failed'), 'error')
    }
  }, [campaignUrl, copyToClipboard, t, onShare])

  const shareEmail = useCallback(() => {
    const subject = encodeURIComponent(campaignTitle)
    const body = encodeURIComponent(
      `${t('share.check-out-campaign', {
        defaultValue: 'Check out this campaign',
      })}:\n\n${campaignTitle}\n\n${
        campaignDescription ? campaignDescription + '\n\n' : ''
      }${campaignUrl}`,
    )
    window.location.href = `mailto:?subject=${subject}&body=${body}`
    onShare?.('email')
  }, [campaignTitle, campaignDescription, campaignUrl, t, onShare])

  const shareOptions: ShareOption[] = platforms.map((platform) => {
    const actions: Record<SharePlatform, () => void> = {
      facebook: shareFacebook,
      twitter: shareTwitter,
      linkedin: shareLinkedIn,
      whatsapp: shareWhatsApp,
      link: copyLink,
      email: shareEmail,
    }

    const labels: Record<SharePlatform, string> = {
      facebook: t('share.facebook', { defaultValue: 'Share on Facebook' }),
      twitter: t('share.twitter', { defaultValue: 'Share on Twitter' }),
      linkedin: t('share.linkedin', { defaultValue: 'Share on LinkedIn' }),
      whatsapp: t('share.whatsapp', { defaultValue: 'Share on WhatsApp' }),
      link: t('share.copy-link', { defaultValue: 'Copy link' }),
      email: t('share.email', { defaultValue: 'Share via email' }),
    }

    return {
      platform,
      label: labels[platform],
      icon: platformIcons[platform],
      action: actions[platform],
    }
  })

  return (
    <StyledContainer className={classes.container}>
      {shareOptions.map(({ platform, label, icon: Icon, action }) => (
        <Tooltip key={platform} title={label} arrow>
          <IconButton
            className={classes.button}
            onClick={action}
            aria-label={label}
            size="small"
            data-testid={`share-${platform}`}>
            <Icon fontSize="small" />
          </IconButton>
        </Tooltip>
      ))}
    </StyledContainer>
  )
}
