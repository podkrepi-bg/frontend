import React from 'react'
import { useMutation, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, Typography } from '@mui/material'

import {
  ExpenseInput,
  ExpenseStatus,
  ExpenseType,
  ExpenseCurrency,
  ExpenseResponse,
} from 'gql/expenses'
import { useViewExpense } from 'common/hooks/expenses'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useCreateExpense, useEditExpense } from 'service/expense'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'

const validTypes = Object.values(ExpenseType).map((e) => e.toString())
const validStatuses = Object.values(ExpenseStatus).map((e) => e.toString())
const validCurrencies = Object.values(ExpenseCurrency).map((e) => e.toString())

const validationSchema = yup
  .object()
  .defined()
  .shape({
    type: yup.string().trim().oneOf(validTypes).required(),
    status: yup.string().trim().oneOf(validStatuses).required(),
    currency: yup.string().trim().oneOf(validCurrencies).required(),
    amount: yup.number().positive().integer().required(),
    vaultId: yup.string().trim().uuid().required(),
    deleted: yup.boolean().required(),
    description: yup.string().trim().notRequired(),
    documentId: yup.string().trim().uuid().notRequired(),
    approvedById: yup.string().trim().uuid().notRequired(),
  })

export default function Form() {
  const router = useRouter()
  const { t } = useTranslation('expenses')

  let id = router.query.id

  let initialValues: ExpenseInput = {
    type: ExpenseType.none,
    status: ExpenseStatus.pending,
    currency: ExpenseCurrency.BGN,
    amount: 0,
    vaultId: '',
    deleted: false,
    description: '',
    documentId: '',
    approvedById: '',
  }

  if (id) {
    id = String(id)
    const { data }: UseQueryResult<ExpenseResponse> = useViewExpense(id)

    initialValues = {
      type: data?.type || initialValues.type,
      status: data?.status || initialValues.status,
      currency: data?.currency || initialValues.currency,
      amount: data?.amount || initialValues.amount,
      vaultId: data?.vaultId || initialValues.vaultId,
      deleted: data?.deleted || initialValues.deleted,
      description: data?.description || initialValues.description,
      documentId: data?.documentId || initialValues.documentId,
      approvedById: data?.approvedById || initialValues.approvedById,
    }
  }

  //in progress...

  return <></>
}
