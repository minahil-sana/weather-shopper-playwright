//tests/tc-001-complete-purchase-flow.spec.ts
import { test } from '@playwright/test';
import { runTc001ShoppingFlow } from '@main/tc001ShoppingFlow';

test('TC_001: Verify end-to-end shopping flow based on temperature', async ({ page }) => {
  await runTc001ShoppingFlow(page);
});