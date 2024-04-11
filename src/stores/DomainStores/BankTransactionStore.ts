import { action, computed, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'
import { BankTransactionsInput } from 'gql/bank-transactions'
import { BankDonationStatus, BankTransactionType } from 'gql/bank-transactions'

enableStaticRendering(typeof window === 'undefined')

export class BankTransactionStore {
  bankTransactions: BankTransactionsInput[] = []
  bankTransactionsFilter: {
    type: BankTransactionType | ''
    status: BankDonationStatus | null
    date: {
      from?: Date | ''
      to?: Date | ''
    }
  } = {
    type: '',
    status: '',
    date: {
      from: '',
      to: '',
    },
  }
  bankTransactionSearch: string | undefined = undefined

  constructor() {
    makeObservable(this, {
      bankTransactionsFilter: observable,
      bankTransactionSearch: observable,
      setBankTransactionFilters: action,
      getBankTransactionsFilter: computed,
      setBankTransactionSearch: action,
      getBankTransactionSearch: computed,
    })
  }

  clear() {
    this.bankTransactions = []
  }

  setBankTransactions(transactions: BankTransactionsInput[]) {
    this.bankTransactions = transactions
  }

  setBankTransactionFilters(
    key: keyof typeof this.bankTransactionsFilter,
    value: string & null & { from: Date; to: Date },
  ) {
    this.bankTransactionsFilter[key] = value
  }

  setBankTransactionSearch(value: string | undefined) {
    this.bankTransactionSearch = value
  }

  get getBankTransactions() {
    return this.bankTransactions
  }

  get getBankTransactionsFilter() {
    return this.bankTransactionsFilter
  }

  get getBankTransactionSearch() {
    return this.bankTransactionSearch
  }
}
