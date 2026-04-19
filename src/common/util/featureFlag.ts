import getConfig from 'next/config'
import { Session } from 'next-auth'

import {
  isAdmin,
  SessionRoles,
  RealmRole,
  ResourceRole,
  hasRealmRole,
  hasResourceRole,
} from './roles'

const { publicRuntimeConfig } = getConfig() || {}

export enum Features {
  CAMPAIGN = 'CAMPAIGN',
  DUAL_CURRENCY = 'DUAL_CURRENCY',
  IRISPAY = 'IRISPAY',
}

type RoleGate = {
  realmRoles?: RealmRole[]
  resourceRoles?: ResourceRole[]
  requireAdmin?: boolean
}

/**
 * Role-gated feature configuration.
 * Only add entries here for features that should be restricted by role.
 * Features not listed here fall back to the global env-based flag.
 */
const roleGatedFeatures: Partial<Record<Features, RoleGate>> = {
  [Features.IRISPAY]: { realmRoles: ['beta-tester'] },
}

const featureEnvMap: Record<Features, string | undefined> = {
  [Features.CAMPAIGN]: process.env.NEXT_PUBLIC_FEATURE_CAMPAIGN,
  [Features.DUAL_CURRENCY]: process.env.NEXT_PUBLIC_FEATURE_DUAL_CURRENCY,
  [Features.IRISPAY]: process.env.NEXT_PUBLIC_FEATURE_DUAL_CURRENCY,
}

export const featureFlagEnabled = (flagName: Features): boolean => {
  return Boolean(featureEnvMap[flagName])
}

export const featureEnabledForSession = (flagName: Features, session: Session | null): boolean => {
  // Global flag must be on first
  if (!featureFlagEnabled(flagName)) return false

  const gate = roleGatedFeatures[flagName]
  // No role gate configured — available to everyone
  if (!gate) return true

  // Role gate configured but no session — deny
  if (!session?.user) return false

  if (gate.requireAdmin) return isAdmin(session)

  const sessionRoles: SessionRoles = {
    realmRoles: session.user?.realm_access?.roles ?? [],
    resourceRoles: session.user?.resource_access?.account?.roles ?? [],
  }

  const hasRequiredRealm =
    !gate.realmRoles?.length || gate.realmRoles.some((role) => hasRealmRole(sessionRoles, role))

  const hasRequiredResource =
    !gate.resourceRoles?.length ||
    gate.resourceRoles.some((role) => hasResourceRole(sessionRoles, role))

  return hasRequiredRealm && hasRequiredResource
}
