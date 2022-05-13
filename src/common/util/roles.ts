import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export type RealmRole =
  | 'view-supporters'
  | 'view-contact-requests'
  | 'team-support'
  | 'offline_access'
  | 'default-roles-webapp-dev'
  | 'uma_authorization'

export type ResourceRole =
  | 'view-profile'
  | 'account-view-supporters'
  | 'account-view-contact-requests'
  | 'manage-account'
  | 'manage-account-links'

export const roles = {
  resource: {
    ViewContactRequests: <const>'account-view-contact-requests',
    ViewSupporters: <const>'account-view-supporters',
  },
  realm: {
    RealmViewContactRequests: <const>'view-contact-requests',
    RealmViewSupporters: <const>'view-supporters',
  },
}

export const hasResourceRole = (session: Session | JWT, role: ResourceRole): boolean => {
  return session.user.resource_access.account.roles.includes(role)
}
export const hasRealmRole = (session: Session | JWT, role: RealmRole): boolean => {
  return session.user.realm_access.roles.includes(role)
}

export const canViewContactRequests = (session: Session | JWT): boolean => {
  return (
    hasResourceRole(session, roles.resource.ViewContactRequests) ||
    hasRealmRole(session, roles.realm.RealmViewContactRequests)
  )
}

export const canViewSupporters = (session: Session | JWT): boolean => {
  return (
    hasResourceRole(session, roles.resource.ViewSupporters) ||
    hasRealmRole(session, roles.realm.RealmViewSupporters)
  )
}

export const isAdmin = (session: Session | JWT | null): boolean => {
  if (!session) return false
  return canViewContactRequests(session) && canViewSupporters(session)
}
