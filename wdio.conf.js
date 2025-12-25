exports.config = {
    runner: 'local',
    port: 4723,

    specs: [
        // './test/specs/login.test.js',
        // './test//specs/Home.search.js',
        // './test//specs/Home.moreOption.js',
        // './test//specs/fabric.test.js',
        // './test//specs/pattern.all.js',
        // './test//specs/All.to.Notion.test.js',
        // './test//specs/Profile.section.js'
         './test/specs/test.e2e.js'
    ],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Pixel_9_Pro',
        'appium:platformVersion': '16.0',
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'com.sewjoappmobile',
        'appium:appActivity': 'com.sewjoappmobile.MainActivity',
        'appium:noReset': true,
        'appium:autoGrantPermissions': true
    }],

    logLevel: 'info',
    waitforTimeout: 10000,
    connectionRetryTimeout: 5000,
    connectionRetryCount: 1,

    services: [['appium', { command: 'appium' }]],

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 800000,
        bail: true
    },

    before: function () {
        global.stepLogs = [];
        const originalLog = console.log;
        const originalError = console.error;

        console.log = function (...args) {
            originalLog.apply(this, args);
            const message = args.join(' ');
            if (message.startsWith('Step')) {
                stepLogs.push({ step: message, status: '\x1b[32m✓\x1b[0m' });
            }
        };

        console.error = function (...args) {
            originalError.apply(this, args);
            const message = args.join(' ');
            if (message.startsWith('❌')) {
                stepLogs.push({ step: message, status: '\x1b[31m✗\x1b[0m' });
            }
        };
    },

    afterTest: async function (test, context, { error }) {
        if (error) {
            console.error(`❌ Test failed at: ${test.title}`);
        }
    },

    afterSuite: function () {
        console.log('\n\x1b[36m=== TEST STEP SUMMARY ===\x1b[0m');
        if (!stepLogs || stepLogs.length === 0) {
            console.log('\x1b[33mNo steps were logged.\x1b[0m');
            return;
        }
        stepLogs.forEach((log) => {
            console.log(`${log.status} \x1b[37m${log.step}\x1b[0m`);
        });
        console.log('\x1b[36m==========================\x1b[0m\n');
    }
};
