import { test as base} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {SelfHealingAgent} from '../agents/SelfHealingAgent';

type MyFixtures = {
    loginPage: LoginPage;
    healer: SelfHealingAgent;
};
export const test = base.extend<MyFixtures>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    healer: async ({page}, use) => {
        await use(new SelfHealingAgent(page));
    },
});
export {expect} from '@playwright/test';