exports.config = {

    runner: 'local',
    baseUrl: 'http://localhost',
    framework: 'cucumber',
    maxInstances: process.env.DEBUG_TESTS === 'true' ? 1 : 2,   
    services: ['docker'],
    
    // Browser capabilities
    capabilities: [{    
            'maxInstances': 1,
            'browserName': 'chrome',
            'goog:chromeOptions': {
                args: ['--no-sandbox',].concat(process.env.VNC_SUPPORT === 'true' ? [] : [
                    '--headless',
                    '--disable-gpu',
                    ],
                ),
            },
            'cjson:metadata': {
                device: process.env.SELENIUM_VERSION,
            },
        },
        {
            'maxInstances': 1,
            'browserName': 'firefox',
            'moz:firefoxOptions': {
                args: [].concat(process.env.VNC_SUPPORT === 'true' ? [] : [
                    '-headless',
                    ]
                ),
            },
            'acceptInsecureCerts': true,
            'cjson:metadata': {
                device: process.env.SELENIUM_VERSION,
            },
        }
    ],

    // Server config
    hostname: process.env.HUB_HOST || 'localhost',
    port: parseInt(process.env.HUB_PORT, 10) || 4444,

    // Test config
    specs: [
        './test/e2e/features/**/*.feature'
    ],
    cucumberOpts: {
        require: ['./test/e2e/features/steps/**/*.ts'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        snippets: true,
        source: true,
        profile: [],
        strict: true,
        tagExpression: '',
        timeout: 30000,
        ignoreUndefinedDefinitions: false,
        tagExpression: 'not @Pending',
        tagsInTitle: false,
        failAmbiguousDefinitions: true,
        failFast: false,
    },
    exclude: [
    ],
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,

    // Logging config
    logLevel: 'error',  // trace | debug | info | warn | error
    deprecationWarnings: true,


    // Reporting config
    reporters: ['spec', [
        'cucumberjs-json', {
            jsonFolder: './report/cucumber/',
        }],
    ],

    // Hooks config
    before: function (capabilities, specs) {
        browser.setWindowSize(
            parseInt(process.env.SCREEN_WIDTH, 10),
            parseInt(process.env.SCREEN_HEIGHT, 10),
        );
    },

    afterStep: function (uri, feature, { error, result, duration, passed }, stepData, context) {
        if (error) {
          //addObject(error);
          //addScreenshot();
        }
    },

}
