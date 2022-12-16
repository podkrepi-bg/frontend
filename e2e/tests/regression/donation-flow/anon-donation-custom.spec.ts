import { test, expect, Page } from '@playwright/test'
import { HeaderPage } from '../../../pages/web-pages/header.page';
import { HomePage } from '../../../pages/web-pages/home.page';
import { CampaignsPage } from '../../../pages/web-pages/campaigns/campaigns.page';
import { bgLocalizationOneTimeDonation } from '../../../data/localization';
import { DonationPage } from '../../../pages/web-pages/campaigns/donation.page';
import { bgDonationRegions } from '../../../data/enums/donation-regions.enum';
import { StripeCheckoutPage } from '../../../pages/web-pages/external/stripe-checkout.page';
import { anonDonationTestData } from '../../../data/support-page-tests.data';

// This spec contains E2E tests related to anonymous donation flow - custom amount
// The tests are dependent, the whole describe should be runned
test.describe.serial('Anonymous contributor is able to donate custom amount - BG language version', async () => {

  let page: Page;
  let homepage: HomePage;
  let headerPage: HeaderPage;
  let campaignsPage: CampaignsPage;
  let donationPage: DonationPage;
  let stripeCheckoutPage: StripeCheckoutPage;
  // For the URL is used RegExp so the tests will pass for each environment - localhost, dev, etc.
  const campaignSchoolVarnaPageUrl = "podkrepi.bg/campaigns/uchilishe-za-deca-s-narusheno-zrenie-gr-varna-staya-za-ergoterapiya$";
  const campaignDonationSchoolVarnaPageUrl = "podkrepi.bg/campaigns/donation/uchilishe-za-deca-s-narusheno-zrenie-gr-varna-staya-za-ergoterapiya$";
  const testEmail = "E2E_Test_Anon_Donation@e2etest.com";
  // Localization texts
  const otherAmountText = bgLocalizationOneTimeDonation['first-step'].other;
  const bgCardIncludeFeesText = bgLocalizationOneTimeDonation['third-step']['card-include-fees'];

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    homepage = new HomePage(page);
    headerPage = new HeaderPage(page);
    campaignsPage = new CampaignsPage(page);
    donationPage = new DonationPage(page);
    stripeCheckoutPage = new StripeCheckoutPage(page);
    // TODO Change here to localhost and leave comment for the devs
    await homepage.navigateToDevEnvHomepage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Particular campaign can be opened through the Campaign page', async () => {
    await headerPage.clickDonateHeaderNavButton();
    await campaignsPage.clickCampaignSchoolChildrenVarna();
    // We move from the common Campaigns page to the particular campain page
    await campaignsPage.checkPageUrlByRegExp(campaignSchoolVarnaPageUrl);
    expect(await campaignsPage.isSchoolChildrenVarnaHeadingVisible(), "The campaign H1 heading is not visible on the Campaign page.").toBeTruthy();
  });

  test('The total charge, fee tax and donation amount are visible on the Campaign page', async () => {
    await campaignsPage.clickDonationSupportButton();
    await donationPage.checkPageUrlByRegExp(campaignDonationSchoolVarnaPageUrl);
    expect.soft(await donationPage.isSelectAmountStepActive(), "Select Amount step is not active.").toBeTruthy();
    await donationPage.selectRadioButtonByLabelText([otherAmountText]);
    await donationPage.fillOtherAmountInputField("7.50");
    await donationPage.setDonationRegionFromTheDropdown(bgDonationRegions.EUROPE);
    await donationPage.selectCheckboxByLabelText([bgCardIncludeFeesText]);
    // Expected pattern:
    // За вашия превод от {totalChargedAmountText} лв., таксата на Stripe ще е {feeAmountText} лв., а кампанията ще получи {donationAmountText} лв.
    const totalChargedAmountText = await donationPage.getTotalChargedAmountsAsText();
    const feeAmountText = await donationPage.getFeeAmountsAsText();
    const donationAmountText = await donationPage.getDonationAmountsAsText();
    expect.soft(totalChargedAmountText).toEqual("8,10 лв.");
    expect.soft(feeAmountText).toEqual("0,60 лв.");
    expect(donationAmountText).toEqual("7,50 лв.");
  });

  test('The total charge, fee tax and donation amount are recalculated correctly when the donation amount is changed', async () => {
    await donationPage.fillOtherAmountInputField("12.90");
    // Expected pattern:
    // За вашия превод от {totalChargedAmountText} лв., таксата на Stripe ще е {feeAmountText} лв., а кампанията ще получи {donationAmountText} лв.
    const totalChargedAmountText = await donationPage.getTotalChargedAmountsAsText();
    const feeAmountText = await donationPage.getFeeAmountsAsText();
    const donationAmountText = await donationPage.getDonationAmountsAsText();
    expect.soft(totalChargedAmountText).toEqual("13,56 лв.");
    expect.soft(feeAmountText).toEqual("0,66 лв.");
    expect(donationAmountText).toEqual("12,90 лв.");
  });

  test('The user is able to fill in e-mail for anonymous donation', async () => {
    await donationPage.clickForwardButton();
    expect.soft(await donationPage.isPersonalProfileStepActive(), "Personal Profile step is not active.").toBeTruthy();
    await donationPage.clickDonateAnonymouslyButton();
    await donationPage.fillDonateAnonymouslyEmailField(testEmail);
    await donationPage.clickForwardButton();
    expect(await donationPage.isSendAWishStepActive(), "Send a wish step is not active.").toBeTruthy();
  });

  test('The user is able to send a wish', async () => {
    await donationPage.fillSendAWishField("E2E test - anonymous donation.");
    await donationPage.clickFinishButton();
  });

  test('The user is able to pay via Stripe', async () => {
    const stripeTotalAmount = await stripeCheckoutPage.getTotalAmountText();
    const actualStripeEmail = await stripeCheckoutPage.getReadonlyEmailText();
    expect.soft(stripeTotalAmount, "The Stripe total donation amount is not correct.").toContain("13.56");
    expect(actualStripeEmail, "The user e-mail is not sent correctly to Stripe.").toEqual(testEmail);
    await stripeCheckoutPage.fillPaymentForm([anonDonationTestData.cardNumber, anonDonationTestData.cardExpDate,
      anonDonationTestData.cardCvc, anonDonationTestData.billingName, anonDonationTestData.country]);

    expect.soft(await donationPage.isSuccessfulDonationTitleVisible(), "'We thank you for your help and trust!' title is not visible.").toBeTruthy();
    expect(await donationPage.isPaymentStepActive(), "Payment step is not active.").toBeTruthy();
  });
});
