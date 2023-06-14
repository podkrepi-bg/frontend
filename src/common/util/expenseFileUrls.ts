import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export function expenseFileUrl(fileId: string) {
  return `${publicRuntimeConfig.API_URL}/expenses/download-file/${fileId}`
}
