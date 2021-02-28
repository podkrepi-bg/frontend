import Link from 'next/link'
import { createStyles, makeStyles, Grid, Container } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import PodkrepiLogo from 'components/brand/PodkrepiLogo'
import { routes } from 'common/routes'

import { Instagram } from '@material-ui/icons'
import { Facebook } from '@material-ui/icons'
import { Twitter } from '@material-ui/icons'
import { LinkedIn } from '@material-ui/icons'
import { YouTube } from '@material-ui/icons'

const useStyles = makeStyles((theme) =>
  createStyles({
    footer: {
      position: 'absolute',
      left: 0,
      right: 0,
      paddingTop: theme.spacing(11),
      paddingBottom: theme.spacing(7),
      backgroundColor: theme.palette.primary.dark,
    },
    footer__left: {
      display: 'flex',
      flexDirection: 'column',
    },
    footer__logo: {
      width: '70%',
    },
    footer__socialContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: '10px 0',
    },
    footer__socialLink: {
      color: theme.palette.primary.main,
      marginRight: '5px',
      cursor: 'pointer',
    },
    footer__copyrights: {
      fontSize: '16px',
      color: theme.palette.primary.main,
    },
    footer__link: {
      fontSize: '18px',
      padding: theme.spacing(0.5, 0, 0.5, 0),
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
      href: 'footerLinks.aboutUs',
      external: true,
    },
    {
      label: 'footerLabels.aboutProject',
      href: 'footerLinks.aboutProject',
      external: true,
    },
  ],
  [
    {
      label: 'footerLabels.contact',
      href: 'footerLinks.contact',
      external: true,
    },
    {
      label: 'footerLabels.support',
      href: 'footerLinks.support',
      external: true,
    },
    {
      label: 'footerLabels.terms',
      href: 'footerLinks.terms',
      external: true,
    },
  ],
  [
    {
      label: 'footerLabels.gdpr',
      href: 'footerLinks.gdpr',
      external: true,
    },
  ],
]

const socialLinks = {
  facebook: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  twitter: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  linkdin: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  instagram: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
}

export default function Footer() {
  const { t } = useTranslation()
  console.log(t(footerItems[0][0].label))

  const { locale } = useRouter()
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Container>
        <div>
          <Grid container>
            <Grid item xs={6}>
              <div className={classes.footer__left}>
                <Link href={routes.index}>
                  <a className={classes.footer__logo}>
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
                  <Link href={socialLinks.linkdin}>
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
              </div>
            </Grid>
            {footerItems.map((subarr, i) => (
              <Grid key={Math.random() * i} item xs={2}>
                <ul>
                  {subarr.map(({ label, href, external }, j) => (
                    <li key={Math.random() * j} className={classes.footer__link}>
                      <Link href={t(href)}>
                        <a
                          target={external ? '_blank' : ''}
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
        </div>
      </Container>
    </footer>
  )
}
