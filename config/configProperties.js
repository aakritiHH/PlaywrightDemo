const TestConfig = {
    TEST_ENV: process.env.TEST_ENV || 'qa',
    browser: process.env.browser || 'chromium',
    brand: process.env.brand || 'HHstg', //HH, HHstg, mustostg, musto
    country: process.env.country || 'en_global/'

};

module.exports = { TestConfig };