export type Session = {
  user?: {
    name: string
    email: string
    image: string
  }
}
export function useSession(): { session: Session | null } {
  return { session: null }
}

export default { useSession }
