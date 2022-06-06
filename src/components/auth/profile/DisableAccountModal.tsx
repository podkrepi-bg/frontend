import { Modal, Box, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Person, UpdatePerson } from 'gql/person'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors } from 'service/apiErrors'
import { disableCurrentPerson } from 'common/util/useCurrentPerson'
import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'next-i18next'
import { signOut } from 'next-auth/react'
import { baseUrl, routes } from 'common/routes'
import Link from 'components/common/Link'

const PREFIX = 'DisableUserModal'

const classes = {
  modal: `${PREFIX}-modal`,
  close: `${PREFIX}-close`,
  heading: `${PREFIX}-heading`,
  graySpan: `${PREFIX}-graySpan`,
  h5: `${PREFIX}-h5`,
  h3: `${PREFIX}-h3`,
}

const StyledModal = styled(Modal)(({ theme }) => ({
  [`& .${classes.modal}`]: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    backgroundColor: '#EEEEEE',
    padding: 20,
  },
  [`& .${classes.close}`]: {
    position: 'absolute',
    right: '10px',
  },
  [`& .${classes.heading}`]: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '123.5%',
    letterSpacing: '0.25px',
    color: '#000000',
    paddingLeft: theme.spacing(3),
  },

  [`& .${classes.graySpan}`]: {
    fontFamily: 'Lato, sans-serif',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '133.4%',
    color: '#909090',
  },
}))

const callbackUrl = `${baseUrl}${routes.index}`

function DisableAccountModal({
  isOpen,
  handleClose,
  person,
}: {
  isOpen: boolean
  handleClose: (data?: Person) => void
  person: UpdatePerson
}) {
  const { t } = useTranslation()

  const mutation = useMutation<AxiosResponse<Person>, AxiosError<ApiErrors>, UpdatePerson>({
    mutationFn: disableCurrentPerson(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.success'), 'success'),
  })

  const handleDisableUser = async () => {
    try {
      await signOut({ callbackUrl })
      const data = await mutation.mutateAsync({ ...person })
      handleClose(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <StyledModal
      open={isOpen}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 4,
          backgroundColor: '#EEEEEE',
          p: 4,
        }}>
        <Typography variant="h6" component="h3">
          Изтриване на акаунт
        </Typography>
        <Typography className={classes.graySpan}>Съжаляваме, че ни напускате!</Typography>
        <Typography className={classes.graySpan}>Преди да ни напуснете ...</Typography>
        <hr />
        <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li className={classes.graySpan}>
            Ако ви е омръзнало да получавате имейли, деактивирайте ги
            <Link href="#"> тук</Link>.
          </li>
          <li className={classes.graySpan}>
            Ако .........................., моля пишете <Link href="#">тук</Link>.
          </li>
          <li className={classes.graySpan}>Изтриването на акаунт е необратимо.</li>
          <li className={classes.graySpan}>Ще бъде невъзможно да възстановите акаунта си.</li>
        </ul>
        <Button variant="contained" size="large" color="secondary" onClick={() => handleClose()}>
          Запази моя акаунт
        </Button>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          style={{ marginLeft: '10px' }}
          onClick={() => handleDisableUser()}>
          Изтрий моя акаунт
        </Button>
      </Box>
    </StyledModal>
  )
}

export default DisableAccountModal
