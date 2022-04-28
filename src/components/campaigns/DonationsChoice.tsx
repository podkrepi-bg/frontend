import React, { useMemo, useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { useRecurringPriceList, useSinglePriceList } from 'common/hooks/donation'
import { Box } from '@mui/system'
import theme from 'common/theme'

type DonationsChoiceProps = {
  onRecurringClick?: (priceId: string) => void
  onSingleClick?: (priceId: string) => void
}

const useStyles = makeStyles(() =>
  createStyles({
    donationPriceList: {
      display: 'contents',
      textAlignLast: 'center',
    },
  }),
)

function DonationsChoice({ onRecurringClick, onSingleClick }: DonationsChoiceProps) {
  const [listType, setListType] = useState('')
  const { data: singlePrices } = useSinglePriceList({
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  })
  const { data: recurringPrices } = useRecurringPriceList({
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  })
  const classes = useStyles()
  const sortedPrices = useMemo(() => {
    const pricesToShow = listType === 'single' ? singlePrices : recurringPrices
    if (!pricesToShow) return []
    return pricesToShow?.sort((a, b) => {
      if (a.unit_amount === null || b.unit_amount === null) return 0
      return a.unit_amount - b.unit_amount
    })
  }, [listType])
  return (
    <Box width={'100%'}>
      <Typography variant="h6" color={theme.palette.primary.dark}>
        Donate now ❤️
      </Typography>
      <ToggleButtonGroup
        fullWidth
        color="primary"
        exclusive
        onChange={(e, v) => {
          setListType(v)
        }}
        value={listType}>
        <ToggleButton value="single">Single</ToggleButton>
        <ToggleButton value="recurring">Recurring</ToggleButton>
      </ToggleButtonGroup>
      {listType && (
        <List className={classes.donationPriceList}>
          {sortedPrices.map((price, index) => {
            if (!price) return null
            return (
              <ListItem
                onClick={() => {
                  switch (listType) {
                    case 'single':
                      onSingleClick ? onSingleClick(price.id) : null
                      break
                    case 'recurring':
                      onRecurringClick ? onRecurringClick(price.id) : null
                      break
                  }
                }}
                button
                key={index}>
                <ListItemText
                  primary={`${(price.unit_amount ?? 100) / 100} лв.`}
                  secondary={price.metadata.title}
                />
              </ListItem>
            )
          })}
        </List>
      )}
    </Box>
  )
}

export default DonationsChoice
