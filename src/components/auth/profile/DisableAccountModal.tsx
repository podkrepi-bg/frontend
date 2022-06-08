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
  graySpan: `${PREFIX}-graySpan`,
  button: `${PREFIX}-button`,
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
    p: 4,
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
  },
  [`& .${classes.graySpan}`]: {
    fontFamily: 'Lato, sans-serif',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '133.4%',
    color: '#909090',
  },
  [`& .${classes.button}`]: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    },
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
      <Box className={classes.modal}>
        <Typography variant="h6" component="h3">
          {t('profile:disableModal.index')}
        </Typography>
        <Typography className={classes.graySpan}>{t('profile:disableModal.sorryMsg')}</Typography>
        <Typography className={classes.graySpan}>
          {t('profile:disableModal.beforeDisableMsg')}
        </Typography>
        <hr />
        <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li className={classes.graySpan}>
            {t('profile:disableModal.deactivateEmails')}
            <Link href="#">{t('profile:disableModal.link')}</Link>.
          </li>
          <li className={classes.graySpan}>
            {t('profile:disableModal.writeUs')}
            <Link href="#">{t('profile:disableModal.link')}</Link>.
          </li>
          <li className={classes.graySpan}>{t('profile:disableModal.irreversibleAction')}</li>
          <li className={classes.graySpan}>{t('profile:disableModal.confirmDisable')}</li>
        </ul>
        <Button
          className={classes.button}
          variant="contained"
          size="medium"
          color="primary"
          onClick={() => handleClose()}>
          {t('profile:disableModal.saveAccount')}
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          size="medium"
          color="primary"
          style={{ marginLeft: '10px' }}
          onClick={() => handleDisableUser()}>
          {t('profile:disableModal.disableAccount')}
        </Button>
      </Box>
    </StyledModal>
  )
}

export default DisableAccountModal
