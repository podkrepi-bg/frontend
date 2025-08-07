import React, { useState } from 'react'

import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  RadioGroup,
  Tooltip,
  Typography,
} from '@mui/material'

import { baseUrl } from 'common/routes'
import type { RegisterPageProps } from 'pages/register'
import Layout from 'components/client/layout/Layout'

import RegisterForm from './RegisterForm'
import { AlertStore } from 'stores/AlertStore'
import { useRouter } from 'next/router'
import { useRegister } from 'service/auth'
import { routes } from 'common/routes'
import RadioButton from 'components/common/form/RadioButton'
import Google from 'common/icons/Google'
import InfoIcon from '@mui/icons-material/Info'
import CorporateRegisterForm from './CorporateRegisterForm'
import {
  AccountType,
  IndividualRegisterFormData,
  CorporateRegisterFormData,
} from 'gql/user-registration'
import RegisterSuccess from './RegisterSuccess'

import theme from 'common/theme'

const providerIcons = {
  google: <Google style={{ width: 43.55, height: 43.55 }} />,
}

export default function RegisterPage({ providers }: RegisterPageProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [profileType, setProfileType] = useState<AccountType>(AccountType.INDIVIDUAL)

  const { mutateAsync: register } = useRegister()

  if (router.query.success) {
    return (
      <Layout>
        <RegisterSuccess type={router.query.type as AccountType} />
      </Layout>
    )
  }

  const onSubmit = async (values: IndividualRegisterFormData | CorporateRegisterFormData) => {
    try {
      setLoading(true)
      values.firstName = values.firstName.trim()
      values.lastName = values.lastName.trim()
      values.email = values.email.trim()

      // Register in Keycloak
      const registerResponse = await register(values)

      if (registerResponse.data.data?.errorMessage) {
        AlertStore.show(t('auth:alerts.duplicate-email'), 'error')
        return
      }
      if (values.type === AccountType.CORPORATE && registerResponse.status === 201) {
        setLoading(false)
        router.replace({ query: { ...router.query, type: values.type, success: true } })
        return
      }
      // Authenticate
      // TODO Replace auto login with sending verification email to active account for personal accounts
      const resp = await signIn<'credentials'>('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })
      if (resp?.error) {
        throw new Error(resp.error)
      }
      if (resp?.ok) {
        AlertStore.show(t('auth:alerts.welcome'), 'success')
        await router.push(routes.profile.index)
      }
    } catch (error) {
      console.error(error)
      AlertStore.show(t('auth:alerts.invalid-login'), 'error')
    } finally {
      setLoading(false)
    }
  }

  const onProfileTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileType(event.target.value as AccountType)
  }

  return (
    <Layout title={t('auth:cta.register')} metaDescription={t('auth:cta.register')}>
      <Container maxWidth="sm">
        <RadioGroup
          onChange={onProfileTypeChange}
          value={profileType}
          aria-label="profile type select">
          <Grid2 container justifyContent={'space-between'} rowGap={2} direction={'row'}>
            <Grid2
              size={{
                xs: 12,
                sm: 12 / 2.1
              }}>
              <RadioButton
                checked={profileType === AccountType.INDIVIDUAL}
                value={AccountType.INDIVIDUAL}
                label={t(`auth:type.${AccountType.INDIVIDUAL}`)}
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 12 / 2.1
              }}>
              <RadioButton
                checked={profileType === AccountType.CORPORATE}
                value={AccountType.CORPORATE}
                label={t(`auth:type.${AccountType.CORPORATE}`)}
              />
            </Grid2>
          </Grid2>
        </RadioGroup>
        {profileType === AccountType.INDIVIDUAL && (
          <>
            <Typography sx={{ paddingTop: 1, px: 1 }}>{t('auth:register.individual')}</Typography>
            <Tooltip
              enterTouchDelay={0}
              title={t('auth:register.individual-subtitle')}
              sx={{ padding: 0 }}>
              <Button
                startIcon={<InfoIcon style={{ width: 20 }} />}
                sx={{
                  paddingTop: 0,
                  textTransform: 'lowercase',
                  textDecoration: 'underline',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#FFF',
                    color: 'black',
                    textDecoration: 'underline',
                  },
                }}>
                {t('common:cta.more-information')}
              </Button>
            </Tooltip>
            <ProvidersList providers={providers} />
            <Divider
              sx={{
                py: 3,
                fontSize: theme.typography.pxToRem(16),
                textTransform: 'uppercase',
                color: '#444444',
                ':before': {
                  borderTop: 'thin solid black',
                },
                ':after': {
                  borderTop: 'thin solid black',
                },
              }}>
              {t('common:or')}
            </Divider>
            <RegisterForm onSubmit={onSubmit} loading={loading} />
          </>
        )}
        {profileType === AccountType.CORPORATE && (
          <>
            <Typography sx={{ paddingTop: 1, px: 1 }}>{t('auth:register.corporate')}</Typography>
            <Tooltip
              enterTouchDelay={0}
              title={t('auth:register.corporate-subtitle')}
              sx={{ padding: 0 }}>
              <Button
                startIcon={<InfoIcon style={{ width: 20 }} />}
                sx={{
                  paddingTop: 0,
                  marginBottom: 2,
                  textTransform: 'lowercase',
                  textDecoration: 'underline',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#FFF',
                    color: 'black',
                    textDecoration: 'underline',
                  },
                }}>
                {t('common:cta.more-information')}
              </Button>
            </Tooltip>
            <CorporateRegisterForm onSubmit={onSubmit} loading={loading} />
          </>
        )}
      </Container>
    </Layout>
  );
}

const ProvidersList = ({ providers }: RegisterPageProps) => {
  const { t } = useTranslation()
  return (
    <Box mt={4} justifyContent={'center'}>
      <Grid2 container gap={2} direction="column">
        {providers &&
          Object.values(providers)
            .filter((p) => p.id !== 'credentials')
            .map((provider) => {
              const providerIcon =
                providerIcons[provider.name.toLowerCase() as keyof typeof providerIcons]
              return (
                <Grid2 key={provider.name}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={providerIcon}
                    sx={{ color: '#2E5693', borderRadius: 100, py: 0.2, fontSize: 16 }}
                    onClick={() => signIn(provider.id, { callbackUrl: baseUrl })}>
                    {t('common:nav.continue-with')} {provider.name}
                  </Button>
                </Grid2>
              );
            })}
      </Grid2>
    </Box>
  );
}
