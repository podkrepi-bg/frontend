import { KeycloakInstance } from 'keycloak-js'

export const roles = {
  resource: {
    ViewContactRequests: 'account-view-contact-requests',
    ViewSupporters: 'account-view-supporters',
  },
  realm: {
    RealmViewContactRequests: 'view-contact-requests',
    RealmViewSupporters: 'view-supporters',
  },
}

export const canViewContactRequests = (keycloak: KeycloakInstance) => {
  return (
    keycloak.hasResourceRole(roles.resource.ViewContactRequests) ||
    keycloak.hasRealmRole(roles.realm.RealmViewContactRequests)
  )
}

export const canViewSupporters = (keycloak: KeycloakInstance) => {
  return (
    keycloak.hasResourceRole(roles.resource.ViewSupporters) ||
    keycloak.hasRealmRole(roles.realm.RealmViewSupporters)
  )
}

export const isAdmin = (keycloak: KeycloakInstance) => {
  return canViewContactRequests(keycloak) && canViewSupporters(keycloak)
}
