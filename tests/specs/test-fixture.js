const { test: base } = require('@playwright/test');
const { aiFixture } = require('@zerostep/playwright');

const test = base.extend({
  ...aiFixture(base),
});

module.exports = { test };
