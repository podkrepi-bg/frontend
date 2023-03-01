import { Page, expect } from '@playwright/test'
import { LanguagesEnum } from '../../../data/enums/languages.enum'
import {
  bgLocalizationOneTimeDonation,
  enLocalizationOneTimeDonation,
} from '../../../data/localization'
import { SLUG_REGEX } from '../../../utils/helpers'
import { CampaignsPage } from './campaigns.page'

export class DonationPage extends CampaignsPage {
  constructor(page: Page) {
    super(page)
  }

  // -> Select amount section <-
  private readonly otherAmountInputField = ".MuiCollapse-entered input[name='otherAmount']"
  private readonly allAmountsSelector = '.MuiBox-root strong'
  private readonly regionsDropdownRootElement = '.MuiInputBase-root .MuiSelect-select'
  private readonly regionsMenuList = '#menu-cardRegion ul.MuiMenu-list li'
  private readonly gridRootSelector = '.MuiGrid-root'
  private readonly forwardGridButton = this.gridRootSelector + ' button.MuiButton-contained'
  // Section labels
  private readonly bgSelectAmountSectionText = bgLocalizationOneTimeDonation['step-labels'].amount
  private readonly enSelectAmountSectionText = enLocalizationOneTimeDonation['step-labels'].amount
  // TODO Add these three IDs into the component (if possible) and update the test methods
  private readonly donationAmount = this.allAmountsSelector + ' #donationAmount'
  private readonly feeAmount = this.allAmountsSelector + ' #feeAmount'
  private readonly totalChargedAmount = this.allAmountsSelector + ' #totalChargedAmount'
  // Grid navigation buttons localization
  private readonly bgForwardButtonText = bgLocalizationOneTimeDonation.btns.next
  private readonly enForwardButtonText = enLocalizationOneTimeDonation.btns.next

  // -> Personal profile section <-
  private readonly buttonsContainer = '.MuiTabs-flexContainer button'
  private readonly bgDonateAnonymouslyText =
    bgLocalizationOneTimeDonation['second-step']['donate-anonymously']
  private readonly enDonateAnonymouslyText =
    enLocalizationOneTimeDonation['second-step']['donate-anonymously']
  private readonly inputRootSelector = '.MuiInputBase-root'
  private readonly donateAnonymouslyEmailField =
    this.inputRootSelector + " input[name='personsEmail']"
  // Section labels
  private readonly bgPersonalProfileSectionText =
    bgLocalizationOneTimeDonation['step-labels']['personal-profile']
  private readonly enPersonalProfileSectionText =
    enLocalizationOneTimeDonation['step-labels']['personal-profile']

  // -> Send a wish section <-
  // Section labels
  private readonly sendAWishField = this.inputRootSelector + " textarea[name='message']"
  private readonly bgSendAWishSectionText = bgLocalizationOneTimeDonation['step-labels'].wish
  private readonly enSendAWishSectionText = enLocalizationOneTimeDonation['step-labels'].wish

  // -> Payment <-
  // Section labels
  private readonly bgPaymentSectionText = bgLocalizationOneTimeDonation['step-labels'].payment
  private readonly enPaymentSectionText = enLocalizationOneTimeDonation['step-labels'].payment
  private readonly bgFinishButtonText = bgLocalizationOneTimeDonation.btns.end
  private readonly enFinishButtonText = enLocalizationOneTimeDonation.btns.end
  private readonly bgSuccessfulDonationTitle = bgLocalizationOneTimeDonation.success.title
  private readonly enSuccessfulDonationTitle = enLocalizationOneTimeDonation.success.title

  async checkPageUrlByRegExp(urlRegExpAsString?: string, timeoutParam = 10000): Promise<void> {
    await this.page.waitForTimeout(1000)
    await expect(this.page, 'The URL is not correct!').toHaveURL(
      new RegExp(urlRegExpAsString || `^(.*?)/campaigns/donation/${SLUG_REGEX}`),
      {
        timeout: timeoutParam,
      },
    )
  }

  /**
   * Is "Select amount" step active
   */
  async isSelectAmountStepActive(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
    if (language === LanguagesEnum.BG) {
      return this.isStepActiveByLabelText(this.bgSelectAmountSectionText)
    } else if (language === LanguagesEnum.EN) {
      return this.isStepActiveByLabelText(this.enSelectAmountSectionText)
    } else {
      throw new Error('Language not found!')
    }
  }

  /**
   * Is "Personal profile" step active
   */
  async isPersonalProfileStepActive(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
    if (language === LanguagesEnum.BG) {
      return this.isStepActiveByLabelText(this.bgPersonalProfileSectionText)
    } else if (language === LanguagesEnum.EN) {
      return this.isStepActiveByLabelText(this.enPersonalProfileSectionText)
    } else {
      throw new Error('Language not found!')
    }
  }

