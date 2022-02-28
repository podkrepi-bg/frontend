import {
  TaskAlt,
  AssignmentInd,
  People,
  ContactPhone,
  Payment,
  Group,
  FolderShared,
  Public,
} from '@mui/icons-material'
import { routes } from 'common/routes'

export const menuItems = [
  { label: 'Задачи', icon: TaskAlt, href: '#' },
  { label: 'Кампании', icon: AssignmentInd, href: '#' },
  { label: 'Доброволци', icon: People, href: routes.admin.supporters },
  { label: 'Контакти', icon: ContactPhone, href: routes.admin.infoRequests },
  { label: 'Плащания', icon: Payment, href: routes.admin.bankaccounts.index },
  { label: 'Потребители', icon: Group, href: '#' },
  { label: 'Документи', icon: FolderShared, href: routes.admin.documents.index },
  { label: 'Държави', icon: Public, href: routes.admin.countries.index },
  { label: 'Координатори', icon: People, href: routes.admin.coordinators.index },
]
