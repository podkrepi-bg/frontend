import { expect, Locator, Page } from '@playwright/test';
import { LanguagesEnum } from '../../../data/enums/languages.enum';
import { bgLocalizationCampaigns, bgLocalizationIndex, enLocalizationCampaigns } from '../../../data/localization';
import { HomePage } from '../home.page';


export class CampaignsPage extends HomePage {

    constructor(page: Page) {
        super(page);
    }

    private readonly donationGrid = ".InlineDonation-inlineDonationWrapper";
    private readonly donationSupportButton = this.donationGrid + " a button";
    private readonly filterButtonsCommonSelector = "ul button.CampaignFilter-filterButtons";
    // private readonly campaignContainerItem = ".MuiGrid-container .MuiGrid-item";
    private readonly cardActions = ".MuiCardActions-root";
    private readonly cardActionButtons = this.cardActions + " button";
    // Focused campaigns for tests (hardcoded text here because I didn't find it anywhere else)
    protected readonly campaignSchoolVarnaText = "Училище за деца с нарушено зрение гр. Варна - стая за ерготерапия";
    protected readonly campaignCrisisCenterText = "Кризисен център за пострадали от насилие - шанс за нов живот";
    // Main headings
    private readonly bgMainCampaignsHeading = bgLocalizationCampaigns.campaigns;
    private readonly enMainCampaignsHeading = enLocalizationCampaigns.campaigns;
    private readonly bgSupportCauseTodayHeading = bgLocalizationCampaigns.cta['support-cause-today'];
    private readonly enSupportCauseTodayHeading = enLocalizationCampaigns.cta['support-cause-today'];
    private readonly bgSupportNowActionButtonText = bgLocalizationCampaigns.cta['support-now'];
    private readonly enSupportNowActionButtonText = enLocalizationCampaigns.cta['support-now'];

    /**
     * Click donation Support button into the donation grid container
     */
    async clickDonationSupportButton(): Promise<void> {
        await this.clickElement(this.donationSupportButton);
    }
    
    /**
     * Open campaign "School for children Varna" H5 heading link on the main Campaigns page
     * @param {LanguagesEnum} language, the default is BG
     */
    async clickCampaignSchoolChildrenVarna(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
        await this.clickH5HeadingByText(language, this.campaignSchoolVarnaText);
    }

    /**
     * Get filter buttons count on the Campaigns page
     */
    async getFilterButtonsCount(): Promise<number> {
        return this.getCountOfElementsBySelector(this.filterButtonsCommonSelector);
    }

    /**
     * Check if the main "Campaigns" page H1 heading is visible on the Campaigns page
     * @param {LanguagesEnum} language - the default value is BG
     */
    async isCampaignsHeadingVisible(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
        return this.isH1HeadingVisible(this.bgMainCampaignsHeading, this.enMainCampaignsHeading, language);
    }

    /**
     * Check if "Support cause today" page H6 heading is visible on the Campaigns page
     * @param {LanguagesEnum} language - the default value is BG
     */
    async isSupportCauseTodayHeadingVisible(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
        return this.isH6HeadingVisible(language, this.bgSupportCauseTodayHeading, this.enSupportCauseTodayHeading);
    }
 
    /**
     * Check if "School children Varna" campaign H1 heading is visible on the Campaigns page
     * @param {LanguagesEnum} language - the default value is BG
     */
    async isSchoolChildrenVarnaHeadingVisible(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
        return this.isH1HeadingVisible(this.campaignSchoolVarnaText, null, language);
    }

    /**
     * Open campaign "Crisis Center - New Life Chance" H5 heading link on the main Campaigns page
     * @param {LanguagesEnum} language, the default is BG
     */
    async clickCampaignCrisisCenter(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
        await this.clickH5HeadingByText(language, this.campaignCrisisCenterText);
    }

    /**
     * Check if "Crisis Center - New Life Chance" campaign H1 heading is visible on the Campaigns page
     * @param {LanguagesEnum} language - the default value is BG
     */
    async isCrisiCenterHeading1Visible(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
        return this.isH1HeadingVisible(this.campaignCrisisCenterText, null, language);
    }

    /**
     * Check if "Crisis Center - New Life Chance" campaign H4 heading is visible on the Campaigns page
     * @param {LanguagesEnum} language - the default value is BG
     */
    async isCrisiCenterHeading4Visible(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
        return this.isH4HeadingVisible(this.campaignCrisisCenterText, null, language);
    }

    /**
     * Click card action button by its H5 heading
     * @param {string} heading
     * @param {string} action
     * @param {LanguagesEnum} language - the default value is BG
     */
    async clickCampaignCardButtonByHeading(heading: string, action: string, language?: LanguagesEnum): Promise<void> {
        const cardActionButtonElement = this.page.locator(this.h5HeadingsSelector, {hasText: heading}).locator("../../..").locator(this.cardActionButtons, {hasText: action});
        await this.clickElementByLocator(cardActionButtonElement);
    }

    /**
     * Click Support Now action button on card "Crisis Center - New Life Chance"
     * @param {LanguagesEnum} language - the default value is BG
     */
    async clickActionButtonSupportNowCrisisCenter(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
        if (language === LanguagesEnum.BG) {
            await this.clickCampaignCardButtonByHeading(this.campaignCrisisCenterText, this.bgSupportNowActionButtonText);
        } else if (language === LanguagesEnum.EN) {
            await this.clickCampaignCardButtonByHeading(this.campaignCrisisCenterText, this.enSupportNowActionButtonText);
        } else {
            throw new Error("Invalid language!");
        }
    }
}
