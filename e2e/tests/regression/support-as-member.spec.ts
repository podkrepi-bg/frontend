import { expect, Page, test } from '@playwright/test'
import { bgLocalizationSupport } from '../../data/localization'
import { supportPageVolutneerTestData } from '../../data/support-page-tests.data'
import { HeaderPage } from '../../pages/web-pages/header.page'
import { HomePage } from '../../pages/web-pages/home.page'
import { SupportPage } from '../../pages/web-pages/support.page'

// This spec contains E2E tests related tothe Support page
// The tests are dependent, the whole describe should be runned
test.describe.serial('Support page - Join us as member - BG language version', async () => {
  let page: Page
  let homepage: HomePage
  let headerPage: HeaderPage
  let supportPage: SupportPage
  // rolesTestArray: 'Дарител', 'Доброволец', 'Член на сдружението', 'Партньор', 'Компания'
  const rolesTestArray = [
    bgLocalizationSupport.steps.role.fields.benefactor.title,
    bgLocalizationSupport.steps.role.fields.volunteer.title,
    bgLocalizationSupport.steps.role.fields.associationMember.title,
    bgLocalizationSupport.steps.role.fields.partner.title,
    bgLocalizationSupport.steps.role.fields.company.title,
  ]
  const memberText = bgLocalizationSupport.steps['addition-questions'].associationMember.member
  const campaignBenefactorText =
    bgLocalizationSupport.steps['addition-questions'].benefactor.campaignBenefactor
  const npoPartnerText = bgLocalizationSupport.steps['addition-questions'].partner.npo
  const companySponsorText = bgLocalizationSupport.steps['addition-questions'].company.sponsor
  const projectManagerText =
    bgLocalizationSupport.steps['addition-questions'].volunteer.projectManager
  const backEndText = bgLocalizationSupport.steps['addition-questions'].volunteer.backend
  const frontendText = bgLocalizationSupport.steps['addition-questions'].volunteer.frontend

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    homepage = new HomePage(page)
    headerPage = new HeaderPage(page)
    supportPage = new SupportPage(page)

    await homepage.navigateToEnvHomepage()
    await headerPage.clickJoinUsHeaderNavButton()
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('"Role" step works correctly', async () => {
    await supportPage.selectCheckboxByLabelText(rolesTestArray)
    await supportPage.clickSubmitButton()
    expect
      .soft(
        await supportPage.isAdditionalQuestionsStepActive(),
        'Additional Questions step is not active.',
      )
      .toBeTruthy()
    expect(
      await supportPage.isCheckboxCheckedByLabelText(memberText),
      "Expected checkbox 'Member' is not checked.",
    ).toBeTruthy()
  })

  test('"Additional questions" step works correctly', async () => {
    await supportPage.selectCheckboxByLabelText([
      campaignBenefactorText,
      npoPartnerText,
      companySponsorText,
      projectManagerText,
      backEndText,
      frontendText,
    ])
    await supportPage.clickSubmitButton()
    expect
      .soft(
        await supportPage.isAdditionalQuestionsStepActive(),
        'Additional Questions step is active, but should not be.',
      )
      .toBeFalsy()
    await supportPage.clickBackButton()
    expect
      .soft(
        await supportPage.isCheckboxCheckedByLabelText(campaignBenefactorText),
        `${campaignBenefactorText} is not checked`,
      )
      .toBeTruthy()
    expect
      .soft(
        await supportPage.isCheckboxCheckedByLabelText(npoPartnerText),
        `${npoPartnerText} is not checked`,
      )
      .toBeTruthy()
    expect
      .soft(
        await supportPage.isCheckboxCheckedByLabelText(companySponsorText),
        `${companySponsorText} is not checked`,
      )
      .toBeTruthy()
    expect
      .soft(
        await supportPage.isCheckboxCheckedByLabelText(projectManagerText),
        `${projectManagerText} is not checked`,
      )
      .toBeTruthy()
    expect
      .soft(
        await supportPage.isCheckboxCheckedByLabelText(backEndText),
        `${backEndText} is not checked`,
      )
      .toBeTruthy()
    expect(
      await supportPage.isCheckboxCheckedByLabelText(frontendText),
      `${frontendText} is not checked`,
    ).toBeTruthy()
  })

  test('"Keep in touch" step works correctly', async () => {
    await supportPage.clickSubmitButton()
    await supportPage.fillContactForm([
      supportPageVolutneerTestData.firstName,
      supportPageVolutneerTestData.lastName,
      supportPageVolutneerTestData.email,
      supportPageVolutneerTestData.phone,
      supportPageVolutneerTestData.comment,
    ])
    expect(
      await supportPage.isAdditionalQuestionsStepActive(),
      'Additional Questions step is active, but should not be.',
    ).toBeFalsy()
  })

  // Comment out thank you step because of email sending
  // test('"Thank you" step works correctly', async () => {
  //   expect
  //     .soft(
  //       await supportPage.isContactDataStepActive(),
  //       'Contact Data step is active, but should not be.',
  //     )
  //     .toBeFalsy()
  //   expect
  //     .soft(await supportPage.isParticipationStepActive(), 'Participation step is Not active.')
  //     .toBeTruthy()
  //   expect(
  //     await supportPage.isThankYouSupportH4HeadingVisible(),
  //     'Thank you greeting is not visible.',
  //   ).toBeTruthy()
  // })
})
