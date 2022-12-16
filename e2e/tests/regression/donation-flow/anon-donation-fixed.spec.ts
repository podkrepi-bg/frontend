import { test, expect, Page } from '@playwright/test'
import { HeaderPage } from '../../../pages/web-pages/header.page';
import { HomePage } from '../../../pages/web-pages/home.page';
import { CampaignsPage } from '../../../pages/web-pages/campaigns/campaigns.page';
import { enLocalizationOneTimeDonation } from '../../../data/localization';
import { DonationPage } from '../../../pages/web-pages/campaigns/donation.page';
import { enDonationRegions } from '../../../data/enums/donation-regions.enum';
import { StripeCheckoutPage } from '../../../pages/web-pages/external/stripe-checkout.page';
import { anonDonationTestData } from '../../../data/support-page-tests.data';
import { LanguagesEnum } from '../../../data/enums/languages.enum';

// This spec contains E2E tests related to anonymous donation flow - fixed amount
// The tests are dependent, the whole describe should be runned
test.describe.serial('Anonymous contributor is able to donate fixed amount - EN language version', async () => {

  let page: Page;
  let homepage: HomePage;
  let headerPage: HeaderPage;
  let campaignsPage: CampaignsPage;
  let donationPage: DonationPage;
  let stripeCheckoutPage: StripeCheckoutPage;
  // For the URL is used RegExp so the tests will pass for each environment - localhost, dev, etc.
  // TODO Temporaly removed EN version due to bug (https://github.com/podkrepi-bg/frontend/issues/1247)
  const campaignCrisisCenterPageUrl = "podkrepi.bg/campaigns/krizisen-centur-za-postradali-ot-nasilie-shans-za-nov-zhivot$";
  const campaignDonationCrisisCenterPageUrl = "podkrepi.bg/campaigns/donation/krizisen-centur-za-postradali-ot-nasilie-shans-za-nov-zhivot$";
  const testEmail = "E2E_Test_Anon_Donation@e2etest.com";
  // Localization texts
  const enCardIncludeFeesText = enLocalizationOneTimeDonation['third-step']['card-include-fees'];

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    homepage = new HomePage(page);
    headerPage = new HeaderPage(page);
    campaignsPage = new CampaignsPage(page);
    donationPage = new DonationPage(page);
    stripeCheckoutPage = new StripeCheckoutPage(page);
    // TODO Change here to localhost and leave comment for the devs
    await homepage.navigateToDevEnvHomepage();
    await headerPage.changeanguageHeaderButtonToBe(LanguagesEnum.EN);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Particular campaign can be opened through the Campaign page', async () => {
    await headerPage.clickDonateHeaderNavButton(LanguagesEnum.EN);
    await campaignsPage.clickCampaignCrisisCenter();
 
    // We move from the common Campaigns page to the particular campain page
    await campaignsPage.checkPageUrlByRegExp(campaignCrisisCenterPageUrl);
    expect(await campaignsPage.isCrisiCenterHeading1Visible(), "The campaign H1 heading is not visible on the Campaign page.").toBeTruthy();
  });

  test('The total charge, fee tax and donation amount are visible on the Campaign page', async () => {
    await campaignsPage.clickDonationSupportButton();
    await donationPage.checkPageUrlByRegExp(campaignDonationCrisisCenterPageUrl);
    await headerPage.changeanguageHeaderButtonToBe(LanguagesEnum.EN);
    expect.soft(await donationPage.isSelectAmountStepActive(LanguagesEnum.EN), "Select Amount step is not active.").toBeTruthy();
    await donationPage.selectRadioButtonByLabelText(["10"]);
    await donationPage.setDonationRegionFromTheDropdown(enDonationRegions.EUROPE);
    await donationPage.selectCheckboxByLabelText([enCardIncludeFeesText]);
    // Expected pattern:
    // For your donation of {donationAmountText}, the fee from Stripe will be {feeAmountText}, and the total charged amount will be {totalChargedAmountText}.
    const donationAmountText = await donationPage.getTotalChargedAmountsAsText();
    const feeAmountText = await donationPage.getFeeAmountsAsText();
    const totalChargedAmountText = await donationPage.getDonationAmountsAsText();
    expect.soft(donationAmountText).toMatch("10.00");
    expect.soft(feeAmountText).toMatch("0.63");
    expect(totalChargedAmountText).toMatch("10.63");
  });

  test('The total charge, fee tax and donation amount are recalculated correctly when the donation amount is changed', async () => {
    await donationPage.selectRadioButtonByLabelText(["20"]);
    // Expected pattern:
    // For your donation of {donationAmountText}, the fee from Stripe will be {feeAmountText}, and the total charged amount will be {totalChargedAmountText}.
    const donationAmountText = await donationPage.getTotalChargedAmountsAsText();
    const feeAmountText = await donationPage.getFeeAmountsAsText();
    const totalChargedAmountText = await donationPage.getDonationAmountsAsText();
    expect.soft(donationAmountText).toMatch("20.00");
    expect.soft(feeAmountText).toMatch("0.75");
    expect(totalChargedAmountText).toMatch("20.75");
  });

  test('The user is able to fill in e-mail for anonymous donation', async () => {
    await donationPage.clickForwardButton(LanguagesEnum.EN);
    expect.soft(await donationPage.isPersonalProfileStepActive(LanguagesEnum.EN), "Personal Profile step is not active.").toBeTruthy();
    await donationPage.clickDonateAnonymouslyButton(LanguagesEnum.EN);
    await donationPage.fillDonateAnonymouslyEmailField(testEmail);
    await donationPage.clickForwardButton(LanguagesEnum.EN);
    expect(await donationPage.isSendAWishStepActive(LanguagesEnum.EN), "Send a wish step is not active.").toBeTruthy();
  });

  test('The user is able to send a wish', async () => {
    await donationPage.fillSendAWishField("E2E test - anonymous donation.");
    await donationPage.clickFinishButton(LanguagesEnum.EN);
  });

  test('The user is able to pay via Stripe', async () => {
    const stripeTotalAmount = await stripeCheckoutPage.getTotalAmountText();
    const actualStripeEmail = await stripeCheckoutPage.getReadonlyEmailText();
    expect.soft(stripeTotalAmount, "The Stripe total donation amount is not correct.").toContain("20.75");
    expect(actualStripeEmail, "The user e-mail is not sent correctly to Stripe.").toEqual(testEmail);
    await stripeCheckoutPage.fillPaymentForm([anonDonationTestData.cardNumber, anonDonationTestData.cardExpDate,
      anonDonationTestData.cardCvc, anonDonationTestData.billingName, anonDonationTestData.country]);
      // TODO Log bug for unexpected problem when the language is changed
    expect.soft(await donationPage.isSuccessfulDonationTitleVisible(LanguagesEnum.EN), "'We thank you for your help and trust!' title is not visible.").toBeTruthy();
    expect(await donationPage.isPaymentStepActive(LanguagesEnum.EN), "Payment step is not active.").toBeTruthy();
  });
});

