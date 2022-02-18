import {
  TaskAlt,
  AssignmentInd,
  People,
  ContactPhone,
  Payment,
  Group,
  FolderShared,
} from '@mui/icons-material'
import { routes } from 'common/routes'

export const menuItems = [
  { label: 'Задачи', icon: TaskAlt, href: '#test' },
  { label: 'Кампании', icon: AssignmentInd, href: '#test' },
  { label: 'Доброволци', icon: People, href: routes.admin.supporters },
  { label: 'Контакти', icon: ContactPhone, href: routes.admin.infoRequests },
  { label: 'Плащания', icon: Payment, href: routes.admin.bankaccounts.index },
  { label: 'Потребители', icon: Group, href: '#test' },
  { label: 'Документи', icon: FolderShared, href: routes.documents.index },
]
