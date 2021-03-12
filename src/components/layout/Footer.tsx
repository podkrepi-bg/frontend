import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { Grid, Container, createStyles, makeStyles } from '@material-ui/core'
import { Instagram, Facebook, Twitter, LinkedIn, YouTube } from '@material-ui/icons'

import PodkrepiLogo from 'components/brand/PodkrepiLogo'
import { routes } from 'common/routes'

const useStyles = makeStyles((theme) =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.main,
      padding: theme.spacing(3),
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left',
        padding: theme.spacing(5),
      },
      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(7, 15),
      },
    },
    footer__right: {
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    footer__socialContainer: {
      padding: theme.spacing(1, 0),
    },
    footer__socialLink: {
      color: theme.palette.primary.main,
      marginRight: theme.spacing(1),
    },
    footer__copyrights: {
      fontSize: theme.typography.pxToRem(16),
      color: theme.palette.primary.main,
    },
    footer__link: {
      fontSize: theme.typography.pxToRem(16),
      padding: theme.spacing(0.5, 0),
    },
    footer__link__inner: {
      color: theme.palette.primary.main,
    },
  }),
)

const footerItems = [
  [
    {
      label: 'footerLabels.aboutUs',
      href: routes.about,
      external: false,
    },
    {
      label: 'footerLabels.aboutProject',
      href: routes.aboutProject,
      external: false,
    },
  ],
  [
    {
      label: 'footerLabels.contact',
      href: routes.contact,
      external: false,
    },
    {
      label: 'footerLabels.support',
      href: routes.support,
      external: false,
    },
    {
      label: 'footerLabels.terms',
      // terms route is not implemented yet
      // href: routes.terms,
      external: false,
    },
  ],
  [
    {
      label: 'footerLabels.confidentiality',
      // confidentiality route is not implemented yet
      // href: routes.gdpr,
      external: false,
    },
    {
      label: 'footerLabels.gdpr',
      // gdpr route is not implemented yet
      // href: routes.gdpr,
      external: false,
    },
  ],
]

const socialLinks = {
  facebook: '',
  twitter: '',
  linkedin: '',
  youtube: '',
  instagram: '',
}

export default function Footer() {
  const { t } = useTranslation()
  const classes = useStyles()
  const { locale } = useRouter()

  return (
    <Container component="footer" maxWidth="xl" disableGutters>
      <Grid container className={classes.footer}>
        <Grid item xs={12} sm={8} md={6}>
          <Link href={routes.index}>
            <a>
              <PodkrepiLogo locale={locale} size="large" variant="fixed" />
            </a>
          </Link>
          <div className={classes.footer__socialContainer}>
            <Link href={socialLinks.facebook}>
              <a target="_blank">
                <Facebook className={classes.footer__socialLink} />
              </a>
            </Link>
            <Link href={socialLinks.twitter}>
              <a target="_blank">
                <Twitter className={classes.footer__socialLink} />
              </a>
            </Link>
            <Link href={socialLinks.linkedin}>
              <a target="_blank">
                <LinkedIn className={classes.footer__socialLink} />
              </a>
            </Link>
            <Link href={socialLinks.youtube}>
              <a target="_blank">
                <YouTube className={classes.footer__socialLink} />
              </a>
            </Link>
            <Link href={socialLinks.instagram}>
              <a target="_blank">
                <Instagram className={classes.footer__socialLink} />
              </a>
            </Link>
          </div>
          <span className={classes.footer__copyrights}>{t('footerCopyrights')}</span>
        </Grid>
        <Grid item xs={12} sm={4} md={6} className={classes.footer__right}>
          {footerItems.map((subarr, i) => (
            <Grid key={Math.random() * i} item xs={12} md={4}>
              <ul>
                {subarr.map(({ label, href, external }, j) => (
                  <li key={`${i}-${j}`} className={classes.footer__link}>
                    <Link href={`${href}`}>
                      <a
                        target={external ? '_blank' : ''}
                        rel="noreferrer"
                        className={classes.footer__link__inner}>
                        {t(label)}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}
