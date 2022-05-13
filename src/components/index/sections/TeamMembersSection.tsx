import { Box, Container, Grid, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import theme from 'common/theme'
import { staticUrls } from 'common/routes'
import Heading from 'components/common/Heading'
import LinkButton from 'components/common/LinkButton'

import MemberCard from '../helpers/teamMembers/MemberCard'
import { data } from '../helpers/teamMembers/memberData'

export default function TeamMembersSection() {
  return (
    <Container maxWidth="md">
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
      <Grid container justifyContent="center" spacing={6} sx={{ pt: 7, pb: 12 }}>
        {data.map((member, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4} paddingBottom={theme.spacing(7)}>
            <Box textAlign="center">
              <MemberCard info={member} />
            </Box>
          </Grid>
        ))}
        <LinkButton
          href={staticUrls.blog}
          variant="outlined"
          endIcon={<ChevronRightIcon />}
          sx={{ marginTop: '2rem' }}>
          {'Запознай се с екипа ни'}
        </LinkButton>
      </Grid>
    </Container>
  )
}
