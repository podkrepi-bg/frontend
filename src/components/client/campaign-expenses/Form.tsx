import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { FormikHelpers } from 'formik'

import { Box, Button, Grid, Tooltip, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { Currency } from 'gql/currency'
import { AlertStore } from 'stores/AlertStore'
import { endpoints } from 'service/apiEndpoints'
import LinkButton from 'components/common/LinkButton'
import { useViewExpense } from 'common/hooks/expenses'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import CurrencySelect from 'components/common/currency/CurrencySelect'
import FormTextField from 'components/common/form/FormTextField'
import { Checkbox } from '@mui/material'
import { useCreateExpense, useEditExpense } from 'service/expense'

import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { ExpenseInput, ExpenseResponse, ExpenseStatus, ExpenseType } from 'gql/expenses'
import FileUpload from 'components/common/file-upload/FileUpload'

import ExpenseTypeSelect from 'components/admin/expenses/ExpenseTypeSelect'
import { useViewCampaign } from 'common/hooks/campaigns'
import { UploadExpenseFile, ExpenseFile } from 'gql/expenses'
import { useUploadExpenseFiles } from 'service/expense'
import FileList from 'components/client/campaign-expenses/grid/FileList'
import FormDatePicker from 'components/common/form/FormDatePicker'
import { toMoney, fromMoney } from 'common/util/money'
import { useCampaignExpenseFiles } from 'common/hooks/expenses'
import { downloadCampaignExpenseFile, deleteExpenseFile } from 'service/expense'
import { useSession } from 'next-auth/react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useViewPersonByKeylockId } from 'common/hooks/person'
import { isAdmin } from 'common/util/roles'

const validTypes = Object.keys(ExpenseType)
const validStatuses = Object.keys(ExpenseStatus)
const validCurrencies = Object.keys(Currency)

export default function Form() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const slug = router.query.slug as string
  const { t } = useTranslation('expenses')
  const { data: campaignResponse } = useViewCampaign(slug)
  let id = router.query.id as string
  const [filesToUpload, setFilesToUpload] = useState<File[]>([])
  const [filesToDelete, setFilesToDelete] = useState<string[]>([])
  const { data: expenseFiles } = useCampaignExpenseFiles(id)
  const { data: session } = useSession()

  const canApprove =
    !!session?.user?.realm_access?.roles?.includes('podkrepi-admin') || isAdmin(session)

  const { data: person } = useViewPersonByKeylockId(session?.user?.sub as string)

  const fileUploadMutation = useMutation<
    AxiosResponse<ExpenseFile[]>,
    AxiosError<ApiErrors>,
    UploadExpenseFile
  >({
    mutationFn: useUploadExpenseFiles(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
  })

  let data: ExpenseResponse | undefined
  const validationSchema = yup
    .object()
    .defined()
    .shape({
      type: yup.string().trim().oneOf(validTypes).required(),
      status: yup.string().trim().oneOf(validStatuses).required(),
      currency: yup.string().trim().oneOf(validCurrencies).required(),
      money: yup.number().required(),
      description: yup.string().trim().notRequired(),
    })
  if (id) {
    id = String(id)
    data = useViewExpense(id).data
  }

  const initialValues: ExpenseInput = {
    type: data?.type || ExpenseType.none,
    status: data?.status || ExpenseStatus.pending,
    currency: data?.currency || Currency.BGN,
    money: fromMoney(data?.amount as number),
    amount: data?.amount || 0,
    vaultId: data?.vaultId || campaignResponse?.campaign.defaultVault || '',
    deleted: data?.deleted || false,
    description: data?.description || '',
    documentId: data?.documentId || '',
    approvedById: data?.approvedById || '',
    approved: !!data?.approvedById,
    spentAt: data?.spentAt || '',
  }

  const [approvedBy, setApprovedBy] = useState<string | null | undefined>(data?.approvedById)

  const mutationFn = id ? useEditExpense(id) : useCreateExpense()

  const mutation = useMutation<AxiosResponse<ExpenseResponse>, AxiosError<ApiErrors>, ExpenseInput>(
    {
      mutationFn,
      onError: () =>
        AlertStore.show(id ? t('alerts.edit-row.error') : t('alerts.new-row.error'), 'error'),
      onSuccess: () => {
        queryClient.invalidateQueries([endpoints.expenses.listExpenses.url])
        router.push(routes.campaigns.viewExpenses(slug))
        AlertStore.show(id ? t('alerts.edit-row.success') : t('alerts.new-row.success'), 'success')
      },
    },
  )

  const downloadExpensesFileHandler = async (file: ExpenseFile) => {
    downloadCampaignExpenseFile(file.id, session)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${file.filename}`)
        link.click()
      })
      .catch((error) => {
        AlertStore.show(t('common:alerts.error'), 'error')
        console.error(error)
      })
  }

  const deleteFileHandler = async (fileToDelete: ExpenseFile) => {
    if (confirm(t('deleteTitle'))) {
      setFilesToDelete((prevFiles) => [...prevFiles, fileToDelete.id])
    }
  }

  function expenseFilesFiltered() {
    if (!expenseFiles) {
      return []
    }

    if (filesToDelete.length == 0) {
      return expenseFiles
    }

    return expenseFiles?.filter((file) => !filesToDelete.includes(file.id))
  }

  async function onSubmit(data: ExpenseInput, { setFieldError }: FormikHelpers<ExpenseInput>) {
    if (filesToUpload.length == 0 && expenseFilesFiltered().length == 0) {
      AlertStore.show(t('expenses:alerts.no-files-uploaded'), 'error')
      return false
    }

    try {
      if (data.documentId == '') {
        data.documentId = null
      }

      data.approvedById = approvedBy

      if (data.spentAt.length == 10) {
        data.spentAt = data.spentAt + 'T00:00:00.000Z'
      }

      data.amount = toMoney(data.money)

      const response = await mutation.mutateAsync(data)

      if (filesToUpload.length > 0) {
        await fileUploadMutation.mutateAsync({
          files: filesToUpload,
          expenseId: response.data.id,
        })
      }

      for (const fileToDelete of filesToDelete) {
        await deleteExpenseFile(fileToDelete, session)
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }

  if (!campaignResponse?.campaign.defaultVault) {
    //return an error if there is no default vault for the campaign
    return <div> {t('expenses:errors.no-default-vault')} </div>
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          {id ? t('headings.edit') : t('headings.add')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={6}>
            <ExpenseTypeSelect />
          </Grid>
          <Grid item xs={6}>
            <FormDatePicker name="spentAt" label={t('expenses:fields.date')} />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="number" name="money" label="expenses:fields.amount" />
          </Grid>
          <Grid item xs={3}>
            <CurrencySelect disabled={true} />
          </Grid>
          <Grid item xs={3}>
            {t('expenses:fields.approved')}:
            <Checkbox
              name="approved"
              value={approvedBy ? true : false}
              checked={approvedBy ? true : false}
              disabled={!canApprove}
              onChange={(checkbox, val) => {
                setApprovedBy(val && person ? person.id : null)
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FileUpload
              buttonLabel="Добави документи"
              onUpload={(newFiles) => {
                setFilesToUpload((prevFiles) => [...prevFiles, ...newFiles])
              }}
            />
            {filesToUpload.length > 0 ? (
              <Typography component="h4" sx={{ textAlign: 'center', paddingTop: 2 }}>
                {t('expenses:new-files')}:
              </Typography>
            ) : (
              ''
            )}
            <FileList
              files={filesToUpload}
              filesRole={[]}
              onDelete={(deletedFile) =>
                setFilesToUpload((prevFiles) =>
                  prevFiles.filter((file) => file.name !== deletedFile.name),
                )
              }
              onSetFileRole={() => {
                return undefined
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="string"
              name="description"
              label="expenses:fields.description"
              multiline
              rows={5}
            />
          </Grid>
          <Grid item xs={12}>
            {expenseFilesFiltered().length > 0 ? (
              <Typography component="h4" sx={{ textAlign: 'center' }}>
                {t('expenses:uploaded-files')}:
              </Typography>
            ) : (
              ''
            )}

            {expenseFilesFiltered().length == 0 && filesToUpload.length == 0 ? (
              <Typography component="h4" sx={{ textAlign: 'center', color: 'red' }}>
                {t('expenses:alerts.no-files-uploaded')}
              </Typography>
            ) : (
              ''
            )}

            {expenseFilesFiltered().map((file, key) => (
              <Typography
                variant="h5"
                component="h2"
                key={key}
                sx={{ marginBottom: 2, textAlign: 'center' }}>
                <Tooltip title={t('tooltips.download')}>
                  <Button onClick={() => downloadExpensesFileHandler(file)}>{file.filename}</Button>
                </Tooltip>
                <Tooltip title={t('tooltips.delete')}>
                  <Button onClick={() => deleteFileHandler(file)}>
                    <DeleteForeverIcon />
                  </Button>
                </Tooltip>
              </Typography>
            ))}
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={'expenses:btns.save'} />
          </Grid>
          <Grid item xs={6}>
            <LinkButton
              fullWidth
              variant="contained"
              color="primary"
              href={routes.admin.expenses.index}>
              {t('btns.cancel')}
            </LinkButton>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
