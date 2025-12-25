
// Swipe function --------------------------------
export async function swipeUp() {
        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: 500, y: 1600 },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 300 },
                { type: 'pointerMove', duration: 800, x: 500, y: 700 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
        await driver.pause(1000);
        return;
    }

// Save button with pointer -----------------------------------
     export async function saveButtonClick() {
        console.log('🟢 Clicking Save button (center-bottom pointer tap)');
        const { width, height } = await driver.getWindowRect();
        const x = Math.floor(width / 2);
        const y = Math.floor(height - 100);
        console.log(`📏 Screen size: ${width}x${height}, tapping at (${x}, ${y})`);
        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x, y },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
        await driver.pause(2000);
        return;
    }

    // Upload button with the pointer ------------------------------------------
        export async function uploadButtonClick() {
        console.log('🟢 Clicking Upload button using fixed coordinates fallback');
        const coords = [
            { x: 673, y: 2653 },
            { x: 415, y: 2702.8 },
            { x: 618, y: 2629.8 }
        ];
        for (const p of coords) {
            try {
                console.log(`📍 tapping at (${p.x}, ${p.y})`);
                await driver.performActions([{
                    type: 'pointer',
                    id: 'finger1',
                    parameters: { pointerType: 'touch' },
                    actions: [
                        { type: 'pointerMove', duration: 0, x: p.x, y: p.y },
                        { type: 'pointerDown', button: 0 },
                        { type: 'pause', duration: 100 },
                        { type: 'pointerUp', button: 0 }
                    ]
                }]);
                await driver.pause(1200);
                return;
            } catch (err) {
                console.warn(`⚠ Failed tap at (${p.x}, ${p.y}) — continuing to next coordinate`);
                throw new Error(`⚠ Failed tap at (${p.x}, ${p.y}) — continuing to next coordinate`)
            }
        }
    }



    export async function swipeUpLongFast() {
     await driver.performActions([{
        type: 'pointer',
        id: 'finger_long_fast',
        parameters: { pointerType: 'touch' },
        actions: [
            { type: 'pointerMove', duration: 0, x: 500, y: 1700 },  // bottom
            { type: 'pointerDown', button: 0 },
            { type: 'pointerMove', duration: 450, x: 500, y: 300 }, // not too fast, stable
            { type: 'pointerUp', button: 0 }
        ]
    }]);
    await driver.pause(400);
}



// otp fetch function ------------------------------------------

const axios = require("axios");

async function getSewjoOtp(email) {
    const maxRetries = 10;
    const retryDelay = 1000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`🔍 Fetching OTP for ${email}, Attempt ${attempt}`);

            const response = await axios.get(
                `https://34.31.76.152:8000/api/auth/get-sent-otp?email=${email}`
            );

            const otp = response.data?.data?.otp;

            if (otp && String(otp).length === 6) {
                console.log(`✅ OTP Received: ${otp}`);
                return String(otp);
            }

        } catch (err) {
            console.log("⚠️ OTP API call failed. Retrying...");
        }

        await new Promise(res => setTimeout(res, retryDelay));
    }

    throw new Error("❌ Failed to fetch OTP after 5 attempts");
}

async function enterSixDigitSewjoOtp(otp) {
    const fields = [
        0, 1, 2, 3, 4, 5
    ];

    console.log(`⌨️ Entering OTP: ${otp}`);

    for (let i = 0; i < fields.length; i++) {
        const selector = `android=new UiSelector().className("android.widget.EditText").instance(${i})`;
        await $(selector).setValue(otp[i]);
    }

    console.log("✅ OTP Entered Successfully");
}

module.exports = {
    getSewjoOtp,
    enterSixDigitSewjoOtp
};




// --------------------- STEP LOGGER (GLOBAL) ---------------------
const { expect } = require("@wdio/globals");

let steps = [];

function pass(step) {
    console.log(`✓ ${step}`);
    steps.push({ step, status: "PASS" });
}

function fail(step) {
    console.log(`✗ ${step}`);
    steps.push({ step, status: "FAIL" });
    expect.fail(step);
}

async function clickElement(selector, step) {
    try {
        await $(selector).click();
        pass(step);
    } catch (e) {
        fail(step);
    }
}

async function verifyElement(selector, step) {
    try {
        const el = await $(selector);
        await el.waitForDisplayed({ timeout: 5000 });
        pass(step);
    } catch (e) {
        fail(step);
    }
}

function printSummary(title = "TEST SUMMARY") {
    console.log(`\n======= 📌 ${title} =======`);
    steps.forEach(s => console.log(`${s.status === "PASS" ? "✓" : "✗"} ${s.step}`));
    console.log("=============================================\n");
    steps = []; // reset for next test file
}

module.exports = {
    ...module.exports, // keep your existing exports
    pass,
    fail,
    clickElement,
    verifyElement,
    printSummary,
    steps
};

