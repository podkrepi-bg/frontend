import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import { FieldArray, useFormikContext } from 'formik'

import { BenevityImportInput } from '../benevity.types'
import { Delete } from '@mui/icons-material'
import { benevityDonationInitialValues } from '../../../../store/CreatePaymentStore'
import { BenevityInput } from '../../BenevityEditableInput'
import AddCircleIcon from '@mui/icons-material/AddCircle'

export const BenevityDonationsTable = () => {
  const { values } = useFormikContext<BenevityImportInput>()
  const exchangeRate = values.exchangeRate
  return (
    <FieldArray
      name="benevityData.donations"
      render={(arrayHelper) => (
        <TableContainer
          sx={{
            maxHeight: 300,
            maxWidth: 1400,
            '&::-webkit-scrollbar': {
              width: '0.3em',
              height: '0.7em',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#4AC3FFBB',
            },
            overflow: 'auto',
          }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Действия</TableCell>
                <TableCell>ID на транзакция</TableCell>
                <TableCell>Кампания</TableCell>
                <TableCell>Project Remote Id</TableCell>
                <TableCell>Дарение(орг. валута)</TableCell>
                <TableCell>Дарение(BGN)</TableCell>
                <TableCell>Дарител име</TableCell>
                <TableCell>Дарител фамилия</TableCell>
                <TableCell>Дарител емайл</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.benevityData?.donations?.map((donation, index) => {
                return (
                  <TableRow key={`${index}`}>
                    <TableCell>
                      <IconButton onClick={() => arrayHelper.remove(index)}>
                        <Delete fontSize="small" sx={{ color: '#FF3632' }} />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <BenevityInput
                        name={`benevityData.donations[${index}].transactionId`}
                        canEdit={true}
                      />
                    </TableCell>
                    <TableCell>
                      <BenevityInput
                        name={`benevityData.donations[${index}].project`}
                        canEdit={true}
                      />
                    </TableCell>
                    <TableCell>
                      <BenevityInput
                        name={`benevityData.donations[${index}].projectRemoteId`}
                        canEdit={true}
                      />
                    </TableCell>
                    <TableCell>
                      <BenevityInput
                        name={`benevityData.donations[${index}].totalAmount`}
                        suffix={donation.currency}
                        canEdit={true}
                      />
                    </TableCell>
                    <TableCell>
                      &#8776;{(donation.totalAmount * exchangeRate).toFixed(2)} BGN
                    </TableCell>
                    <TableCell>
                      <BenevityInput
                        name={`benevityData.donations[${index}].donorFirstName`}
                        canEdit={true}
                      />
                    </TableCell>
                    <TableCell>
                      <BenevityInput
                        name={`benevityData.donations[${index}].donorLastName`}
                        canEdit={true}
                      />
                    </TableCell>
                    <TableCell>
                      <BenevityInput
                        name={`benevityData.donations[${index}].email`}
                        canEdit={true}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}

              <TableRow sx={{ width: '100%', padding: 0, position: 'relative' }}>
                <TableCell colSpan={8} padding="checkbox">
                  <Box display={'flex'} justifyContent={'center'}>
                    <IconButton
                      size="large"
                      onClick={() => arrayHelper.push(benevityDonationInitialValues)}>
                      <AddCircleIcon />
                      <Typography fontSize={16}>Добави ново дарение</Typography>
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  )
}
