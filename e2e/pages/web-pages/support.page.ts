import { Page } from '@playwright/test'
import { LanguagesEnum } from '../../data/enums/languages.enum'
import {
  bgLocalizationSupport,
  bgLocalizationValidation,
  enLocalizationSupport,
} from '../../data/localization'
import { HomePage } from './home.page'

export class SupportPage extends HomePage {
  constructor(page: Page) {
    super(page)
  }

  private readonly submitNavButton = '.MuiGrid-root button[type=submit]'
  private readonly backNavButton = '.MuiGrid-root button[type=button]'
  private readonly partnerOtherRoleInputField = "input[name='partner.otherText']"
  private readonly companyOtherRoleInputField = "input[name='company.otherText']"
  private readonly contactFormFirstNameInputField = "input[name='person.firstName']"
  private readonly contactFormLastNameInputField = "input[name='person.lastName']"
  private readonly contactFormEmailInputField = "input[name='person.email']"
  private readonly contactFormPhoneInputField = "input[name='person.phone']"
  private readonly contactFormCommentInputField = "textarea[name='person.comment']"
  private readonly agreeWithTerms = bgLocalizationValidation['agree-with']
  private readonly understandTerms = bgLocalizationValidation['informed-agree-with']
  private readonly bgThankYouForSupportH4 = bgLocalizationSupport.steps['thank-you'].content
  private readonly enThankYouForSupportH4 = enLocalizationSupport.steps['thank-you'].content
  private readonly bgSendSubmitButton = bgLocalizationSupport.cta.submit
  private readonly bgSubmitButton = bgLocalizationSupport.cta.next
  private readonly enSubmitButton = enLocalizationSupport.cta.submit
  private readonly bgBackButton = bgLocalizationSupport.cta.back
  private readonly enBackButton = enLocalizationSupport.cta.back
  // Step Additional Questions
  private readonly bgAdditionalQuestionsStepText =
    bgLocalizationSupport.steps['addition-questions'].title
  private readonly enAdditionalQuestionsStepText =
    enLocalizationSupport.steps['addition-questions'].title
  // Step Contact Data
  private readonly bgContactDataStepText = bgLocalizationSupport.steps.info.title
  private readonly enContactDataStepText = enLocalizationSupport.steps.info.title
  // Step Participation
  private readonly bgParticipationStepText = bgLocalizationSupport.steps['thank-you'].title
  private readonly enParticipationStepText = enLocalizationSupport.steps['thank-you'].title

  /**
   * Click on the Submit/Napred button
   * @param {LanguagesEnum} language
   */
  async clickSubmitButton(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
    await this.waitForElementToBePresentedBySelector(this.submitNavButton)
    if (language === LanguagesEnum.BG) {
      await this.clickElement(this.submitNavButton, { hasText: this.bgSubmitButton })
    } else if (language === LanguagesEnum.EN) {
      await this.clickElement(this.submitNavButton, { hasText: this.enSubmitButton })
    } else {
      throw new Error("Invalid language selection. Please, check 'languages.enum.ts'.")
    }
  }

  /**
   * Click on the Submit/Izpratete button
   * @param {LanguagesEnum} language
   */
  async clickSendSubmitButton(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
    await this.waitForElementToBePresentedBySelector(this.submitNavButton)
    if (language === LanguagesEnum.BG) {
      await this.clickElement(this.submitNavButton, { hasText: this.bgSendSubmitButton })
    } else if (language === LanguagesEnum.EN) {
      await this.clickElement(this.submitNavButton, { hasText: this.enSubmitButton })
    } else {
      throw new Error("Invalid language selection. Please, check 'languages.enum.ts'.")
    }
  }

