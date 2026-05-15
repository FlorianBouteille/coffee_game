import {test, expect} from '@playwright/test';

test('test de la page d\'accueil', async ({ page }) => {

    await page.goto('http://localhost:3000');

    await page.click(':has-text("Démarrer")');

    await page.getByRole('link', { name: 'Démarrer' }).click();

    await page.waitForTimeout(2000);

    await expect(page).toHaveURL('http://localhost:3000/trials/first');

    await page.waitForSelector(':text("Répondez vite à cette question !")'); 
});

test('test de trial lol', async ({page}) => 
{
    await page.goto('http://localhost:3000/trials/first');

    await expect(page).toHaveTitle('')
})
