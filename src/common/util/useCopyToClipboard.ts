import { useCallback, useEffect, useState } from 'react'

type CopyStatus = 'inactive' | 'copied' | 'failed'

export const useCopyToClipboard = (
  text: string,
  notifyTimeout = 2500,
): [CopyStatus, () => void] => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('inactive')
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => setCopyStatus('copied'),
      () => setCopyStatus('failed'),
    )
  }, [text])

  useEffect(() => {
    if (copyStatus === 'inactive') {
      return
    }

    const timeoutId = setTimeout(() => setCopyStatus('inactive'), notifyTimeout)

    return () => clearTimeout(timeoutId)
  }, [copyStatus])

  return [copyStatus, copy]
}