  /**
   * Is "Send a wish" step active
   */
  async isSendAWishStepActive(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
    if (language === LanguagesEnum.BG) {
      return this.isStepActiveByLabelText(this.bgSendAWishSectionText)
    } else if (language === LanguagesEnum.EN) {
      return this.isStepActiveByLabelText(this.enSendAWishSectionText)
    } else {
      throw new Error('Language not found!')
    }
  }

  /**
   * Is "Payment" step active
   */
  async isPaymentStepActive(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
    if (language === LanguagesEnum.BG) {
      return this.isStepActiveByLabelText(this.bgPaymentSectionText)
    } else if (language === LanguagesEnum.EN) {
      return this.isStepActiveByLabelText(this.enPaymentSectionText)
    } else {
      throw new Error('Language not found!')
    }
  }

  /**
   * Fill in the desired amount of money for donation into the Other Amount input field
   * @param {string} amountMoney
   */
  async fillOtherAmountInputField(amountMoney: string): Promise<void> {
    await this.waitForElementToBePresentedBySelector(this.otherAmountInputField)
    await this.setInputFieldBySelector(this.otherAmountInputField, amountMoney)
  }

  /**
   * Set donation region from the dropdown menu
   * @param {string} desiredRegion
   */
  async setDonationRegionFromTheDropdown(desiredRegion: string): Promise<void> {
    await this.clickElement(this.regionsDropdownRootElement)
    await this.clickElement(this.regionsMenuList, { hasText: desiredRegion })
  }

  /**
   * Get Total charged amounts as text
   */
  async getTotalChargedAmountsAsText(): Promise<string | null> {
    const donationAmount = this.page.locator(this.allAmountsSelector).nth(0)
    return this.getTextOfElementByLocator(donationAmount)
    // TODO Uncomment when the IDs are added
    // return this.getTextOfElementBySelector(this.totalChargedAmount);
  }

  /**
   * Get Fee amounts as text
   */
  async getFeeAmountsAsText(): Promise<string | null> {
    const donationAmount = this.page.locator(this.allAmountsSelector).nth(1)
    return this.getTextOfElementByLocator(donationAmount)
    // TODO Uncomment when the IDs are added
    // return this.getTextOfElementBySelector(this.feeAmount);
  }

  /**
   * Get Donation amounts as text
   */
  async getDonationAmountsAsText(): Promise<string | null> {
    const donationAmount = this.page.locator(this.allAmountsSelector).nth(2)
    return this.getTextOfElementByLocator(donationAmount)
    // TODO Uncomment when the IDs are added
    // return this.getTextOfElementBySelector(this.donationAmount);
  }

  /**
   * Click Forward/Next button into the donation grid
   * @param {LanguagesEnum} language
   */
  async clickForwardButton(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
    if (language === LanguagesEnum.BG) {
      await this.clickElement(this.forwardGridButton, { hasText: this.bgForwardButtonText })
    } else if (language === LanguagesEnum.EN) {
      await this.clickElement(this.forwardGridButton, { hasText: this.enForwardButtonText })
    } else {
      throw new Error('Language not found!')
    }
  }

  /**
   * Click Finish/Go to payment button into the donation grid
   * @param {LanguagesEnum} language
   */
  async clickFinishButton(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
    if (language === LanguagesEnum.BG) {
      await this.clickElement(this.forwardGridButton, { hasText: this.bgFinishButtonText })
    } else if (language === LanguagesEnum.EN) {
      await this.clickElement(this.forwardGridButton, { hasText: this.enFinishButtonText })
    } else {
      throw new Error('Language not found!')
    }
  }

  /**
   * Click Donate Anonymously button into the donation grid (Personal Profile step)
   * @param {LanguagesEnum} language
   */
  async clickDonateAnonymouslyButton(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
    if (language === LanguagesEnum.BG) {
      await this.clickElement(this.buttonsContainer, { hasText: this.bgDonateAnonymouslyText })
    } else if (language === LanguagesEnum.EN) {
      await this.clickElement(this.buttonsContainer, { hasText: this.enDonateAnonymouslyText })
    } else {
      throw new Error('Language not found!')
    }
  }

  /**
   * Fill Donate anonymously E-mail input field
   * @param {string} emailText
   */
  async fillDonateAnonymouslyEmailField(emailText: string): Promise<void> {
    await this.setInputFieldBySelector(this.donateAnonymouslyEmailField, emailText)
  }

  /**
   * Fill Send a wish input field
   * @param {string} wishText
   */
  async fillSendAWishField(wishText: string): Promise<void> {
    await this.setInputFieldBySelector(this.sendAWishField, wishText)
  }

  /**
   * Is "We thank you for your help and trust!" title visible
   * @param {LanguagesEnum} language - the default value is BG
   */
  async isSuccessfulDonationTitleVisible(
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<boolean> {
    return this.isH4HeadingVisible(
      language,
      this.bgSuccessfulDonationTitle,
      this.enSuccessfulDonationTitle,
    )
  }
}