  /**
   * Click on the Back nav button
   * @param {LanguagesEnum} language
   */
  async clickBackButton(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
    await this.waitForElementToBePresentedBySelector(this.backNavButton)
    if (language === LanguagesEnum.BG) {
      await this.scrollToElementCenterBySelector(this.backNavButton, { hasText: this.bgBackButton })
      await this.clickElement(this.backNavButton, { hasText: this.bgBackButton })
    } else if (language === LanguagesEnum.EN) {
      await this.scrollToElementCenterBySelector(this.backNavButton, { hasText: this.enBackButton })
      await this.clickElement(this.backNavButton, { hasText: this.enBackButton })
    } else {
      throw new Error("Invalid language selection. Please, check 'languages.enum.ts'.")
    }
  }

  /**
   * Set other partner role through the input field
   * @param {string} otherPartnerRoleText
   */
  async setOtherPartnerRoleInputField(otherPartnerRoleText: string): Promise<void> {
    await this.setInputFieldBySelector(this.partnerOtherRoleInputField, otherPartnerRoleText)
  }

  /**
   * Get other partner role input field text
   * @param {string} otherPartnerRoleText
   */
  async getOtherPartnerRoleInputField(): Promise<string | null> {
    return this.getTextOfElementBySelector(this.partnerOtherRoleInputField)
  }

  /**
   * Set other company through the input field
   * @param {string} otherCompanyText
   */
  async setOtherCompanyInputField(otherCompanyText: string): Promise<void> {
    await this.setInputFieldBySelector(this.companyOtherRoleInputField, otherCompanyText)
  }

  /**
   * Get other company input field text
   * @param {string} otherPartnerRoleText
   */
  async getOtherCompanyInputField(): Promise<string | null> {
    return this.getTextOfElementBySelector(this.companyOtherRoleInputField)
  }

  /**
   * Fill contact form all input fields
   * @param {Array<string>} volunteerData
   */
  async fillContactForm(volunteerData: Array<string>): Promise<void> {
    await this.setInputFieldBySelector(this.contactFormFirstNameInputField, volunteerData[0])
    await this.setInputFieldBySelector(this.contactFormLastNameInputField, volunteerData[1])
    await this.setInputFieldBySelector(this.contactFormEmailInputField, volunteerData[2])
    await this.setInputFieldBySelector(this.contactFormPhoneInputField, volunteerData[3])
    await this.setInputFieldBySelector(this.contactFormCommentInputField, volunteerData[4])
    await this.selectCheckboxByLabelText([this.agreeWithTerms, this.understandTerms])
    // Stop form submission, because of email sending
    // await this.clickSendSubmitButton()
  }

  /**
   * Is Thank You for your support H4 heading visible
   * @param {string} language
   */
  async isThankYouSupportH4HeadingVisible(
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<boolean> {
    return this.isH4HeadingVisible(
      language,
      this.bgThankYouForSupportH4,
      this.enThankYouForSupportH4,
    )
  }

  /**
   * Is "Additional Questions" step active
   */
  async isAdditionalQuestionsStepActive(
    language: LanguagesEnum = LanguagesEnum.BG,
  ): Promise<boolean> {
    if (language === LanguagesEnum.BG) {
      return this.isStepActiveByLabelText(this.bgAdditionalQuestionsStepText)
    } else if (language === LanguagesEnum.EN) {
      return this.isStepActiveByLabelText(this.enAdditionalQuestionsStepText)
    } else {
      throw new Error('Language not found!')
    }
  }

  /**
   * Is "Contact Data" step active
   */
  async isContactDataStepActive(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
    if (language === LanguagesEnum.BG) {
      return this.isStepActiveByLabelText(this.bgContactDataStepText)
    } else if (language === LanguagesEnum.EN) {
      return this.isStepActiveByLabelText(this.enContactDataStepText)
    } else {
      throw new Error('Language not found!')
    }
  }

  /**
   * Is "Participation" step active
   */
  async isParticipationStepActive(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
    if (language === LanguagesEnum.BG) {
      return this.isStepActiveByLabelText(this.bgParticipationStepText)
    } else if (language === LanguagesEnum.EN) {
      return this.isStepActiveByLabelText(this.enParticipationStepText)
    } else {
      throw new Error('Language not found!')
    }
  }
}
