import {Page} from '@playwright/test';
export class SelfHealingAgent {
    constructor(private page: Page) {}
    async safeClick(selector: string, fallbackRole: string) {
        try{
            await this.page.click(selector, {timeout: 3000});
        }
        catch{
            console.log(`[HEALING] ${selector} failed, using fallback: ${fallbackRole}`);
            await this.page.getByRole('button', {name: new RegExp(fallbackRole, 'i')}).first().click();
        }
        }
        async aiFill(selector: string, value: string) {
            try{
                await this.page.locator(selector).fill(value, {timeout: 3000});
            }
            catch{
                console.log(`[HEALING] fill ${selector} failed, trying by placeholder`);
                await this.page.getByPlaceholder(new RegExp(value, 'i')).fill(value).catch(async () => {
                    await this.page.locator('input').first().fill(value);
                });
            }
        }
    }