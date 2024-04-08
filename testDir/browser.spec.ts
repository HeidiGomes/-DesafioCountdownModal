import { test, expect } from '@playwright/test';

test('testando interação com o desafio', async ({ page }) => {
  // Navega até a página inicial
  await page.goto('http://localhost:5173');

  // Preenche os campos do formulário
  await page.fill('input[placeholder="Enter your name"]', 'John Doe');
  await page.fill('input[placeholder="Enter your phone"]', '123456789');
  await page.fill('input[placeholder="Enter your Email"]', 'john@example.com');

  // Clica no botão "Start Challenge"
  await page.click('button:has-text("Start Challenge")');

  // Verifica se o timer está contando
  await page.waitForSelector('div:has-text("Remaining time")');

  // Aguarda 15 segundos (tempo do desafio)
  await page.waitForTimeout(15000);

  // Verifica se o modal apareceu após o término do desafio
  await expect(page.locator('div:has-text("Challenge ended with failure!")')).toBeVisible();

  // Clica no botão "Candidate"
  await page.click('button:has-text("Candidate")');

  // Verifica se a página de candidatos foi carregada
  await expect(page.url()).toContain('/candidatos');
});

test('testando retorno à página inicial', async ({ page }) => {
  // Navega até a página de candidatos
  await page.goto('http://localhost:5173/candidatos');

  // Clica no botão "Start of Challenge"
  await page.click('button:has-text("Start of Challenge")');

  // Verifica se o timer está contando
  await page.waitForSelector('div:has-text("Remaining time")');

  // Retorna à página inicial
  await page.click('button:has-text("Start of Challenge")');

  // Verifica se o timer foi reiniciado
  await page.waitForSelector('button:has-text("Start Challenge")');
});

