import { test, expect} from '../../src/fixtures/baseFixture';
import users from '../../src/test-data/users.json';
for (const user of users) {
    test(`e2e: login with ${user.username}`, async({page,loginPage, healer}) => {
        test.setTimeout(60000);
        await page.goto('/');
        await loginPage.login(user.username,'secret_sauce');
        if(user.username === 'locked_out_user'){
            await expect(page.locator('[data-test="error"]')).toContainText('locked out');
        }
        else{
            await expect(page.locator('.inventory_list')).toBeVisible();
            if(user.username === 'standard_user'){
                await healer.safeClick('[data-test="wrong-selector"]','add to cart');
                await page.locator('.shopping_cart_link').click();
                await expect(page.locator('.inventory_item_name').first()).toBeVisible();
            }
        }
    });
}
 