import { apiHandler } from 'server/backend-api'
import { endpoints } from 'common/api-endpoints'

export default apiHandler(endpoints.auth.login.url)
