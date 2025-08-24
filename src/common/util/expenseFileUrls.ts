import { API_URL } from 'service/apiClient'

export function expenseFileUrl(fileId: string) {
  return `${API_URL}/expenses/download-file/${fileId}`
}
