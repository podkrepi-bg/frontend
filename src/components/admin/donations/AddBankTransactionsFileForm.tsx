import * as yup from 'yup'
import { useState } from 'react'
import { FormikHelpers } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import {
  Box,
  Button,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import FileUpload from 'components/common/file-upload/FileUpload'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import {
  BankTransactionsFileType,
  FileType,
  UploadBankTransactionsFiles,
} from 'components/admin/bank-transactions-file/types'
import BankTransactionsFileList from 'components/common/file-upload/BankTransactionsFileList'
import { useUploadBankTransactionsFiles } from 'service/donation'
import { BankImportResult, BankTransactionsFileFormData } from 'gql/donations'
import { TableBody, TableHead, TableRow } from '@mui/material'
import { getExactDateTime } from 'common/util/date'
import { money } from 'common/util/money'

const validationSchema: yup.SchemaOf<BankTransactionsFileFormData> = yup.object().defined().shape({
  bankTransactionsFileId: yup.string().required(),
})

const defaults: BankTransactionsFileFormData = {
  bankTransactionsFileId: '',
}

let bankImportResults: BankImportResult[] = []

export type BankTransactionsFileFormProps = { initialValues?: BankTransactionsFileFormData }

export default function BankTransactionsFileForm({
  initialValues = defaults,
}: BankTransactionsFileFormProps) {
  const [files, setFiles] = useState<File[]>([])
  const [types, setTypes] = useState<FileType[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const { t } = useTranslation()

  const fileUploadMutation = useMutation<
    AxiosResponse<BankImportResult[]>,
    AxiosError<ApiErrors>,
    UploadBankTransactionsFiles
  >({
    mutationFn: useUploadBankTransactionsFiles(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: BankTransactionsFileFormData,
    { setFieldError }: FormikHelpers<BankTransactionsFileFormData>,
  ) => {
    try {
      const response = await fileUploadMutation.mutateAsync({
        files,
        types,
        bankTransactionsFileId: values.bankTransactionsFileId,
      })
      bankImportResults = response.data
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography
          variant="h5"
          component="h2"
          sx={(theme) => ({
            mb: 5,
            color: theme.palette.primary.dark,
            textAlign: 'center',
          })}>
          {t('donations:form-heading-bank-transactions-file')}
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label={t('donations:bankTransactionsFileId')}
              name="bankTransactionsFileId"
              autoComplete="bankTransactionsFileId"
            />
          </Grid>
          <Grid item xs={12}>
            <FileUpload
              onUpload={(newFiles) => {
                setFiles((prevFiles) => [...prevFiles, ...newFiles])
                setTypes((prevTypes) => [
                  ...prevTypes,
                  ...newFiles.map((file) => ({
                    file: file.name,
                    type: BankTransactionsFileType.xml,
                  })),
                ])
              }}
              buttonLabel={t('donations:addFiles')}
            />
            <BankTransactionsFileList
              filesType={types}
              files={files}
              onDelete={(deletedFile) =>
                setFiles((prevFiles) => prevFiles.filter((file) => file.name !== deletedFile.name))
              }
              onSetFileType={(file, type) => {
                setTypes((prevTypes) => [
                  ...prevTypes.filter((f) => f.file !== file.name),
                  { file: file.name, type },
                ])
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton
              fullWidth
              label="donations:cta.submit"
              loading={fileUploadMutation.isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <Link href={routes.admin.donations.index} passHref>
              <Button fullWidth={true}>{t('donations:cta:cancel')}</Button>
            </Link>
          </Grid>
          <Grid item xs={18}>
            {bankImportResults?.length ? (
              <TableContainer>
                <Typography
                  variant="h5"
                  sx={(theme) => ({
                    mb: 5,
                    color: theme.palette.primary.dark,
                    textAlign: 'center',
                  })}>
                  {t('donations:bankImprotResults')}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={(theme) => ({
                    mb: 1,
                    mt: -2,
                    color: theme.palette.primary.dark,
                    textAlign: 'center',
                  })}>
                  {t('donations:bankImprotResultsSubtitle')}
                </Typography>
                <Table sx={{ minWidth: 650, backgroundColor: 'white' }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('donations:ext-payment-intent-id')}</TableCell>
                      <TableCell>{t('donations:created-at')}</TableCell>
                      <TableCell>{t('donations:amount')}</TableCell>
                      <TableCell>{t('donations:currency')}</TableCell>
                      <TableCell>{t('donations:status')}</TableCell>
                      <TableCell>{t('donations:message')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bankImportResults
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((donation, index) => (
                        <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell>{donation.extPaymentIntentId}</TableCell>
                          <TableCell>{getExactDateTime(donation.createdAt)}</TableCell>
                          <TableCell>{money(donation.amount)}</TableCell>
                          <TableCell>{donation.currency}</TableCell>
                          <TableCell>{donation.status}</TableCell>
                          <TableCell>{donation.message}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        count={bankImportResults.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            ) : (
              <Box />
            )}
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
