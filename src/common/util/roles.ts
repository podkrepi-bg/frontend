import { Session } from 'next-auth'

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

export const hasResourceRole = (session: Session, role: ResourceRole): boolean => {
  return session.user ? session.user.resource_access.account.roles.includes(role) : false
}
export const hasRealmRole = (session: Session, role: RealmRole): boolean => {
  return session.user ? session.user.realm_access.roles.includes(role) : false
}

export const canViewContactRequests = (session: Session): boolean => {
  return (
    hasResourceRole(session, roles.resource.ViewContactRequests) ||
    hasRealmRole(session, roles.realm.RealmViewContactRequests)
  )
}

export const canViewSupporters = (session: Session): boolean => {
  return (
    hasResourceRole(session, roles.resource.ViewSupporters) ||
    hasRealmRole(session, roles.realm.RealmViewSupporters)
  )
}

export const isAdmin = (session: Session | null): boolean => {
  if (!session) return false
  return canViewContactRequests(session) && canViewSupporters(session)
}
