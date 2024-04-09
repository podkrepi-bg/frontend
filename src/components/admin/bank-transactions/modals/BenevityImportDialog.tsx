import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CreatePaymentStore,
  TImportType,
  benevityDonationInitialValues,
  benevityInitialValues,
} from '../store/BenevityImportStore'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import { observer } from 'mobx-react'
import {
  BenevityCSVParser,
  TBenevityCSVParser,
  TBenevityDonation,
} from 'common/util/benevityCSVParser'

import SubmitButton from 'components/common/form/SubmitButton'
import { FieldArray, Form, Formik, useField, useFormikContext } from 'formik'
import { TranslatableField, translateError } from 'common/form/validation'
import EditIcon from '@mui/icons-material/Edit'
import { useQuery } from '@tanstack/react-query'
import { endpoints } from 'service/apiEndpoints'
import { useSession } from 'next-auth/react'
import { authQueryFnFactory } from 'service/restRequests'
import { BankTransactionsInput } from 'gql/bank-transactions'
import * as yup from 'yup'
import { fromMoney, moneyPublic } from 'common/util/money'
import { useCampaignList } from 'common/hooks/campaigns'
import { v5 as uuidv5 } from 'uuid'
import { BenevityRequest } from 'components/admin/donations/dialogs/CreatePaymentDialog'
import { Delete } from '@mui/icons-material'

function BenevityImportDialog() {
  const { t } = useTranslation()
  const { setImportType } = CreatePaymentStore

  const handleImportTypeChange = (type: TImportType) => {
    setImportType(type)
  }

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }}>
        Прикачване на CSV файл
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
        {t('Създаване на дарения от Benevity, чрез CSV файл')} <b />
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
        <Button onClick={() => handleImportTypeChange('file')} variant="outlined">
          {t('Чрез файл')}
        </Button>
        <Button onClick={() => handleImportTypeChange('manual')} variant="outlined">
          {t('Ръчно въвеждане')}
        </Button>
      </Box>
    </>
  )
}

export function FileImportDialog() {
  const { setBenevityData } = CreatePaymentStore
  const [isDragging, setIsDragging] = useState(false)
  const inputFile = useRef<HTMLInputElement | null>(null)
  const submitButtonRef = useRef<HTMLButtonElement | null>(null)
  const [field, meta, { setValue }] = useField('benevityData')

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(true)
    event.dataTransfer.dropEffect = 'copy'
  }
  const onDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
  }
  const onDrop = (event: React.DragEvent) => {
    const fileReader = new FileReader()
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files[0]
    fileReader.readAsText(file)
    fileReader.onload = function () {
      if (!fileReader.result) return
      const csvToJSON = BenevityCSVParser(fileReader.result as string)
      if (!csvToJSON) throw new Error('Something went wrong')
      setBenevityData(csvToJSON)
      setValue(csvToJSON)
    }
  }
  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    inputFile.current?.click()
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setIsDragging(false)

    const fileReader = new FileReader()
    const filelist = event.target.files
    if (!filelist) return
    const file = filelist[0]
    if (file.type !== 'text/csv')
      throw new Error('Unsupported file format. Only csv files are allowed')
    fileReader.readAsText(file)
    fileReader.onload = function () {
      if (!fileReader.result) return
      const csvToJSON = BenevityCSVParser(fileReader.result as string)
      if (!csvToJSON) throw new Error('Something went wrong')
      setValue(csvToJSON)
      submitButtonRef.current?.click()
    }
  }

  return (
    <>
      <div
        style={{
          width: '50vw',
          height: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div
          draggable
          onClick={onClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          style={{
            width: '90%',
            height: '90%',
            border: 3,
            borderStyle: 'dashed',
            color: 'gray',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 20,
            cursor: 'pointer',
          }}>
          Провлачете файла в квадрата
        </div>
      </div>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: 'none' }}
        accept=".csv"
        onChange={onChange}
      />
      <button type="submit" id="file" ref={submitButtonRef} style={{ display: 'none' }} />
    </>
  )
}

const BenevityInput = ({
  name,
  currency,
  canEdit = false,
}: {
  name: string
  currency?: string
  canEdit?: boolean
}) => {
  const { t } = useTranslation()
  const [editable, setEditable] = useState(false)
  const [field, meta, { setValue }] = useField(name)
  const { setFieldValue, values } = useFormikContext()
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!editable) return
    const child = ref.current
    child?.focus()
  }, [editable])

  const toggleEdit = () => {
    setEditable((prev) => !prev)
  }
  const onBlur = (
    formikBlur: typeof field.onBlur,
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    formikBlur(e)
    toggleEdit()
  }

  return (
    <TextField
      helperText={helperText}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      variant="standard"
      id={field.name}
      type="text"
      {...field}
      onBlur={(e) => onBlur(field.onBlur, e)}
      InputProps={{
        disableUnderline: !editable,
        inputRef: ref,
        disabled: !editable,
        sx: {
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#000000',
          },
          '& .MuiInputBase-input': {
            width: `${String(field.value).length + 1}ch`,
            maxWidth: !editable ? `12ch` : 'auto',
          },
        },
        endAdornment: (
          <>
            {currency && <span>{currency}</span>}
            {canEdit && (
              <IconButton size="small" onClick={toggleEdit} sx={{ color: 'primary.light' }}>
                <EditIcon />
              </IconButton>
            )}
          </>
        ),
      }}
    />
  )
}

