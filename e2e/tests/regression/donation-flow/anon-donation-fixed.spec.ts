import { test, expect, Page } from '@playwright/test'
import { HeaderPage } from '../../../pages/web-pages/header.page'
import { HomePage } from '../../../pages/web-pages/home.page'
import { CampaignsPage } from '../../../pages/web-pages/campaigns/campaigns.page'
import { enLocalizationOneTimeDonation } from '../../../data/localization'
import { DonationPage } from '../../../pages/web-pages/campaigns/donation.page'
import { enDonationRegions } from '../../../data/enums/donation-regions.enum'
import { StripeCheckoutPage } from '../../../pages/web-pages/external/stripe-checkout.page'
import { anonDonationTestData } from '../../../data/support-page-tests.data'
import { LanguagesEnum } from '../../../data/enums/languages.enum'

// This spec contains E2E tests related to anonymous donation flow - fixed amount
// The tests are dependent, the whole describe should be runned
test.describe.serial(
  'Anonymous contributor is able to donate fixed amount - EN language version',
  async () => {
    let page: Page
    let homepage: HomePage
    let headerPage: HeaderPage
    let campaignsPage: CampaignsPage
    let donationPage: DonationPage
    let stripeCheckoutPage: StripeCheckoutPage
    const testEmail = 'E2E_Test_Anon_Donation@e2etest.com'
    // Localization texts
    const enCardIncludeFeesText = enLocalizationOneTimeDonation['third-step']['card-include-fees']

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage()
      homepage = new HomePage(page)
      headerPage = new HeaderPage(page)
      campaignsPage = new CampaignsPage(page)
      donationPage = new DonationPage(page)
      stripeCheckoutPage = new StripeCheckoutPage(page)
      // For local executions use method navigateToLocalhostHomepage();
      // await homepage.navigateToLocalhostHomepage();
      await homepage.navigateToEnvHomepage()
      await headerPage.changeanguageHeaderButtonToBe(LanguagesEnum.EN)
    })

    test.afterAll(async () => {
      await page.close()
    })

    test('Particular campaign can be opened through the Campaign page', async () => {
      await headerPage.clickDonateHeaderNavButton()
      await campaignsPage.clickCampaignCardByIndex(0)
      // We move from the common Campaigns page to the particular campain page
      // check if the url is changed only based on the url pattern http://localhost:3040/campaigns/{slug-based-regexp}
      // expect to not break

      expect(
        await campaignsPage.checkPageUrlByRegExp(),
        'The url is not changed after clicking on the campaign card.',
      )
    })

    test('The total charge, fee tax and donation amount are visible on the Campaign page', async () => {
      await campaignsPage.clickDonationSupportButton()
      await donationPage.checkPageUrlByRegExp()
      expect
        .soft(
          await donationPage.isSelectAmountStepActive(LanguagesEnum.EN),
          'Select Amount step is not active.',
        )
        .toBeTruthy()
      await donationPage.selectRadioButtonByLabelText(['10'])
      await donationPage.setDonationRegionFromTheDropdown(enDonationRegions.EUROPE)
      await donationPage.selectCheckboxByLabelText([enCardIncludeFeesText])
      // Expected pattern:
      // For your transfer of {totalChargedAmountText}, the fee from Stripe will be {feeAmountText}, and the campaign will receive {donationAmountText}.
      const totalChargedAmountText = await donationPage.getTotalChargedAmountsAsText()
      const feeAmountText = await donationPage.getFeeAmountsAsText()
      const donationAmountText = await donationPage.getDonationAmountsAsText()
      expect.soft(donationAmountText).toMatch('10.00')
      expect.soft(feeAmountText).toMatch('0.63')
      expect(totalChargedAmountText).toMatch('10.63')
    })

    test('The total charge, fee tax and donation amount are recalculated correctly when the donation amount is changed', async () => {
      await donationPage.selectRadioButtonByLabelText(['20'])
      // Expected pattern:
      // For your transfer of {totalChargedAmountText}, the fee from Stripe will be {feeAmountText}, and the campaign will receive {donationAmountText}.
      const totalChargedAmountText = await donationPage.getTotalChargedAmountsAsText()
      const feeAmountText = await donationPage.getFeeAmountsAsText()
      const donationAmountText = await donationPage.getDonationAmountsAsText()
      expect.soft(donationAmountText).toMatch('20.00')
      expect.soft(feeAmountText).toMatch('0.75')
      expect(totalChargedAmountText).toMatch('20.75')
    })

    test('The user is able to fill in e-mail for anonymous donation', async () => {
      await donationPage.clickForwardButton(LanguagesEnum.EN)
      expect
        .soft(
          await donationPage.isPersonalProfileStepActive(LanguagesEnum.EN),
          'Personal Profile step is not active.',
        )
        .toBeTruthy()
      await donationPage.clickDonateAnonymouslyButton(LanguagesEnum.EN)
      await donationPage.fillDonateAnonymouslyEmailField(testEmail)
      await donationPage.clickForwardButton(LanguagesEnum.EN)
      expect(
        await donationPage.isSendAWishStepActive(LanguagesEnum.EN),
        'Send a wish step is not active.',
      ).toBeTruthy()
    })

    test('After sending a wish, the user is redirected to Stripe', async () => {
      await donationPage.fillSendAWishField('E2E test - anonymous donation.')
      await donationPage.clickFinishButton(LanguagesEnum.EN)
      const stripeTotalAmount = await stripeCheckoutPage.getTotalAmountText()
      const actualStripeEmail = await stripeCheckoutPage.getReadonlyEmailText()
      expect
        .soft(stripeTotalAmount, 'The Stripe total donation amount is not correct.')
        .toContain('20.75')
      expect(actualStripeEmail, 'The user e-mail is not sent correctly to Stripe.').toEqual(
        testEmail,
      )
    })

    test('The user is able to pay via Stripe', async () => {
      await stripeCheckoutPage.fillPaymentForm([
        anonDonationTestData.cardNumber,
        anonDonationTestData.cardExpDate,
        anonDonationTestData.cardCvc,
        anonDonationTestData.billingName,
        anonDonationTestData.country,
      ])
      // Now we're redirected to the Donation page
      expect
        .soft(
          await donationPage.isSuccessfulDonationTitleVisible(LanguagesEnum.EN),
          "'We thank you for your help and trust!' title is not visible.",
        )
        .toBeTruthy()
      expect(
        await donationPage.isPaymentStepActive(LanguagesEnum.EN),
        'Payment step is not active.',
      ).toBeTruthy()
    })
  },
)
