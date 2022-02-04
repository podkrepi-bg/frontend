import React from 'react'
import * as yup from 'yup'
import { Button, Grid, Typography } from '@mui/material'
import { MyRadio, MyTextField } from './CustomComponents'
import { Form, Formik, FormikHelpers } from 'formik'
import { ContactFormData, ContactRequestInput, ContactRequestResponse } from 'gql/contact'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { AlertStore } from 'stores/AlertStore'
import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import { createContactRequest } from 'common/rest'
import { useTranslation } from 'next-i18next'
import { bankAccountResponse } from 'gql/bankAccounts'
import { createBankAccountRequest } from 'common/rest'
import { NotificationStore } from 'stores/cars/NotificationsStore'
import { observer } from 'mobx-react'
import router from 'next/router'
import { MutationResultParams, useMutateBankAccounts } from 'common/hooks/cars'
import { endpoints } from 'common/api-endpoints'
export type bankAccountType = {
  status: BankAccountStatus
  ibanNumber: string
  accountHolderName: string
  accountHolderType: AccountHolderType
  bankName?: string
  bankIdCode?: string
  fingerprint?: string
  withdrawal?: string
}
export enum BankAccountStatus {
  new,
  validated,
  verified,
  verification_failed,
  errored,
}
export enum AccountHolderType {
  individual,
  company,
}
const initialValues: bankAccountType = {
  status: BankAccountStatus.new,
  ibanNumber: '',
  accountHolderName: '',
  accountHolderType: AccountHolderType.individual,
  bankName: '',
  bankIdCode: '',
  fingerprint: '',
  withdrawal: '',
}
const items = [
  { label: 'IBAN', name: 'ibanNumber', type: 'input' },
  { label: 'Account Holder', name: 'accountHolderName', type: 'input' },
  { label: 'Bank name', name: 'bankName', type: 'input' },
  { label: 'Bank ID', name: 'bankIdCode', type: 'input' },
  { label: 'Fingerprint', name: 'fingerprint', type: 'input' },
  { label: 'Withdrawal', name: 'withdrawal', type: 'input' },
]

export default observer(function AddBankAccountForm() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { openNotifications, setMessage } = NotificationStore
  const onSubmit = async (newAccount: bankAccountType) => {
    return await axios.post('http://localhost:5010/api/bankaccount', newAccount)
  }
  //edit handler
  const { mutate }: { mutate: any } = useMutateBankAccounts(
    onSubmit,
    queryClient,
    openNotifications,
    setMessage,
    null,
    router,
  )

  const validationSchema = yup.object({
    ibanNumber: yup.string().required('IBAN is required'),
    accountHolderName: yup.string().required('Account name is required'),
  })

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) => mutate(data)}>
        {() => (
          <Form>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ pt: 4 }} textAlign={'center'}>
                  Add Bank Account
                </Typography>
              </Grid>
              {items.map((item) => (
                <Grid item xs={12}>
                  <MyTextField label={item.label} name={item.name} type={item.type} />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Typography variant="h6">Status</Typography>
                <MyRadio name="status" type="radio" value="new" label="New" />
                <MyRadio name="status" type="radio" value="validated" label="Validated" />
                <MyRadio name="status" type="radio" value="verified" label="Verified" />
                <MyRadio
                  name="status"
                  type="radio"
                  value="verification_failed"
                  label="Verification Failed"
                />
                <MyRadio name="status" type="radio" value="errored" label="Errored" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Аccount holder type</Typography>
                <MyRadio
                  name="accountHolderType"
                  type="radio"
                  value="individual"
                  label="Individual"
                />
                <MyRadio name="accountHolderType" type="radio" value="company" label="Company" />
              </Grid>
              <Grid sx={{ mt: 5 }} container justifyContent="space-evenly">
                <Grid item xs={5}>
                  <Button variant="outlined" type="submit" fullWidth>
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    onClick={() => {
                      router.push('/tasks')
                    }}
                    variant="outlined"
                    fullWidth>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  )
})
