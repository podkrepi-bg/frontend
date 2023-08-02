import { OneTimeDonation } from 'gql/donations'
import { useState } from 'react'

const PREFIX = 'donation-session-'

type DonationSession = {
  values: OneTimeDonation
  step: number
}

function createSessionObject(
  campaignSlug: string,
  values: OneTimeDonation,
  step: number,
): DonationSession {
  const donationSession = sessionStorage.getItem(PREFIX + campaignSlug)
  //Session already exists do nothing
  if (donationSession) return JSON.parse(donationSession)
  const sessionObj = { values, step }
  sessionStorage.setItem(PREFIX + campaignSlug, JSON.stringify(sessionObj))
  return sessionObj
}

function updateSessionObject(
  campaignSlug: string,
  values: OneTimeDonation,
  step: number,
): DonationSession {
  const donationSession = sessionStorage.getItem(PREFIX + campaignSlug)
  if (!donationSession) {
    // if session does not exist create new one.
    return createSessionObject(campaignSlug, values, step)
  }

  const newSessionObj = { values, step }
  sessionStorage.setItem(PREFIX + campaignSlug, JSON.stringify(newSessionObj))
  return newSessionObj
}

function getSessionObject(campaignSlug: string): DonationSession | null {
  const donationSession = sessionStorage.getItem(PREFIX + campaignSlug)
  if (!donationSession) return null
  return JSON.parse(donationSession)
}

function destroySessionObject(campaignSlug: string): void {
  sessionStorage.removeItem(PREFIX + campaignSlug)
}

export function useDonationStepSession(campaignSlug: string) {
  const sessionObj = getSessionObject(campaignSlug)
  const [donationSession, setDonationSession] = useState<DonationSession | null>(sessionObj)

  const updateDonationSession = (value: OneTimeDonation, step: number) => {
    const newSessionObj = updateSessionObject(campaignSlug, value, step)
    setDonationSession(newSessionObj)
  }

  const clearDonationSession = () => {
    destroySessionObject(campaignSlug)
    setDonationSession(null)
  }

  return [donationSession, { updateDonationSession, clearDonationSession }] as const
}
