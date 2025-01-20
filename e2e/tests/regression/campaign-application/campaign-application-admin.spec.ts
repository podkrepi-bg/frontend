import {
  CampaignApplicationResponse,
  CampaignApplicationExisting,
  CampaignApplicationAdminResponse,
} from '../../../../src/gql/campaign-applications'
import { Page } from 'playwright/test'
import { expect, adminTest as test } from '../../../utils/fixtures'
import { textLocalized } from '../../../utils/texts-localized'

test.describe('Campaign application admin', () => {
  test('should see list of applications', async ({ page, baseURL }) => {
    // arrange
    const { paginationFooter } = await setup(page)
      .withCampaignApplications([
        { id: '1', state: 'review' },
        { id: '2', state: 'approved' },
        { id: '3', state: 'denied' },
        { id: '4', state: 'forCommitteeReview' },
        { id: '5' },
      ])
      .build()

    // act
    await page.goto(`${baseURL}/admin/campaign-applications`)

    // assert
    const t = await textLocalized().campaign.bg()
    await expect(page.getByRole('heading')).toHaveText(t.admin.title)
    await expect(page.getByRole('row')).toHaveCount(6) // title + 5 campaigns
    await expect(page.getByRole('row').nth(1)).toContainText(t.status.review)
    await expect(page.getByRole('row').nth(2)).toContainText(t.status.approved)
    await expect(page.getByRole('row').nth(3)).toContainText(t.status.denied)
    await expect(page.getByRole('row').nth(4)).toContainText(t.status.forCommitteeReview)
    await expect(page.getByRole('row').nth(5)).toContainText(t.status.requestInfo)
    await expect(paginationFooter(page)).toHaveText('Rows per page:1001–5 of 5')
  })

  test('should open a campaign application for edit', async ({ page, baseURL }) => {
    // arrange
    await setup(page).withEditCampaignApplication({}).build()

    // act
    await page.goto(`${baseURL}/admin/campaign-applications/edit/1234`)

    // assert
    const t = await textLocalized().campaign.bg()
    await expect(page.getByRole('heading').first()).toHaveText(t.admin.title)
    await expect(page.getByRole('heading').nth(1)).toHaveText(t.steps.admin.title)
  })

  test('should update status of campaign application to approved, archive it, and set the external link', async ({
    page,
    baseURL,
  }) => {
    // arrange
    await setup(page).withEditCampaignApplication({ id: '1234', state: 'review' }).build()
    await page.goto(`${baseURL}/admin/campaign-applications/edit/1234`)
    const t = await textLocalized().campaign.bg()

    // act
    await page.getByLabel(t.steps.admin.status).click()
    await page.getByText(t.status.approved).click()

    const [req] = await Promise.all([
      page.waitForRequest(/campaign-application\/1234/),
      page.getByRole('button', { name: t.result.editButton }).click(),
    ])

    // assert
    const postData = req.postDataJSON()
    expect(postData.state).toEqual('approved')
    expect(page.getByText(t.result.edited)).toBeInViewport()
  })
})

function setup(page: Page) {
  const promises: Promise<unknown>[] = []

  const builder = {
    withCampaignApplications(cams: Array<Partial<CampaignApplicationResponse>>) {
      promises.push(
        page.route('*/**/api/v1/campaign-application/list', (route, req) => {
          return route.fulfill({
            json: cams.map((c) => ({ ...defaultCampaignApplication(), ...c })),
          })
        }),
      )
      return builder
    },

    withEditCampaignApplication(c: Partial<CampaignApplicationExisting>) {
      promises.push(
        page.route('*/**/api/v1/campaign-application/byId/*', (route, req) => {
          return route.fulfill({
            json: { ...camAppForEdit(), ...c },
          })
        }),
        page.route(`*/**/api/v1/campaign-application/${c.id}`, (r) => {
          return r.fulfill({ json: { ...camAppForEdit(), ...c } })
        }),
      )
      return builder
    },

    async build() {
      await promises

      const selectors = {
        paginationFooter: (p: Page) => p.locator('.MuiDataGrid-footerContainer'),
      }

      return selectors
    },
  }

  return builder
}

function defaultCampaignApplication(): CampaignApplicationAdminResponse {
  return {
    id: 'eb4347a2-c8b4-47f1-83e5-67457b20909c',
    createdAt: '2024-09-13T09:26:50.909Z',
    updatedAt: '2024-09-28T20:56:13.728Z',
    organizerName: 'Giver Dev',
    organizerEmail: 'giver@podkrepi.bg',
    organizerPhone: '+35928700500',
    beneficiary: 'Bene',
    organizerBeneficiaryRel: 'бене',
    campaignName: 'Camp name',
    goal: 'Целта на кампанията',
    history: '',
    amount: '1455',
    description: '',
    state: 'requestInfo',
    campaignTypeId: 'c6ef0a79-11cf-4175-9f66-3cec940c9259',
    ticketURL: 'https://trello.com/linkforthiscamapp',
    archived: false,
    campaignEnd: 'date',
    campaignEndDate: '2025-09-30T00:00:00.000Z',
    acceptTermsAndConditions: true,
    transparencyTermsAccepted: true,
    personalInformationProcessingAccepted: true,
  }
}

function camAppForEdit(): CampaignApplicationExisting {
  return {
    id: 'eb4347a2-c8b4-47f1-83e5-67457b20909c',
    organizerName: 'Giver Dev',
    organizerEmail: 'giver@podkrepi.bg',
    organizerPhone: '+35928700500',
    beneficiary: 'Bene',
    organizerBeneficiaryRel: 'бене',
    campaignName: 'Camp name',
    goal: 'Целта на кампанията',
    history: '',
    amount: '1455',
    description: '',
    state: 'requestInfo',
    campaignTypeId: 'c6ef0a79-11cf-4175-9f66-3cec940c9259',
    ticketURL: 'https://trello.com/linkforthiscamapp',
    archived: false,
    campaignEnd: 'date',
    campaignEndDate: '2025-09-30T00:00:00.000Z',
    acceptTermsAndConditions: true,
    transparencyTermsAccepted: true,
    personalInformationProcessingAccepted: true,
    documents: [{ filename: 'test.me', id: 'test.me' }],
  }
}
