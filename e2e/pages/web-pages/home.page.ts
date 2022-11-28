import { expect, Locator, Page } from '@playwright/test';
import { LanguagesEnum } from '../../data/enums/languages.enum';
import { bgLocalizationCommon, bgLocalizationIndex, enLocalizationCommon, enLocalizationIndex } from '../../data/localization';
import { BasePage } from '../web-pages/base.page';

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private readonly localhostHomepageLink = 'http://localhost:3040/';
    private readonly devEnvHomepageLink = 'https://dev.podkrepi.bg/';
    private readonly prodHomepageLink = 'https://podkrepi.bg/';

    private readonly containerRootElement = '.MuiContainer-root';
    private readonly h1HeadingsSelector = '.MuiTypography-h1';
    private readonly h4HeadingsSelector = '.MuiTypography-h4';
    protected readonly h5HeadingsSelector = '.MuiTypography-h5';
    private readonly h6HeadingsSelector = '.MuiTypography-h6';
    private readonly h6FaqListHeadingItems = '.MuiListItemText-root h6';
    private readonly h6FaqListAnswerItems = '.MuiCollapse-entered h6.MuiTypography-root';

    // Pair values from the localization json file
    // How does Podkrepi work
    private readonly bgHowDoesPodkrepiWork = bgLocalizationIndex['how-we-work'].heading;
    private readonly enHowDoesPodkrepiWork = enLocalizationIndex['how-we-work'].heading;
    // Who is behind Podkrepi.bg navigation
    private readonly bgTeamSection = bgLocalizationIndex['team-section'].heading;
    private readonly enTeamSection = enLocalizationIndex['team-section'].heading;
    // Join Podkrepi.bg navigation
    private readonly bgJoinPodkrepiSection = bgLocalizationIndex['join-podkrepi-bg-section'].heading;
    private readonly enJoinPodkrepiSection = enLocalizationIndex['join-podkrepi-bg-section'].heading;
    // FAQ navigation
    private readonly bgFaqSection = bgLocalizationCommon.nav.campaigns.faq;
    private readonly enFaqSection = enLocalizationCommon.nav.campaigns.faq;
    
    // FAQ list questions (currently exists only in BG)
    // TODO Reuse the values from COMMON_QUESTIONS - src\components\faq\contents\common.tsx
    private readonly h6BgWhatIsPodkrepiText = "Какво е Подкрепи.бг?";
    // private readonly h6BgWhatIsTransparecyText = "Какво е „безкомпромисна прозрачност”?";
    // private readonly h6BgWhatAreOurAdvantagesText = "Какви са технологичните ви предимства?";
    // private readonly h6BgWhatAreSustainableSolutionsText = "Какво представляват „устойчивите решения”?";
    // private readonly h6BgHowWeAreFundedText = "Как се финансира Подкрепи.бг?";
    
    // FAQ list answers (currently exists only in BG)
    private readonly h6BgWhatIsPodkrepiAnswer = "Ние сме общност от доброволци, обединени от идеята да създаваме устойчиви решения за развитието на дарителството в България.";

    /**
     * Navigate to the Localhost homepage
     */
    async navigateToLocalhostHomepage(): Promise<void> {
        await this.navigateToUrl(this.localhostHomepageLink);
    }

    /**
     * Navigate to the Dev test environment homepage
     * NOTE: We could use this method for direct tests against the Dev environment
     */
    async navigateToDevEnvHomepage(): Promise<void> {
        await this.navigateToUrl(this.devEnvHomepageLink);
    }

    /**
     * Navigate to the Prod homepage
     * NOTE: We could use this method for after deploy smoke tests
     */
    async navigateToProdHomepage(): Promise<void> {
        await this.navigateToUrl(this.prodHomepageLink);
    }

    /**
     * Check if H1 heading is visible by text with timeout
     * @param {string} headingBg
     * @param {string | null} headingEn
     * @param {LanguagesEnum} language
     */
    async isH1HeadingVisible(headingBg: string, headingEn: string | null, language: LanguagesEnum): Promise<boolean> {
        await this.waitForElementToBePresentedByLocator(this.page.locator(this.containerRootElement).first());
        if (language === LanguagesEnum.BG) {
            return this.isElementVisibleBySelectorWithTimeout(this.h1HeadingsSelector, {hasText: headingBg});
        } else if (language === LanguagesEnum.EN) {
            return this.isElementVisibleBySelectorWithTimeout(this.h1HeadingsSelector, {hasText: headingEn});
        } else {
            throw new Error("Language not found!");
        }
    }
    
    /**
     * Check if H4 heading is visible by text with timeout
     * @param {string} headingBg
     * @param {string | null} headingEn
     * @param {LanguagesEnum} language
     */
    async isH4HeadingVisible(headingBg: string, headingEn: string | null, language: LanguagesEnum): Promise<boolean> {
        await this.waitForElementToBePresentedByLocator(this.page.locator(this.containerRootElement).first());
        if (language === LanguagesEnum.BG) {
            return this.isElementVisibleBySelectorWithTimeout(this.h4HeadingsSelector, {hasText: headingBg});
        } else if (language === LanguagesEnum.EN) {
            return this.isElementVisibleBySelectorWithTimeout(this.h4HeadingsSelector, {hasText: headingEn});
        } else {
            throw new Error("Language not found!");
        }
    }

    /**
     * Check if H5 heading is visible by text with timeout
     * @param {string} headingBg
     * @param {string | null} headingEn
     * @param {LanguagesEnum} language
     */
    async isH5HeadingVisible(language: LanguagesEnum, headingBg: string | null, headingEn?: string): Promise<boolean> {
        await this.waitForElementToBePresentedByLocator(this.page.locator(this.containerRootElement).first());
        if (language === LanguagesEnum.BG) {
            return this.isElementVisibleBySelectorWithTimeout(this.h5HeadingsSelector, {hasText: headingBg});
        } else if (language === LanguagesEnum.EN) {
            return this.isElementVisibleBySelectorWithTimeout(this.h5HeadingsSelector, {hasText: headingEn});
        } else {
            throw new Error("Language not found!");
        }
    }

    /**
     * Check if H6 heading is visible by text with timeout
     * @param {string} headingBg
     * @param {string | null} headingEn
     * @param {LanguagesEnum} language
     */
    async isH6HeadingVisible(language: LanguagesEnum, headingBg: string | null, headingEn?: string): Promise<boolean> {
        await this.waitForElementToBePresentedByLocator(this.page.locator(this.containerRootElement).first());
        if (language === LanguagesEnum.BG) {
            return this.isElementVisibleBySelectorWithTimeout(this.h6HeadingsSelector, {hasText: headingBg});
        } else if (language === LanguagesEnum.EN) {
            return this.isElementVisibleBySelectorWithTimeout(this.h6HeadingsSelector, {hasText: headingEn});
        } else {
            throw new Error("Language not found!");
        }
    }
    
    /**
     * Check if H6 homepage FAQ heading is visible with timeout
     * @param {LanguagesEnum} language
     * @param {string} headingBg
     * @param {string} headingEn - currently English version is not implemented
     */
    async isHomeH6FaqQuestionVisible(language: LanguagesEnum, headingBg: string, headingEn?: string): Promise<boolean> {
        await this.waitForElementToBePresentedByLocator(this.page.locator(this.containerRootElement).first());
        if (language === LanguagesEnum.BG) {
            const h6ListHeadingItemBg = this.page.locator(this.h6FaqListHeadingItems, {hasText: headingBg});
            await this.scrollToElementCenterByLocator(h6ListHeadingItemBg);
            return this.isElementVisibleByLocatorWithTimeout(h6ListHeadingItemBg);
        } else if (language === LanguagesEnum.EN) {
            const h6ListHeadingItemEn = this.page.locator(this.h6FaqListHeadingItems, {hasText: headingEn});
            await this.scrollToElementCenterByLocator(h6ListHeadingItemEn);
            return this.isElementVisibleByLocatorWithTimeout(h6ListHeadingItemEn);
        } else {
            throw new Error("Language not found!");
        }
    }

    /**
     * Get text of a H6 homepage FAQ answer
     * @param {LanguagesEnum} language
     */
    async getTextOfHomeH6FaqAnswer(language: LanguagesEnum): Promise<string | null> {
        if (language === LanguagesEnum.BG) {
            return (await this.getTextOfElementBySelector(this.h6FaqListAnswerItems));
        } else if (language === LanguagesEnum.EN) {
            return (await this.getTextOfElementBySelector(this.h6FaqListAnswerItems));
        } else {
            throw new Error("Language not found!");
        }
    }
    
    /**
     * Click H5 heading by text
     * @param {LanguagesEnum} language
     * @param {string} headingBg
     * @param {string} headingEn
     */
    async clickH5HeadingByText(language: LanguagesEnum = LanguagesEnum.BG, headingBg: string, headingEn?: string): Promise<void> {
        if (await this.isH5HeadingVisible(language, headingBg, headingEn)) {
            if (language === LanguagesEnum.BG) {
                await this.scrollToElementCenterBySelector(this.h5HeadingsSelector, {hasText: headingBg});
                await this.clickElement(this.h5HeadingsSelector, {hasText: headingBg});
            } else if (language === LanguagesEnum.EN) {
                await this.scrollToElementCenterBySelector(this.h5HeadingsSelector, {hasText: headingEn});
                await this.clickElement(this.h5HeadingsSelector, {hasText: headingEn});
            } else {
                throw new Error("Language not found!");
            }
        } else {
            throw new Error("H5 header is not visible.");
        }
    }
    
    /**
     * Click H6 homepage FAQ heading from the list by text
     * @param {LanguagesEnum} language
     * @param {string} headingBg
     * @param {string} headingEn
     */
    async clickHomeH6FaqHeadingByText(language: LanguagesEnum, headingBg: string, headingEn?: string): Promise<void> {
        if (await this.isHomeH6FaqQuestionVisible(language, headingBg, headingEn)) {
            if (language === LanguagesEnum.BG) {
                await this.scrollToElementCenterBySelector(this.h6FaqListHeadingItems, {hasText: headingBg});
                await this.clickElement(this.h6FaqListHeadingItems, {hasText: headingBg});
            } else if (language === LanguagesEnum.EN) {
                await this.scrollToElementCenterBySelector(this.h6FaqListHeadingItems, {hasText: headingEn});
                await this.clickElement(this.h6FaqListHeadingItems, {hasText: headingEn});
            } else {
                throw new Error("Language not found!");
            }
        } else {
            throw new Error("FAQ from the list not found.");
        }
    }

    /**
     * Check if 'Kak raboti Podkrepi/How we work' heading is visible with timeout
     * @param {LanguagesEnum} language - the default value is BG
     */
    async isHowWeWorkHeadingVisible(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
        return this.isH4HeadingVisible(this.bgHowDoesPodkrepiWork, this.enHowDoesPodkrepiWork, language);
    }

    /**
     * Check if 'Koi stoi zad Podkrepi/Who is behind Podkrepi' heading is visible with timeout
     * @param {LanguagesEnum} language - the default value is BG
     */
    async isTeamSectionHeadingVisible(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
        return this.isH4HeadingVisible(this.bgTeamSection, this.enTeamSection, language);
    }

    /**
     * Check if 'Prisyedinete se kym Podkrepi/Join Podkrepi' heading is visible with timeout
     * @param {LanguagesEnum} language - the default value is BG
     */
    async isJoinPodkrepiSectionHeadingVisible(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
        return this.isH4HeadingVisible(this.bgJoinPodkrepiSection, this.enJoinPodkrepiSection, language);
    }

    /**
     * Check if 'Chesto zadavani vyprosi/FAQ' heading is visible with timeout
     * @param {LanguagesEnum} language - the default value is BG
     */
    async isFaqSectionHeadingVisible(language: LanguagesEnum = LanguagesEnum.BG): Promise<boolean> {
        return this.isH4HeadingVisible(this.bgFaqSection, this.enFaqSection, language);
    }

    /**
     * Click "What is Podkrepi" H6 FAQ from the list
     * @param {LanguagesEnum} language - the default value is BG
     */
    async clickWhatIsPodkrepiFaqListQuestion(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
        await this.clickHomeH6FaqHeadingByText(language, this.h6BgWhatIsPodkrepiText);
    }
    
    /**
     * Check if 'What is Podkrepi' FAQ list item is visible with timeout
     */
    async isPodkrepiFaqListAnswerVisible(language: LanguagesEnum = LanguagesEnum.BG): Promise<void> {
        const faqAnswerText = await this.getTextOfHomeH6FaqAnswer(language);
        expect(faqAnswerText).toContain(this.h6BgWhatIsPodkrepiAnswer);
    }
}
