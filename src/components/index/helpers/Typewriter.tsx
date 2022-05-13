import Typewriter from 'typewriter-effect'
import { useTranslation } from 'next-i18next'

import { Typography } from '@mui/material'

export default function Index() {
  const { i18n, t } = useTranslation()

  return (
    <Typography
      variant="h4"
      component="div"
      sx={{
        height: 21,
        fontWeight: 500,
        md: { height: 15 },
        lg: { height: 10 },
      }}>
      <Typewriter
        key={i18n.language}
        onInit={(typewriter) => {
          typewriter
            .typeString(t('index:jumbotron.maximum-transparency'))
            .pauseFor(1000)
            .deleteAll(20)
            .typeString(t('index:jumbotron.zero-commission'))
            .pauseFor(1000)
            .deleteAll(20)
            .typeString(t('index:jumbotron.eliminate-misuse'))
            .pauseFor(1000)
            .deleteAll(20)
            .typeString(t('index:jumbotron.improve-donation-culture'))
            .pauseFor(1000)
            .deleteAll(20)
            .typeString(t('index:jumbotron.open-source'))
            .pauseFor(1000)
            .deleteAll(20)
            .start()
        }}
        options={{ loop: true, delay: 70 }}
      />
    </Typography>
  )
}
