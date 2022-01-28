import { useEffect, useState } from 'react'
import { Box, Button, Container, createTheme, Grid } from '@mui/material'
import { axios } from 'common/api-client'

import LinkButton from 'components/common/LinkButton'
import Layout from 'components/layout/Layout'

import { CountryType } from 'pages/countries'
import { ThemeProvider } from '@mui/styles'

const customTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          backgroundColor: 'green',
        },
      },
    },
  },
})

export default function CountriesList(props: { countries: CountryType[] }): JSX.Element {
  const [countries, setCountries] = useState<CountryType[]>([])

  useEffect(() => {
    setCountries(props.countries)
  }, [])

  const onDeleteClick = async (id: string) => {
    try {
      await axios.delete('http://localhost:5010/api/countries/' + id)
      setCountries((state) => state.filter((x) => x.id !== id))
    } catch (error) {
      console.log(error)
      // show notification
    }
  }
  return (
    <Layout>
      <Container>
        <Grid container direction="column" spacing={1}>
          {countries.map((x) => (
            <Grid item key={x.id}>
              <span>{x.name}</span>
              <Box ml={2} display="inline-block">
                <LinkButton size="small" variant="outlined" href={`/countries/${x.id}/edit`}>
                  edit
                </LinkButton>
              </Box>
              <Box ml={2} display="inline-block">
                <ThemeProvider theme={customTheme}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    sx={{
                      ':hover': {
                        backgroundColor: '#bf0000',
                      },
                    }}
                    onClick={() => onDeleteClick(x.id)}>
                    delete
                  </Button>
                </ThemeProvider>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}
