import {
  AssignmentInd,
  People,
  ContactPhone,
  Payment,
  Group,
  FolderShared,
  Public,
  Paid,
  Class,
  Shield,
  MoveUp,
  VolunteerActivism,
  DisplaySettings,
  RequestQuote,
} from '@mui/icons-material'
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined'
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'

import { routes } from 'common/routes'
import BeneficiaryIcon from 'common/icons/Beneficiary'

export const menuPeople = [
  { label: 'Контакти', icon: ContactPhone, href: routes.admin.infoRequests },
  { label: 'Бенефактори', icon: BeneficiaryIcon, href: routes.admin.benefactor.index },
  { label: 'Бенефициенти', icon: BeneficiaryIcon, href: routes.admin.beneficiary.index },
  { label: 'Координатори', icon: People, href: routes.admin.coordinators.index },
  { label: 'Потребители', icon: Group, href: routes.admin.person.index },
  { label: 'ЮЛНЦ', icon: Group, href: routes.admin.company.create },
  { label: 'Доброволци', icon: People, href: routes.admin.supporters },
  { label: 'Организатори', icon: Group, href: routes.admin.organizers.index },
]
export const menuCampaings = [
  { label: 'Кампании', icon: AssignmentInd, href: routes.admin.campaigns.index },
  { label: 'Документи', icon: FolderShared, href: routes.admin.documents.index },
  { label: 'Злоупотреби', icon: ReportGmailerrorredIcon, href: routes.admin.irregularity.index },
]

export const menuPayments = [
  { label: 'Дарения', icon: VolunteerActivismOutlinedIcon, href: routes.admin.donations.index },
  { label: 'Трезори', icon: Shield, href: routes.admin.vaults.index },
  { label: 'Банкови сметки', icon: Payment, href: routes.admin.bankaccounts.index },
  { label: 'Преводи', icon: LocalAtmIcon, href: routes.admin.withdrawals.index },
  { label: 'Прехвърляния', icon: MoveUp, href: routes.admin.transfer.index },
  { label: 'Разходи', icon: Paid, href: routes.admin.expenses.index },
  {
    label: 'Повтарящи се дарения',
    icon: VolunteerActivism,
    href: routes.admin.recurringDonation.index,
  },
]

export const menuSetings = [
  { label: 'Градове', icon: LocationCityRoundedIcon, href: routes.admin.cities.home },
  { label: 'Държави', icon: Public, href: routes.admin.countries.index },
  { label: 'Типове кампании', icon: Class, href: routes.admin.campaignTypes.index },
]

export const items = [
  { items: menuPeople, menu: 'Хора', icon: People },
  { items: menuCampaings, menu: 'Кампании', icon: AssignmentInd },
  { items: menuPayments, menu: 'Плащания', icon: Payment },
  { items: menuSetings, menu: 'Системни', icon: DisplaySettings },
]

export const adminCards = [
  { label: 'Кампании', icon: AssignmentInd, href: routes.admin.campaigns.index },
  { label: 'Дарения', icon: VolunteerActivismOutlinedIcon, href: routes.admin.donations.index },
  { label: 'Бенефициенти', icon: BeneficiaryIcon, href: routes.admin.beneficiary.index },
  { label: 'Координатори', icon: People, href: routes.admin.coordinators.index },
  { label: 'Организатори', icon: Group, href: routes.admin.organizers.index },
  { label: 'ЮЛНЦ', icon: Group, href: routes.admin.company.create },
  { label: 'Банкови сметки', icon: Payment, href: routes.admin.bankaccounts.index },
  { label: 'Банкови транзакции', icon: RequestQuote, href: routes.admin.bankTransactions.index },
  { label: 'Преводи', icon: LocalAtmIcon, href: routes.admin.withdrawals.index },
  { label: 'Разходи', icon: Paid, href: routes.admin.expenses.index },
  { label: 'Трезори', icon: Shield, href: routes.admin.vaults.index },
  { label: 'Прехвърляния', icon: MoveUp, href: routes.admin.transfer.index },
  {
    label: 'Повтарящо се дарение',
    icon: VolunteerActivism,
    href: routes.admin.recurringDonation.index,
  },
  { label: 'Доброволци', icon: People, href: routes.admin.supporters },
  { label: 'Контакти', icon: ContactPhone, href: routes.admin.infoRequests },
  { label: 'Потребители', icon: Group, href: routes.admin.person.index },
  { label: 'Документи', icon: FolderShared, href: routes.admin.documents.index },
  { label: 'Бенефактори', icon: BeneficiaryIcon, href: routes.admin.benefactor.index },
  { label: 'Типове кампании', icon: Class, href: routes.admin.campaignTypes.index },
  { label: 'Градове', icon: LocationCityRoundedIcon, href: routes.admin.cities.home },
  { label: 'Държави', icon: Public, href: routes.admin.countries.index },

  { label: 'Злоупотреби', icon: ReportGmailerrorredIcon, href: routes.admin.irregularity.index },
]
