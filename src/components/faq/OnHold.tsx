import React from 'react'
import { Box, Typography } from '@mui/material'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

export default function OnHold() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography sx={{ mb: 2 }} variant="h6">
        Здравейте!
        <br />
        <br /> Работим усилено над всеки детайл от тази страница. <br />
        Ще бъдем готови да Ви я покажем след 1.03.2022 г.
        <br />
        Надяваме се дори да я завършим и публикуваме по-рано.
        <br />
        <br />
        Благодарим Ви за интереса към дейността ни,
        <br />
        <br />
        <strong>Екипът на Подкрепи.бг</strong>
        <br />
        <br />
      </Typography>
      <LinkButton href={routes.contact} variant="contained" color="primary">
        Свържете се с нас!
      </LinkButton>
    </Box>
  )
}
