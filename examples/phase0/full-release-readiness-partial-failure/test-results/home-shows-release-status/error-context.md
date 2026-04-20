# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.js >> shows release status
- Location: ui/home.spec.js:8:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#status')
Expected: "degraded"
Received: "healthy"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#status')
    9 × locator resolved to <p id="status">healthy</p>
      - unexpected value "healthy"

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
  5  |   await expect(page.locator("h1")).toHaveText("Release Dashboard");
  6  | });
  7  | 
  8  | test("shows release status", async ({ page }) => {
  9  |   await page.goto("file://" + process.cwd() + "/index.html");
  10 |   // intentional failure for partial-failure simulation
> 11 |   await expect(page.locator("#status")).toHaveText("degraded");
     |                                         ^ Error: expect(locator).toHaveText(expected) failed
  12 | });
```