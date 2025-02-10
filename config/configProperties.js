const TestConfig = {
    TEST_ENV: process.env.TEST_ENV || 'qa',
    browser: process.env.browser || 'chromium',
    brand: process.env.brand || 'mustostg', //HH, HHstg, mustostg, musto
    country: process.env.country || 'en_us/'

};

module.exports = { TestConfig };