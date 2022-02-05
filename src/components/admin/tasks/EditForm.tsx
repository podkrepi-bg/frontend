import React from 'react'
import * as yup from 'yup'
import { Button, Container, Grid, Typography } from '@mui/material'
import { MyRadio, MyTextField } from './helpers/CustomComponents'
import { Form, Formik, FormikHelpers } from 'formik'
import { axios } from 'common/api-client'
import { UseMutateFunction, useMutation, useQueryClient, UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'
import { NotificationStore } from 'stores/cars/NotificationsStore'
import { observer } from 'mobx-react'
import router, { useRouter } from 'next/router'
import { MutationResultParams, useMutateBankAccounts, useViewBankAccount } from 'common/hooks/cars'
import { endpoints } from 'common/api-endpoints'
import LayoutPanel from '../navigation/LayoutPanel'
import { bankAccountResponse } from 'gql/bankAccounts'

export type bankAccountType = {
  status: BankAccountStatus
  ibanNumber: string
  accountHolderName: string
  accountHolderType: AccountHolderType
  bankName?: string
  bankIdCode?: string
  fingerprint?: string
  withdrawal: string
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

export default observer(function EditBankAccount() {
  const router = useRouter()
  const carId = String(router.query.id)

  const { data }: UseQueryResult<bankAccountResponse> = useViewBankAccount(carId)
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { openNotifications, setMessage } = NotificationStore
  const onSubmit = async (newAccount: bankAccountType) => {
    return await axios.patch(endpoints.bankAccounts.editBankAccount(carId).url, newAccount)
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
    ibanNumber: yup.string().required(),
    accountHolderName: yup.string().required(),
    status: yup.string().required(),
    accountHolderType: yup.string().required(),
    bankName: yup.string().required(),
    bankIdCode: yup.string().required(),
    fingerprint: yup.string().required(),
    withdrawal: yup.string().required(),
  })

  return (
    <LayoutPanel>
      <Container maxWidth="sm">
        <div>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(data) => mutate(data)}>
            {() => (
              <Form>
                <Grid container direction="column" spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4" sx={{ pt: 4 }} textAlign={'center'}>
                      Edit Bank Account
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
                    <MyRadio
                      name="accountHolderType"
                      type="radio"
                      value="company"
                      label="Company"
                      checked={true}
                    />
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
      </Container>
    </LayoutPanel>
  )
})
