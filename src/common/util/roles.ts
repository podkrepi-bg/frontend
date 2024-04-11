import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export type SessionRoles = {
  realmRoles: RealmRole[] | undefined
  resourceRoles: ResourceRole[] | undefined
}
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

export const hasResourceRole = (sessionRoles: SessionRoles, role: ResourceRole): boolean => {
  return sessionRoles.resourceRoles ? sessionRoles.resourceRoles.includes(role) : false
}
export const hasRealmRole = (sessionRoles: SessionRoles, role: RealmRole): boolean => {
  return sessionRoles.realmRoles ? sessionRoles.realmRoles.includes(role) : false
}

export const canViewContactRequests = (sessionRoles: SessionRoles): boolean => {
  return (
    hasResourceRole(sessionRoles, roles.resource.ViewContactRequests) ||
    hasRealmRole(sessionRoles, roles.realm.RealmViewContactRequests)
  )
}

export const canViewSupporters = (sessionRoles: SessionRoles): boolean => {
  return (
    hasResourceRole(sessionRoles, roles.resource.ViewSupporters) ||
    hasRealmRole(sessionRoles, roles.realm.RealmViewSupporters)
  )
}

export const isAdmin = (session: Session | JWT | null): boolean => {
  if (session && session.user) {
    const sessionRoles: SessionRoles = {
      realmRoles: session.user?.realm_access?.roles ?? [],
      resourceRoles: session.user?.resource_access?.account?.roles ?? [],
    }
    return canViewContactRequests(sessionRoles) && canViewSupporters(sessionRoles)
  }
  return false
}