// test.describe('Anonymous donation - fixed amount', async () => {

//   test('test anonymous donation on staging - fixed amount', async ({ page }) => {
//     // Go to https://dev.podkrepi.bg/
//     await page.goto('https://dev.podkrepi.bg/')

//     // Click text=Дарете сега >> nth=0
//     await page.locator('text=Дарете сега').first().click()
//     await expect(page).toHaveURL(
//       'https://dev.podkrepi.bg/campaigns/donation/krizisen-centur-za-postradali-ot-nasilie-shans-za-nov-zhivot',
//     )

//     // Click label:has-text("10 лв.")
//     await page.locator('label:has-text("10 лв.")').click()

//     // Click text=Искам да покрия таксите за плащане с карта издадена в:
//     await page.locator('text=Искам да покрия таксата за карта издадена в:').click()

//     // Click text=10,65 лв.
//     await page.locator('text=10,65 лв.').click()

//     // Click text=0,65 лв. >> nth=1
//     await page.locator('text=0,65 лв.').nth(1).click()

//     // Click text=10,00 лв.
//     await page.locator('text=10,00 лв.').click()

//     // Click text=Напред
//     await page.locator('text=Напред').click()

//     // Click text=Дарете анонимно
//     await page.locator('text=Дарете анонимно').click()

//     // Click input[name="personsEmail"]
//     await page.locator('input[name="personsEmail"]').click()

//     // Fill input[name="personsEmail"]
//     await page.locator('input[name="personsEmail"]').fill('test@example.com')

//     // Click text=Напред
//     await page.locator('text=Напред').click()

//     // Click textarea[name="message"]
//     await page.locator('textarea[name="message"]').click()

//     // Fill textarea[name="message"]
//     await page.locator('textarea[name="message"]').fill('e2e test')

//     // Click text=Премини към плащане
//     await page.locator('text=Премини към плащане').click()

//     // await page.waitForURL((url: string) =>
//     //   url.toString().startsWith('https://checkout.stripe.com/pay/cs_test_'),
//     // )

//     await expect(page.url()).toContain('https://checkout.stripe.com/pay/cs_test_')

//     // Click [placeholder="\31 234 1234 1234 1234"]
//     await page.locator('[placeholder="\\31 234 1234 1234 1234"]').click()

//     // Fill [placeholder="\31 234 1234 1234 1234"]
//     await page.locator('[placeholder="\\31 234 1234 1234 1234"]').fill('4242 4242 4242 4242')

//     // Click [placeholder="MM \/ YY"]
//     await page.locator('[placeholder="MM \\/ YY"]').click()

//     // Fill [placeholder="MM \/ YY"]
//     await page.locator('[placeholder="MM \\/ YY"]').fill('04 / 242')

//     // Click [placeholder="CVC"]
//     await page.locator('[placeholder="CVC"]').click()

//     // Fill [placeholder="CVC"]
//     await page.locator('[placeholder="CVC"]').fill('4242')

//     // Click [data-testid="hosted-payment-submit-button"]
//     await page.locator('[data-testid="hosted-payment-submit-button"]').click()

//     // Fill input[name="billingName"]
//     await page.locator('input[name="billingName"]').fill('e2e tester')

//     // Click [data-testid="hosted-payment-submit-button"]
//     await page.locator('[data-testid="hosted-payment-submit-button"]').click()

//     // Go to https://dev.podkrepi.bg/campaigns/donation/krizisen-centur-za-postradali-ot-nasilie-shans-za-nov-zhivot?success=true
//     await page.goto(
//       'https://dev.podkrepi.bg/campaigns/donation/krizisen-centur-za-postradali-ot-nasilie-shans-za-nov-zhivot?success=true',
//     )

//     // Click text=Благодарим за доверието и подкрепата!
//     await expect(page.locator('text=Благодарим за доверието и подкрепата!')).toBeDefined()
//   })
// });