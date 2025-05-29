import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

import { isAdmin } from 'common/util/roles'
import AdminLayout from 'components/common/navigation/AdminLayout'
import { adminCards } from 'components/common/navigation/adminMenu'
import AdminContainer from 'components/common/navigation/AdminContainer'

const colors = ['#0179a8', '#346cb0', '#5f4b8b', '#b76ba3', '#a7c796', '#00a28a', '#3686a0']

export default function AdminPage() {
  const [isMounted, setIsMounted] = useState(false)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session, status } = useSession()

  // * workaround for hydratation error
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  // * end comment

  if (status !== 'authenticated') {
    return (
      <AdminLayout>
        <AdminContainer title={t('nav.admin.index')}>
          <Box p={3}>
            <Typography variant="h6">Not authenticated</Typography>
          </Box>
        </AdminContainer>
      </AdminLayout>
    )
  }

  if (!isAdmin(session)) {
    return (
      <AdminLayout>
        <AdminContainer title={t('nav.admin.index')}>
          <Box p={3}>
            <Typography variant="h6">Not authorized</Typography>
          </Box>
        </AdminContainer>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <AdminContainer title={t('nav.admin.index')}>
        <Box p={4}>
          <Typography variant="h6">{'Добре дошли!'}</Typography>
        </Box>
        <Grid container spacing={2} rowSpacing={4} px={4} pb={4} mb={2}>
          {adminCards.map(({ label, href, icon: Icon }, index) => (
            <Grid xs={12} sm={6} md={4} lg={2.4} item key={index}>
              <Card
                sx={{
                  height: 130,
                  maxWidth: 345,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 2,
                  boxShadow: '0px 2px 4px ' + `${colors[index % colors.length]}9A`,
                  color: colors[index % colors.length],
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 4px 8px ' + `${colors[index % colors.length]}9A`,
                    backgroundColor: `${colors[index % colors.length]}1A`,
                    border: '1px solid ' + `${colors[index % colors.length]}9A`,
                  },
                  border: '1px solid ' + `${colors[index % colors.length]}7A`,
                }}>
                <Box onClick={() => router.push(href)} sx={{ cursor: 'pointer' }}>
                  <CardContent>
                    <Box textAlign="center">
                      <Icon fontSize="large" />
                    </Box>
                    <Typography variant="h6" component="div" textAlign="center" fontWeight="bold">
                      {label}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </AdminContainer>
    </AdminLayout>
  )
}
