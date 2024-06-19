import { Box, Button, CardContent, Container, Grid, Typography } from '@mui/material'
import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'
import React from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { marketingCards } from './navigation/marketingCards'

const colors = ['#0179a8', '#346cb0', '#5f4b8b', '#b76ba3', '#a7c796', '#00a28a', '#3686a0']
export default function MarketingPage() {
  const { t } = useTranslation('marketing')
  return (
    <AdminLayout>
      <AdminContainer title={t('admin.marketing')}>
        <Container maxWidth={false} sx={{ py: 5 }}>
          <Grid container spacing={2} rowSpacing={4} px={4} pb={4} mb={2}>
            {marketingCards.map(({ label, href, icon: Icon, disabled }, index) => (
              <Grid xs={12} sm={6} md={4} lg={2.4} item key={index}>
                <Button
                  disabled={disabled}
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
                  <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CardContent>
                      <Box textAlign="center">
                        <Icon fontSize="large" />
                      </Box>
                      <Typography variant="h6" component="h2" textAlign="center" fontWeight="bold">
                        {label}
                      </Typography>
                    </CardContent>
                  </Link>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
