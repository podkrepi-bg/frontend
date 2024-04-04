import {
  Box,
  Button,
  Card,
  CardContent,
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
} from '../store/BenevityImportStore'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import { observer } from 'mobx-react'
import { BenevityCSVParser, TBenevityCSVParser } from 'common/util/benevityCSVParser'

import SubmitButton from 'components/common/form/SubmitButton'
import { FieldArray, Form, Formik, useField, useFormikContext } from 'formik'
import { TranslatableField, translateError } from 'common/form/validation'
import EditIcon from '@mui/icons-material/Edit'

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
      setValue(csvToJSON.disbursementId)
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
      setBenevityData(csvToJSON)
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
    </>
  )
}

const BenevityInput = ({ name, currency }: { name: string; currency?: string }) => {
  const { t } = useTranslation()
  const [editable, setEditable] = useState(false)
  const [field, meta] = useField(name)

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
            <IconButton size="small" onClick={toggleEdit} sx={{ color: 'primary.light' }}>
              <EditIcon />
            </IconButton>
          </>
        ),
      }}
    />
  )
}

const ExchangeRate = () => {
  const { values } = useFormikContext<TBenevityCSVParser>()

  return <Typography fontSize={17}>Курс: {values.exchangeRate.toFixed(5)}</Typography>
}

const DonationsTable = () => {
  const { values } = useFormikContext<TBenevityCSVParser>()
  const [showAddButton, setShowAddButton] = useState(false)
  const exchangeRate = values.transactionAmount / values.netTotalPayment || 0
  return (
    <FieldArray
      name="donations"
      render={(arrayHelper) => (
        <>
          <TableContainer
            sx={{
              maxHeight: 300,
              overflow: 'scroll',
              '&::-webkit-scrollbar': {
                width: '0.3em',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#4AC3FFBB',
              },
            }}>
            <Table
              stickyHeader
              onMouseEnter={() => setShowAddButton(true)}
              onMouseLeave={() => setShowAddButton(false)}>
              <TableHead>
                <TableRow>
                  <TableCell>ID на транзакция</TableCell>
                  <TableCell>Кампания</TableCell>
                  <TableCell>Project Remote Id</TableCell>
                  <TableCell>Дарение(орг. валута)</TableCell>
                  <TableCell>Дарение(BGN)</TableCell>
                  <TableCell>Дарител име</TableCell>
                  <TableCell sx={{ flex: 1 }}>Дарител фамилия</TableCell>
                  <TableCell>Дарител емайл</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.donations.map((donation, index) => {
                  return (
                    <TableRow key={`${index}`}>
                      <TableCell>
                        <BenevityInput name={`donations[${index}].transactionId`} />
                      </TableCell>
                      <TableCell>
                        <BenevityInput name={`donations[${index}].project`} />
                      </TableCell>
                      <TableCell>
                        <BenevityInput name={`donations[${index}].projectRemoteId`} />
                      </TableCell>
                      <TableCell>
                        <BenevityInput
                          name={`donations[${index}].totalAmount`}
                          currency={donation.currency}
                        />
                      </TableCell>
                      <TableCell>
                        &#8776;{(donation.totalAmount * exchangeRate).toFixed(2)} BGN
                      </TableCell>
                      <TableCell>
                        <BenevityInput name={`donations[${index}].donorFirstName`} />
                      </TableCell>
                      <TableCell>
                        <BenevityInput name={`donations[${index}].donorLastName`} />
                      </TableCell>
                      <TableCell>
                        <BenevityInput name={`donations[${index}].email`} />
                      </TableCell>
                    </TableRow>
                  )
                })}
                {showAddButton && (
                  <TableRow sx={{ width: '100%', padding: 0 }}>
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
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    />
  )
}

export function DonationImportSummary() {
  const { benevityData, selectedRecord, hideImportModal } = CreatePaymentStore
  benevityData['transactionAmount'] = Number(selectedRecord.id.substring(59, 66) ?? 0)
  benevityData['exchangeRate'] = benevityData.transactionAmount / benevityData.netTotalPayment

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Grid container sx={{ padding: 2 }} xs={12} gap={2}>
      <Grid container item direction={'column'}>
        <Grid item display={'flex'} gap={1} alignItems={'center'}>
          <Typography fontSize={17}>Получени средства(BGN):</Typography>
          <BenevityInput name="transactionAmount" />
        </Grid>
        <Grid item display={'flex'} gap={1} alignItems={'center'}>
          <Typography fontSize={17}>Превод валута:</Typography>
          <BenevityInput name="currency" />
        </Grid>
        <Grid item display={'flex'} gap={1} alignItems={'center'}>
          <Typography fontSize={17}>Изпратени средства(Нето):</Typography>
          <BenevityInput name="netTotalPayment" />
        </Grid>
        <ExchangeRate />
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
