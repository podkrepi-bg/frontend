import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useSession } from 'next-auth/react'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Divider, Link, Typography } from '@mui/material'

import { formatDateString } from 'common/util/date'
import { useCurrentPerson } from 'common/util/useCurrentPerson'

import ProfileTab from './ProfileTab'
import { ProfileTabs } from './tabs'
import UpdateNameModal from './UpdateNameModal'
import UpdateBirthdayModal from './UpdateBirthdayModal'
import UpdateEmailModal from './UpdateEmailModal'
import UpdatePasswordModal from './UpdatePasswordModal'
import DisableAccountModal from './DisableAccountModal'

const PREFIX = 'PersonalInfoTab'

const classes = {
  editSpan: `${PREFIX}-editSpan`,
  editIcon: `${PREFIX}-editIcon`,
  heading: `${PREFIX}-heading`,
  bold: `${PREFIX}-bold`,
  graySpan: `${PREFIX}-graySpan`,
  h5: `${PREFIX}-h5`,
  h3: `${PREFIX}-h3`,
  boxTitle: `${PREFIX}-boxTitle`,
  boxInfo: `${PREFIX}-boxInfo`,
  divider: `${PREFIX}-divider`,
  editBox: `${PREFIX}-editBox`,
  infoFlex: `${PREFIX}-infoFlex`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.editSpan}`]: {
    color: '#294E85',
  },

  [`& .${classes.editIcon}`]: { position: 'relative', top: '7px' },

  [`& .${classes.heading}`]: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '123.5%',
    letterSpacing: '0.25px',
    color: '#000000',
  },

  [`& .${classes.bold}`]: {
    fontWeight: 'bold',
  },

  [`& .${classes.graySpan}`]: {
    fontFamily: 'Lato, sans-serif',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '133.4%',
    color: '#909090',
  },

  [`& .${classes.h5}`]: {
    fontFamily: 'Lato, sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '22px',
    lineHeight: '133.4%',
  },

  [`& .${classes.h3}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '25px',
    lineHeight: '116.7%',
    margin: '0',
  },
  [`& .${classes.boxTitle}`]: {
    backgroundColor: 'white',
    padding: theme.spacing(3, 7),
    paddingBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    boxShadow: theme.shadows[3],
  },
  [`& .${classes.boxInfo}`]: {
    padding: theme.spacing(2, 2),
    backgroundColor: '#E9F6FF',
    flexBasis: '50%',
    boxShadow: theme.shadows[3],
    position: 'relative',
  },
  [`& .${classes.divider}`]: {
    margin: theme.spacing(2, 0),
  },
  [`& .${classes.editBox}`]: {
    position: 'absolute',
    right: '1rem',
    top: '.5rem',
  },
  [`& .${classes.infoFlex}`]: {
    display: 'flex',
    gap: '1rem',
  },
}))

export default function PersonalInfoTab() {
  const { data: session } = useSession()
  const { data: { user: person } = { user: null }, refetch } = useCurrentPerson()
  const [isDisableAccountModalOpen, setIsDisableAccountModalOpen] = useState(false)
  const [isUpdateEmailModalOpen, setIsUpdateEmailModalOpen] = useState(false)
  const [isUpdateNameModalOpen, setIsUpdateNameModalOpen] = useState(false)
  const [isUpdateBirthdayModalOpen, setIsUpdateBirthdayModalOpen] = useState(false)
  const [isUpdatePsswordModalOpen, setIsUpdatePasswordModalOpen] = useState(false)

  console.log('session', session)

  return (
    <Root>
      <Box className={classes.boxTitle}>
        <Typography className={classes.h3}>Лична информация</Typography>
      </Box>
      <ProfileTab name={ProfileTabs.personalInformation} title={''}>
        <Box>
          <h2 className={classes.heading}>Login информация:</h2>
          <Box className={classes.infoFlex}>
            <Box className={classes.boxInfo}>
              <p className={classes.bold}>Email адрес:</p>
              <p>{person?.email}</p>
              <Box sx={{ position: 'absolute', right: '1rem', top: '.5rem' }}>
                <Link href="#" onClick={() => setIsUpdateEmailModalOpen(true)}>
                  <EditIcon className={classes.editIcon} />
                  <span className={classes.editSpan}>Редактирай</span>
                </Link>
              </Box>
            </Box>
            <Box className={classes.boxInfo}>
              <p className={classes.bold}>Парола:</p>
              <p>***********</p>
              <Box className={classes.editBox}>
                <Link href="#" onClick={() => setIsUpdatePasswordModalOpen(true)}>
                  <EditIcon className={classes.editIcon} />
                  <span className={classes.editSpan}>Редактирай</span>
                </Link>
              </Box>
            </Box>
          </Box>
          <Divider className={classes.divider} />
          <h2 className={classes.heading}>Лична информация:</h2>
          <Box className={classes.infoFlex}>
            <Box className={classes.boxInfo}>
              <p className={classes.bold}>Име:</p>
              <p>
                {person?.firstName} {person?.lastName}
              </p>
              <Box className={classes.editBox}>
                <Link href="#" onClick={() => setIsUpdateNameModalOpen(true)}>
                  <EditIcon className={classes.editIcon} />
                  <span className={classes.editSpan}>Редактирай</span>
                </Link>
              </Box>
            </Box>
            <Box className={classes.boxInfo}>
              <p className={classes.bold}>Рожден ден:</p>
              <Typography sx={{ color: person?.birthday ? undefined : '#F22727' }}>
                {person?.birthday ? formatDateString(person?.birthday) : 'не e наличен'}
              </Typography>
              <Box className={classes.editBox}>
                <Link href="#" onClick={() => setIsUpdateBirthdayModalOpen(true)}>
                  <EditIcon className={classes.editIcon} />
                  <span className={classes.editSpan}>Редактирай</span>
                </Link>
              </Box>
            </Box>
          </Box>
          <Divider className={classes.divider} />
          <Link
            href="#"
            sx={{ color: '#294E85', float: 'right' }}
            onClick={() => setIsDisableAccountModalOpen(true)}>
            изтриване на акаунт/ профил
          </Link>
        </Box>
        <Link
          href="#"
          sx={{ color: '#294E85', float: 'right' }}
          onClick={() => setIsDisableAccountModalOpen(true)}>
          изтриване на акаунт/ профил
        </Link>
      </ProfileTab>
      {person && (
        <>
          <UpdateNameModal
            isOpen={isUpdateNameModalOpen}
            person={person}
            handleClose={() => {
              setIsUpdateNameModalOpen(false)
              refetch()
            }}
          />
          <UpdateBirthdayModal
            isOpen={isUpdateBirthdayModalOpen}
            person={person}
            handleClose={() => {
              setIsUpdateBirthdayModalOpen(false)
              refetch()
            }}
          />
          <UpdateEmailModal
            isOpen={isUpdateEmailModalOpen}
            person={person}
            handleClose={() => {
              setIsUpdateEmailModalOpen(false)
              refetch()
            }}
          />
          <UpdatePasswordModal
            isOpen={isUpdatePsswordModalOpen}
            person={person}
            handleClose={() => {
              setIsUpdatePasswordModalOpen(false)
              refetch()
            }}
          />
          <DisableAccountModal
            isOpen={isDisableAccountModalOpen}
            person={person}
            handleClose={() => {
              setIsDisableAccountModalOpen(false)
              refetch()
            }}
          />
        </>
      )}
    </Root>
  )
}
