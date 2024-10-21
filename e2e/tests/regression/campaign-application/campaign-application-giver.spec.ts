import { Page } from 'playwright/test'
import { expect, giverTest as test } from '../../../utils/fixtures'
import { textLocalized } from '../../../utils/texts-localized'

test.describe('Campaign application giver', () => {
  test('should see the first step - organizer - of create campaign application wizard and after accepting the terms to be able to go to step 2', async ({
    page,
    baseURL,
  }) => {
    // arrange
    // act
    await page.goto(`${baseURL}/campaigns/application`)

    // assert
    const t = await textLocalized().campaign.bg()
    await expect(page.getByRole('heading')).toHaveText(t.steps.organizer.title)

    await page.getByRole('checkbox').first().click()
    await page.getByRole('checkbox').nth(1).click()
    await page.getByRole('checkbox').nth(2).click()

    await page.getByRole('button', { name: t.cta.next }).click()

    // assert
    await expect(page.getByRole('heading')).toHaveText(t.steps.application.title)
  })

  test('should see the second step -application - of create campaign application wizard and after filling in the beneficiary, relations, title, type and funds go to step 3', async ({
    page,
    baseURL,
  }) => {
    // arrange
    await page.goto(`${baseURL}/campaigns/application`)
    const t = await textLocalized().campaign.bg()

    // step 1
    await page.getByRole('checkbox').first().click()
    await page.getByRole('checkbox').nth(1).click()
    await page.getByRole('checkbox').nth(2).click()
    await page.getByRole('button', { name: t.cta.next }).click()

    // act
    await page.getByLabel(t.steps.application.beneficiary).fill('beneficiary')
    await page.getByLabel(t.steps.application.beneficiaryRelationship).fill('rel')
    await page.getByLabel(t.steps.application.campaignTitle).fill('title')

    // select type of campaign app by opening the dropdown and arrow down and enter to select
    await page.locator('[name="applicationBasic.campaignType"]').click({ force: true }) // this is the underlying input and it's hidden - hence the force
    await page.keyboard.down('ArrowDown')
    await page.keyboard.down('Enter')

    await page.getByLabel(t.steps.application.funds).fill('12345')

    // go next
    await page.getByRole('button', { name: t.cta.next }).click()

    // assert
    await expect(page.getByRole('heading')).toHaveText(t.steps.details.title)
  })

  test('should see the third step - details - of create campaign application wizard and after filling the title, description, history and 2 files be able to create a new campaign application', async ({
    page,
    baseURL,
  }) => {
    // arrange
    await setupMeAndCampaignTypes(page)
    await page.goto(`${baseURL}/campaigns/application`)
    const t = await textLocalized().campaign.bg()

    // step 1
    await page.getByRole('checkbox').first().click()
    await page.getByRole('checkbox').nth(1).click()
    await page.getByRole('checkbox').nth(2).click()
    await page.getByRole('button', { name: t.cta.next }).click()
    // step 2
    await page.getByLabel(t.steps.application.beneficiary).fill('beneficiary')
    await page.getByLabel(t.steps.application.beneficiaryRelationship).fill('rel')
    await page.getByLabel(t.steps.application.campaignTitle).fill('title')

    // select type of campaign app by opening the dropdown and arrow down and enter to select
    await page.locator('[name="applicationBasic.campaignType"]').click({ force: true }) // this is the underlying input and it's hidden - hence the force
    await page.keyboard.down('ArrowDown')
    await page.keyboard.down('Enter')

    await page.getByLabel(t.steps.application.funds).fill('12345')

    await page.getByRole('button', { name: t.cta.next }).click()

    // act
    await page.getByLabel(t.steps.details.cause).fill('goal')
    await page.getByLabel(t.steps.details.description).fill('description')
    await page.getByLabel(t.steps.details['current-status'].label).fill('history')

    await page.getByLabel(t.steps.details.documents).setInputFiles([
      {
        name: 'file.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('this is test'),
      },
      {
        name: 'file1.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('this is test'),
      },
    ])

    // ensure we intercept the create and not let it go to the server...
    page.route('*/**/api/v1/campaign-application/create', (route, req) => {
      return route.fulfill({
        json: defaultCampaignApplication(),
      })
    })
    // and the upload file as well
    page.route('*/**/api/v1/campaign-application/uploadFile/*', (route, req) => {
      return route.fulfill({
        json: { id: '1' },
      })
    })

    const [createApplication, uploadFile1, uploadFile2] = await Promise.all([
      page.waitForRequest(/\/api\/v1\/campaign-application\/create/),
      page.waitForRequest(/\/api\/v1\/campaign-application\/uploadFile.*/),
      page.waitForRequest(/\/api\/v1\/campaign-application\/uploadFile.*/),
      page.getByRole('button', { name: t.cta.submit }).click(),
    ])

    // assert
    await expect(createApplication.postDataJSON()).toEqual({
      acceptTermsAndConditions: true,
      amount: '12345',
      archived: false,
      beneficiary: 'beneficiary',
      campaignEnd: 'funds',
      campaignName: 'title',
      campaignTypeId: '34b501f0-b3c3-43d9-9be0-7f7258eeb247',
      description: 'description',
      goal: 'goal',
      history: 'history',
      organizerBeneficiaryRel: 'rel',
      organizerEmail: 'giver@podkrepi.bg',
      organizerName: 'Giver Dev',
      organizerPhone: '+35928700500',
      personalInformationProcessingAccepted: true,
      state: 'review',
      ticketURL: '',
      transparencyTermsAccepted: true,
    })

    expect(uploadFile1.method()).toEqual('POST')
    expect(uploadFile1.url()).toMatch('api/v1/campaign-application/uploadFile/created')
    expect(uploadFile2.method()).toEqual('POST')
    expect(uploadFile2.url()).toMatch('api/v1/campaign-application/uploadFile/created')

    await expect(page.getByRole('heading')).toHaveText(t.result.created)
    await expect(page.getByText('file.txt')).toBeVisible()
    await expect(page.getByText('file1.txt')).toBeVisible()
    await expect(page.getByText('giver@podkrepi.bg')).toBeVisible()
    await expect(page.getByText('Giver Dev')).toBeVisible()
    await expect(page.getByText('+35928700500')).toBeVisible()
    await expect(page.getByText('beneficiary')).toBeVisible()
    await expect(page.getByText('rel')).toBeVisible()
    await expect(page.getByText('title')).toBeVisible()
    await expect(page.getByText('12345')).toBeVisible()
    await expect(page.getByText(t.steps.application['campaign-end'].options.funds)).toBeVisible()
    await expect(page.getByText('goal')).toBeVisible()
  })

  test('should see the edit campaign application and be able to delete a selected file ', async ({
    page,
    baseURL,
  }) => {
    // arrange
    await setupMeAndCampaignTypes(page)
    await setupCampaignApplicationForEdit(page)
    await page.goto(`${baseURL}/campaigns/application/1234`)
    const t = await textLocalized().campaign.bg()
    await page.getByRole('button', { name: t.cta.next }).click()
    await page.getByRole('button', { name: t.cta.next }).click()

    // expect to see 2 files
    await expect(page.getByText('1234.txt')).toBeVisible()
    await expect(page.getByText('document.pdf')).toBeVisible()

    // act
    // hit the delete button ...
    await page.locator('li').filter({ hasText: '1234.txt' }).getByLabel('delete').click()
    const [editCamAppReq, fileDeleteReq] = await Promise.all([
      // the edit request to edit the CamApp entity
      page.waitForRequest((r) => r.method() === 'PATCH'),
      // the delete request to remove one of the files
      page.waitForRequest((r) => r.method() === 'DELETE'),
      // ... and when submit
      page.getByRole('button', { name: t.cta.submit }).click(),
    ])

    await expect(editCamAppReq.postDataJSON()).toBeDefined()

    const fileDelRes = await fileDeleteReq.response()

    await expect(fileDelRes?.json()).resolves.toEqual({ id: 'ok' })
  })
})

