import { test, expect } from '../../../utils/fixtures'

test.describe('Create campaign application', () => {
  test('should see list of applications', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/admin/campaign-applications`)

    await expect(page.getByRole('heading')).toHaveText('Кандидат Кампании')
    // await expect(page.getByRole('row')).toHaveCount(1); // just title b/c no campaign applications yet
  })
})
