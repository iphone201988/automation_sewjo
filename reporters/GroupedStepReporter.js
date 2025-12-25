const WDIOReporter = require('@wdio/reporter').default;

class GroupedStepReporter extends WDIOReporter {
    constructor(options) {
        super(options);
        this.currentSuiteName = "";
        this.logs = {};
    }

    onSuiteStart(suite) {
        if (!suite.title) return;
        this.currentSuiteName = suite.title;
        this.logs[this.currentSuiteName] = [];

        this.log(`\n=== TESTING → ${suite.title} ===`);
    }

    onStdout(stdout) {
        if (this.currentSuiteName) {
            const clean = stdout.toString().trim();
            if (clean !== "") {
                this.logs[this.currentSuiteName].push(clean);
            }
        }
    }

    onSuiteEnd(suite) {
        if (!suite.title) return;

        this.log(`\n--- SUMMARY FOR: ${suite.title} ---`);

        const suiteLogs = this.logs[suite.title] || [];
        suiteLogs.forEach(line => this.log(line));

        const hasFail = suiteLogs.some(line => line.startsWith('✗'));

        if (hasFail) this.log("❌ Result: Some steps failed.");
        else this.log("✅ Result: All steps passed.");

        this.log(`--- END OF ${suite.title} ---\n`);
    }
}

module.exports = GroupedStepReporter;
