import { Page } from '@playwright/test'
import { BasePage } from '../web-pages/base.page'
import { bgLocalizationCommon, enLocalizationCommon } from '../../data/localization'
import { LanguagesEnum } from '../../data/enums/languages.enum'

export class HeaderPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  private readonly muiToolbarRootSelector = '.MuiToolbar-root'
  private readonly headerLogo = this.muiToolbarRootSelector + ' .PodkrepiLogo-letters'
  private readonly toolbarCommonButtonsSelector = this.muiToolbarRootSelector + ' button'
  private readonly toolbarAnchorButtonSelector = this.muiToolbarRootSelector + ' a .MuiButton-root'
  private readonly headerSubmenuLinks = '.MuiMenu-list a span'

  // Values from the localization json file
  private readonly bgDonateNavLink = bgLocalizationCommon.nav.donate
  private readonly enDonateNavLink = enLocalizationCommon.nav.donate
  private readonly bgCampaignsNavLink = bgLocalizationCommon.nav.campaigns.index
  private readonly enCampaignsNavLink = enLocalizationCommon.nav.campaigns.index
  private readonly bgAboutUsNavLink = bgLocalizationCommon.nav.about['about-us']
  private readonly enAboutUsNavLink = enLocalizationCommon.nav.about['about-us']
  // Header submenu options
  private readonly bgAllCampaignsNavLink = bgLocalizationCommon.nav.campaigns['all-campaigns']
  private readonly enAllCampaignsNavLink = enLocalizationCommon.nav.campaigns['all-campaigns']
  // Koi sme nie / Who are we
  private readonly bgWhoAreWeNavLink = bgLocalizationCommon.nav.about['who-are-we']
  private readonly enWhoAreWeNavLink = enLocalizationCommon.nav.about['who-are-we']
  // Stanete dobrovolec / Join us
  private readonly bgJoinUsNavLink = bgLocalizationCommon.nav.about['support-us']
  private readonly enJoinUsNavLink = enLocalizationCommon.nav.about['support-us']

  /**
   * Click on the header icon Podkrepi.bg
   */
  async clickHeaderIcon(): Promise<void> {
    await this.clickElement(this.headerLogo)
  }

  /**
   * Click on the main header navigation link by text
   * @param {string} navTextBg
   * @param {string} navTextEn
   * @param {LanguagesEnum} language
   */
  async clickHeaderNavLink(
    navTextBg: string,
    navTextEn: string,
    language: LanguagesEnum,
  ): Promise<void> {
    await this.waitForElementToBePresentedBySelector(this.toolbarCommonButtonsSelector)
    if (language === LanguagesEnum.BG) {
      await this.clickElement(this.toolbarCommonButtonsSelector, { hasText: navTextBg })
    } else if (language === LanguagesEnum.EN) {
      await this.clickElement(this.toolbarCommonButtonsSelector, { hasText: navTextEn })
    } else {
      throw new Error("Invalid language selection. Please, check 'languages.enum.ts'.")
    }
  }

  /**
   * Click on the header submenu navigation link by text
   * @param {LanguagesEnum} language
   * @param {string} navTextBg
   * @param {string} navTextEn
   */
  async clickHeaderSubmenuNavLink(
    language: LanguagesEnum,
    navTextBg: string,
    navTextEn: string,
  ): Promise<void> {
    if (language === LanguagesEnum.BG) {
      await this.waitForElementToBeReadyBySelector(this.headerSubmenuLinks, { hasText: navTextBg })
      await this.clickElement(this.headerSubmenuLinks, { hasText: navTextBg })
    } else if (language === LanguagesEnum.EN) {
      await this.waitForElementToBeReadyBySelector(this.headerSubmenuLinks, { hasText: navTextEn })
      await this.clickElement(this.headerSubmenuLinks, { hasText: navTextEn })
    } else {
      throw new Error("Invalid language selection. Please, check 'languages.enum.ts'.")
    }
  }

  /**
   * Click on the header navigation button 'Donate'
   * @param {LanguagesEnum} language - the default is BG
   */
  async clickDonateHeaderNavButton(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
    await this.waitForElementToBePresentedBySelector(this.toolbarAnchorButtonSelector)
    if (language === LanguagesEnum.BG) {
      await this.clickElement(this.toolbarAnchorButtonSelector, { hasText: this.bgDonateNavLink })
    } else if (language === LanguagesEnum.EN) {
      await this.clickElement(this.toolbarAnchorButtonSelector, { hasText: this.enDonateNavLink })
    } else {
      throw new Error("Invalid language selection. Please, check 'languages.enum.ts'.")
    }
  }

  /**
   * Click on the header navigation button 'Campaigns'
   * @param {LanguagesEnum} language - the default is BG
   */
  async clickCampaignsHeaderNavButton(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
    await this.clickHeaderNavLink(this.bgCampaignsNavLink, this.enCampaignsNavLink, language)
    await this.clickHeaderSubmenuNavLink(
      language,
      this.bgAllCampaignsNavLink,
      this.enAllCampaignsNavLink,
    )
  }

  /**
   * Click on the header navigation button 'About Us'
   * @param {LanguagesEnum} language - the default is BG
   */
  async clickAboutUsHeaderNavButton(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
    await this.clickHeaderNavLink(this.bgAboutUsNavLink, this.enAboutUsNavLink, language)
  }

  /**
   * Click on the header navigation button 'Join Us'
   * @param {LanguagesEnum} language - the default is BG
   */
  async clickJoinUsHeaderNavButton(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
    await this.clickAboutUsHeaderNavButton(language)
    await this.clickHeaderSubmenuNavLink(language, this.bgJoinUsNavLink, this.enJoinUsNavLink)
  }

  /**
   * Click on the language header button to change the page language
   * @param {LanguagesEnum} languageParam
   */
  async changeanguageHeaderButtonToBe(languageParam: LanguagesEnum): Promise<void> {
    await this.clickHeaderNavLink(LanguagesEnum.BG, LanguagesEnum.EN, languageParam)
  }
}