function defaultCampaignApplication() {
  return {
    id: 'created',
    acceptTermsAndConditions: true,
    personalInformationProcessingAccepted: true,
    transparencyTermsAccepted: true,
    organizerName: 'Giver Dev',
    organizerEmail: 'giver@podkrepi.bg',
    organizerPhone: '+35928700500',
    beneficiary: 'beneficiary',
    campaignName: 'title',
    amount: '12345',
    goal: 'goal',
    description: '',
    organizerBeneficiaryRel: 'rel',
    history: '',
    campaignEnd: 'funds',
    campaignTypeId: 'b9043466-a3c1-4ced-b951-6282ca3e6a7b',
    archived: false,
    state: 'review',
    ticketURL: '',
  }
}

async function setupMeAndCampaignTypes(page: Page) {
  await page.route('*/**/api/v1/account/me', (req) =>
    req.fulfill({
      json: {
        user: {
          id: '99c18c81-54bc-4f32-ab50-3ac5c383f44b',
          firstName: 'Giver',
          lastName: 'Dev',
          email: 'giver@podkrepi.bg',
          phone: '+35928700500',
        },
      },
    }),
  )
  await page.route('*/**/api/v1/campaign-types/', (req) =>
    req.fulfill({
      json: [
        {
          id: '0c80a28c-f09e-4e82-b2ec-6682ae559cab',
          name: 'Transplantation',
          slug: 'transplantation',
          description: 'Ullam exercitationem optio tempora ullam.',
          parentId: 'b9043466-a3c1-4ced-b951-6282ca3e6a7b',
          category: 'medical',
        },
        {
          id: '34b501f0-b3c3-43d9-9be0-7f7258eeb247',
          name: 'Membership',
          slug: 'membership',
          description: 'Membership Campaigns',
          parentId: null,
          category: 'others',
        },
      ],
    }),
  )
}

async function setupCampaignApplicationForEdit(
  page: Page,
  application: Partial<ReturnType<typeof defaultCampaignApplication>> = {},
) {
  await page.route('*/**/api/v1/campaign-application/byId/*', (req) =>
    req.fulfill({
      json: {
        ...defaultCampaignApplication(),
        id: 'forEdit',
        documents: [
          { filename: '1234.txt', id: '1234' },
          { filename: 'document.pdf', id: 'doc-id-123123' },
        ],
        ...application,
      },
    }),
  )

  // on submit at the end of edit this patch request needs to be sent
  await page.route('*/**/api/v1/campaign-application/forEdit', (req) =>
    req.fulfill({
      json: {
        ...defaultCampaignApplication(),
        id: 'forEdit',
        ...application,
      },
    }),
  )

  // delete file successful
  await page.route('*/**/api/v1/campaign-application/fileById/*', (req) =>
    req.fulfill({
      json: {
        id: 'ok',
      },
    }),
  )
}
