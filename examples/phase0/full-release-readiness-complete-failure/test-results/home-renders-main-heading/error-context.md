# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.js >> renders main heading
- Location: ui/home.spec.js:3:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('h1')
Expected: "Wrong Heading"
Received: "Release Dashboard"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('h1')
    8 × locator resolved to <h1>Release Dashboard</h1>
      - unexpected value "Release Dashboard"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "Release Dashboard" [level=1] [ref=e2]
  - paragraph [ref=e3]: healthy
```

# Test source

```ts
  1  | const { test, expect } = require("@playwright/test");
  2  | 
  3  | test("renders main heading", async ({ page }) => {
  4  |   await page.goto("file://" + process.cwd() + "/index.html");
> 5  |   await expect(page.locator("h1")).toHaveText("Wrong Heading");
     |                                    ^ Error: expect(locator).toHaveText(expected) failed
  6  | });
  7  | 
  8  | test("shows release status", async ({ page }) => {
  9  |   await page.goto("file://" + process.cwd() + "/index.html");
  10 |   await expect(page.locator("#status")).toHaveText("degraded");
  11 | });
```