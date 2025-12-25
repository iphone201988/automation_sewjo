const { expect } = require('@wdio/globals');

describe('🧵 Sewjo Login Test Suite', () => {
    let results = []; // store pass/fail results

    const logResult = (step, passed, message) => {
        results.push({ step, passed, message });
        console.log(`${passed ? '✅' : '❌'} ${message}`);
    };

    // 🆕 Utility to dismiss Android Save Password popup
    const dismissSavePasswordPopup = async () => {
        try {
            const popup = await $("android=new UiSelector().resourceId(\"com.google.android.gms:id/title\")");
            if (await popup.isDisplayed()) {
                console.log('⚠️ Save Password popup detected — dismissing...');
                const noBtn = await $("android=new UiSelector().resourceId(\"android:id/autofill_dialog_no\")");
                await noBtn.click();
                console.log('✅ Save Password popup dismissed.');
                await driver.pause(1000);
            }
        } catch (err) {
            // Ignore if popup not shown
        }
    };

    // Automatically handle popup before and after each test
    beforeEach(async () => {
        await dismissSavePasswordPopup();
    });

    afterEach(async () => {
        await dismissSavePasswordPopup();
    });

    after(() => {
        console.log('\n=== 🧾 TEST STEP SUMMARY ===');
        results.forEach(r => {
            console.log(`${r.passed ? '✓' : '✗'} ${r.step}`);
        });

        const failed = results.filter(r => !r.passed);
        if (failed.length === 0) {
            console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!');
        } else {
            console.log(`❌ ${failed.length} TEST(S) FAILED!`);
        }
    });

    // ========== TEST CASES START ==========

    it('1️⃣ Step 1: Verify login screen elements', async () => {
        console.log('Step 1: Checking if all login fields are visible...');
        try {
            const welcomeText = await $("android=new UiSelector().text(\"Welcome Back to Sewjo!\")");
            const emailField = await $("android=new UiSelector().className(\"android.widget.EditText\")");
            const passwordField = await $("android=new UiSelector().className(\"android.view.ViewGroup\").instance(13)");

            if (await welcomeText.isDisplayed() && await emailField.isDisplayed() && await passwordField.isDisplayed()) {
                logResult('Step 1: All login fields are visible.', true, 'Step 1 passed');
            } else {
                logResult('Step 1: Some login elements missing.', false, 'Step 1 failed');
            }
        } catch (err) {
            logResult('Step 1: Error while verifying login fields.', false, err.message);
        }
    });


    it('2️⃣ Case 1: Submit without email or password', async () => {
        console.log('Step 2: Trying to submit empty fields...');
        try {
            const continueBtn = await $("android=new UiSelector().text(\"Continue\")");
            await continueBtn.click();
            await driver.pause(2000);

            const errorText = await $("android=new UiSelector().text(\"No account found.Try again or create a new account.\")");

            if (await errorText.isDisplayed()) {
                logResult('Case 1: Proper error displayed for empty fields.', true, 'Case 1 passed');
            } else {
                logResult('Case 1: Error message not found.', false, 'Case 1 failed');
            }
        } catch (err) {
            logResult('Case 1: Exception during empty field check.', false, err.message);
        }
    });


    it('3️⃣ Case 2: Submit with email only (password empty)', async () => {
        console.log('Step 3: Entering email without password...');
        try {
            const emailField = await $("android=new UiSelector().className(\"android.widget.EditText\")");
            await emailField.clearValue();
            await emailField.setValue("Test@gmail.com");
            await driver.hideKeyboard();

            const continueBtn = await $("android=new UiSelector().text(\"Continue\")");
            await continueBtn.click();
            await driver.pause(2000);

            const errorText = await $("android=new UiSelector().text(\"Please enter Password\")");

            if (await errorText.isDisplayed()) {
                logResult('Case 2: Correct error for missing password.', true, 'Case 2 passed');
            } else {
                logResult('Case 2: Missing password error not shown.', false, 'Case 2 failed');
            }
        } catch (err) {
            logResult('Case 2: Exception during email-only test.', false, err.message);
        }
    });


    it('4️⃣ Case 3: Submit with invalid credentials', async () => {
        console.log('Step 4: Testing invalid credentials...');
        try {
            const emailField = await $("android=new UiSelector().className(\"android.widget.EditText\")");
            await emailField.clearValue();
            await emailField.setValue("Test@gmail.com");

            const passwordField = await $("android=new UiSelector().className(\"android.view.ViewGroup\").instance(13)");
            await passwordField.click();
            await driver.execute('mobile: type', { text: '123456789' });
            await driver.hideKeyboard();

            const continueBtn = await $("android=new UiSelector().text(\"Continue\")");
            await continueBtn.click();
            await driver.pause(2000);

            const errorText = await $("android=new UiSelector().text(\"Wrong credentials!\")");

            if (await errorText.isDisplayed()) {
                logResult('Case 3: Wrong credentials message displayed.', true, 'Case 3 passed');
            } else {
                logResult('Case 3: No invalid credentials message.', false, 'Case 3 failed');
            }
        } catch (err) {
            logResult('Case 3: Exception during invalid credential test.', false, err.message);
        }
    });


    it('5️⃣ Case 4: Submit with invalid email format', async () => {
        console.log('Step 5: Testing invalid email format...');
        try {
            const emailField = await $("android=new UiSelector().className(\"android.widget.EditText\")");
            await emailField.clearValue();
            await emailField.setValue("Testgmail.com");

            const passwordField = await $("android=new UiSelector().className(\"android.view.ViewGroup\").instance(13)");
            await passwordField.click();
            await driver.execute('mobile: type', { text: '123456789' });
            await driver.hideKeyboard();

            const continueBtn = await $("android=new UiSelector().text(\"Continue\")");
            await continueBtn.click();
            await driver.pause(2000);

            const errorText = await $("android=new UiSelector().text(\"Please enter a vaild email\")");

            if (await errorText.isDisplayed()) {
                logResult('Case 4: Invalid email message displayed.', true, 'Case 4 passed');
            } else {
                logResult('Case 4: Invalid email message missing.', false, 'Case 4 failed');
            }
        } catch (err) {
            logResult('Case 4: Exception during invalid email test.', false, err.message);
        }
    });

    it('6️⃣ Case 5: Login with all valid details', async () => {
        console.log('Step 6: Testing valid credentials login...');
        try {
            // Clear and enter email
            const emailField = await $("android=new UiSelector().className(\"android.widget.EditText\")");
            await emailField.clearValue();
            await emailField.setValue("iop@yopmail.com");
            await driver.hideKeyboard();

            // Locate password container and inner EditText
            const passwordContainer = await $("android=new UiSelector().className(\"android.view.ViewGroup\").instance(13)");
            await passwordContainer.click();
            await driver.pause(1000);

            // Try finding inner EditText and clear it
            const passwordInput = await $$("android.widget.EditText");
            if (passwordInput.length > 1) {
                await passwordInput[1].clearValue(); // Assuming index 1 is password input
                await passwordInput[1].setValue("Test123@");
            } else {
                // fallback if only one EditText visible
                await driver.execute('mobile: type', { text: 'Test123@' });
            }

            await driver.hideKeyboard();

            // Click Continue
            const continueBtn = await $("android=new UiSelector().text(\"Continue\")");
            await continueBtn.click();
            await driver.pause(7000);

            // Verify success
            const stashText = await $("android=new UiSelector().text(\"All Stash\")");
            if (await stashText.isDisplayed()) {
                logResult('Case 5: Successfully logged in to All Stash.', true, 'Case 5 passed');
            } else {
                logResult('Case 5: Login did not navigate to All Stash.', false, 'Case 5 failed');
            }

        } catch (err) {
            logResult('Case 5: Exception during valid login test.', false, err.message);
        }
    });

    // ========== TEST CASES END ==========
});