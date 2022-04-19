import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import theme from 'common/theme'
import Heading from 'components/common/Heading'
import MemberCard from '../helpers/teamMembers/MemberCard'
import { data } from '../helpers/teamMembers/memberData'

export default function TeamMembersSection() {
  const { t } = useTranslation()

  return (
    <>
      <Heading
        textAlign="center"
        variant="h4"
        component="h2"
        fontFamily="Montserrat"
        color={theme.palette.primary.dark}
        paddingTop={theme.spacing(10)}
        paddingBottom={theme.spacing(7)}>
        {'Кой стои зад Подкрепи.бг?'}
      </Heading>
      <Typography textAlign="center" fontFamily="Montserrat" fontSize={16}>
        Подкрепи.бг представлява общност от специалисти в областта на програмирането, правото,
        маркетинга, дизайна, медицината, финансите, социалното предприемачество и др. Обединени сме
        от целта да създадем устойчива и прозрачна платформа за дарения, която подкрепя каузи и хора
        в нужда, като заедно с това популяризира и връща доверието към дарителството в България.
      </Typography>
      <Grid container flexDirection="column">
        {data.map((x, index) => (
          <Box display="flex" alignItems="center" flexDirection="column" key={index}>
            <MemberCard info={x} />
          </Box>
        ))}
      </Grid>
    </>
  )
}
