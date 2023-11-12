import { useCallback, useEffect, useState } from 'react'

type CopyStatus = 'inactive' | 'copied' | 'failed'

export const useCopyToClipboard = (
  notifyTimeout = 2500,
): [CopyStatus, (copyText: string) => void] => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('inactive')
  const copy = useCallback((copyText: string) => {
    navigator.clipboard.writeText(copyText).then(
      () => setCopyStatus('copied'),
      () => setCopyStatus('failed'),
    )
  }, [])

  useEffect(() => {
    if (copyStatus === 'inactive') {
      return
    }

    const timeoutId = setTimeout(() => setCopyStatus('inactive'), notifyTimeout)

    return () => clearTimeout(timeoutId)
  }, [copyStatus])

  return [copyStatus, copy]
}
