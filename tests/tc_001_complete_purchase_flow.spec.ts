import { test } from '@playwright/test';
import { run_tc_001_shopping_flow_task } from '@main/flow_tasks/tc_001_shopping_flow_task';

test('TC_001: Verify end-to-end shopping flow based on temperature', async ({ page }) => {
  await run_tc_001_shopping_flow_task(page);
});