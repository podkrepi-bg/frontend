import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'

import { isAdmin } from 'common/util/roles'
import AdminLayout from 'components/admin/navigation/AdminLayout'

import { menuItems } from './navigation/adminMenu'
import AdminContainer from './navigation/AdminContainer'

export default function AdminPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { keycloak } = useKeycloak<KeycloakInstance>()
  if (!keycloak?.authenticated) {
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

  if (!isAdmin(keycloak)) {
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
        <Grid container spacing={2} rowSpacing={4} px={4} pb={4}>
          {menuItems.map(({ label, href, icon: Icon }, index) => (
            <Grid xs={12} sm={6} md={4} lg={2} item key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => router.push(href)}>
                  <CardContent>
                    <Box textAlign="center">
                      <Icon fontSize="medium" />
                    </Box>
                    <Typography gutterBottom variant="h6" component="div" textAlign="center">
                      {label}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </AdminContainer>
    </AdminLayout>
  )
}