type BenevityDonation = Pick<
  TBenevityDonation,
  'email' | 'donorFirstName' | 'donorLastName' | 'totalAmount' | 'projectRemoteId' | 'transactionId'
>

type BenevityImportInput = {
  amount: number
  extPaymentIntentId: string
  exchangeRate: number
  currency: string
  benevityData: TBenevityCSVParser
}

const benevityDonationValidationObject: yup.SchemaOf<BenevityDonation> = yup.object().shape({
  transactionId: yup.string().required(),
  email: yup.string().required(),
  donorFirstName: yup.string().required(),
  donorLastName: yup.string().required(),
  totalAmount: yup.number().required(),
  projectRemoteId: yup.string().required(),
})

export const benevityValidation: yup.SchemaOf<BenevityRequest> = yup
  .object()
  .defined()
  .shape({
    amount: yup.number().required(),
    extPaymentIntentId: yup.string().required(),
    exchangeRate: yup.number().required(),
    benevityData: yup
      .object()
      .defined()
      .shape({
        donations: yup.array().of(benevityDonationValidationObject).optional(),
      }),
  })

const ExchangeRate = ({ exchangeRate }: { exchangeRate: number }) => {
  return <Typography fontSize={17}>Курс: {exchangeRate.toFixed(2)}</Typography>
}

const DonationsTable = () => {
  const { values, setFieldValue } = useFormikContext<BenevityImportInput>()
  const [showAddButton, setShowAddButton] = useState(false)
  const { data: campaigns } = useCampaignList()
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
          <Table
            stickyHeader
            onMouseEnter={() => setShowAddButton(true)}
            onMouseLeave={() => setShowAddButton(false)}>
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
                        currency={donation.currency}
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

function useFindBankTransaction(id: string) {
  const { data: session } = useSession()
  return useQuery<BankTransactionsInput>(
    [endpoints.bankTransactions.getTransactionById(id).url],
    authQueryFnFactory<BankTransactionsInput>(session?.accessToken),
  )
}

export function DonationImportSummary() {
  const { hideImportModal } = CreatePaymentStore
  const { values, setFieldValue } = useFormikContext<BenevityImportInput>()
  const { data, isLoading, isError } = useFindBankTransaction(
    values.extPaymentIntentId ?? values.benevityData?.disbursementId,
  )
  useEffect(() => {
    if (!data) return
    setFieldValue('amount', fromMoney(data.amount ?? 0))
    setFieldValue('extPaymentIntentId', data.id)
    setFieldValue('currency', values.benevityData?.currency)
    if (!values.benevityData) {
      setFieldValue('benevityData', benevityInitialValues)
    }
  }, [data])

  useEffect(() => {
    setFieldValue('exchangeRate', values.amount / values.benevityData?.netTotalPayment)
  }, [values.amount, values.benevityData?.netTotalPayment])

  if (isLoading) return <CircularProgress />
  if (isError) return

  return (
    <Grid container sx={{ padding: 2 }} xs={12} gap={2}>
      <Grid container item direction={'column'}>
        <Grid item display={'flex'} gap={1} alignItems={'center'}>
          <Typography fontSize={17}>Получени средства(BGN):</Typography>
          <BenevityInput name="amount" currency={data.currency} />
        </Grid>
        <Grid item display={'flex'} gap={1} alignItems={'center'}>
          <Typography fontSize={17}>Превод валута:</Typography>
          <BenevityInput name="currency" canEdit={true} />
        </Grid>
        <Grid item display={'flex'} gap={1} alignItems={'center'}>
          <Typography fontSize={17}>Изпратени средства(Нето):</Typography>
          <BenevityInput
            name="benevityData.netTotalPayment"
            currency={values.currency}
            canEdit={true}
          />
        </Grid>
        <ExchangeRate exchangeRate={values.exchangeRate} />
      </Grid>
      <Grid item xs={12}>
        <Typography fontSize={17} sx={{ marginTop: 5 }}>
          Дарения по кампании:
        </Typography>
        <DonationsTable />
      </Grid>
      <Grid container item gap={2} direction={'column'} alignItems={'center'}>
        <Grid container item sx={{ width: '40%' }} gap={2}>
          <SubmitButton fullWidth label="campaigns:cta.submit" type="submit" />
          <Button fullWidth onClick={() => hideImportModal()}>
            Отказ
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default observer(BenevityImportDialog)
