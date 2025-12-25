const { expect, driver } = require("@wdio/globals");
const {
    clickElement,
    verifyElement,
    pass,
    fail,
    printSummary,
    getSewjoOtp,
    enterSixDigitSewjoOtp
} = require("../../helping.functions");

describe("🔵 Registration + OTP + Delete Account Flow", () => {

    it("CASE 1 — Create account with mimic details + verify OTP", async () => {

        // 1. Click Sign Up
        
        await clickElement('android=new UiSelector().text("Sign up")',
            "Click on Sign Up");

        await driver.pause(2000);

        // 2. Email
        await clickElement('android=new UiSelector().text("Email")',
            "Click Email field");
        await $('android=new UiSelector().text("Email")')
            .setValue("test66@yopmail.com");
        pass("Entered Email");

        // 3. Password
        await clickElement('android=new UiSelector().text("Password")',
            "Click Password field");
        await $('android=new UiSelector().text("Password")')
            .setValue("Test@123");
        pass("Entered Password");

        // 4. Continue
        await clickElement('android=new UiSelector().text("Continue")',
            "Click Continue");

        // 5. Name
        await clickElement('android=new UiSelector().text("Name")',
            "Click Name");
        await $('android=new UiSelector().text("Name")').setValue("test otp");
        pass("Entered Name");

        // 6. Username
        await clickElement('android=new UiSelector().text("Username")',
            "Click Username");
        await $('android=new UiSelector().text("Username")')
            .setValue("Test123");
        pass("Entered Username");

        // 7. Continue
        await clickElement('android=new UiSelector().text("Continue")',
            "Click Continue");

        await driver.pause(2000);

        // 8. Continue Again
        await clickElement('android=new UiSelector().text("Continue")',
            "Click Continue Again");

        // 9. Jump Into Sewjo
        await clickElement('android=new UiSelector().text("Jump into Sewjo")',
            "Click Jump Into Sewjo");

            await driver.pause ( 1000);

        // 10. 🔵 Fetch OTP from email/API
        const otp = await getSewjoOtp("test66@yopmail.com");
        pass(`Fetched OTP: ${otp}`);

        const otpDigits = otp.split("");

        // 11. Fill OTP fields
        for (let i = 0; i < 6; i++) {
            await $(
                `android=new UiSelector().className("android.widget.EditText").instance(${i})`
            ).setValue(otpDigits[i]);

            pass(`Entered OTP digit ${i + 1}`);
        }

        // 12. Click Jump Into Sewjo after OTP
        await clickElement('android=new UiSelector().text("Jump into Sewjo")',
            "Click Jump Into Sewjo After OTP");
await driver.pause(1000);
        // 13. Verify Stash Empty
await clickElement('android=new UiSelector().text("Next")', );
await clickElement('android=new UiSelector().text("Next")', );
await clickElement('android=new UiSelector().text("Next")', );
await clickElement('android=new UiSelector().text("I Understand & Agree")', );
await clickElement('android=new UiSelector().className("android.widget.ImageView").instance(1)', );
        await verifyElement('android=new UiSelector().text("Oh no! Your Stash is empty!")',
            "Verify user landed on empty stash page");

        pass("Account creation successful");
    });

    // --------------------------------------------------------------------

    it("CASE 2 — Delete account & verify navigation to login", async () => {

        await driver.pause(2000);

        // 1. Verify empty stash
        await verifyElement('android=new UiSelector().text("Oh no! Your Stash is empty!")',
            "Verify stash empty before delete");

        // 2. Profile
        await clickElement('android=new UiSelector().className("android.widget.ImageView").instance(0)',
            "Click Profile");
            await clickElement('android=new UiSelector().className("android.widget.ImageView").instance(1)', );
await clickElement('android=new UiSelector().className("android.widget.ImageView").instance(0)', );
        // 3. Verify Username appears
        await verifyElement('android=new UiSelector().textContains("test")',
            "Verify username visible");

        // 4. More option
        await clickElement('android=new UiSelector().resourceId("icon-button-container")',
            "Click More Options");

        // 5. Account settings
        await clickElement('android=new UiSelector().text("Account Settings")',
            "Click Account Settings");

        // 6. Your Account
        await clickElement('android=new UiSelector().text("Your Account")',
            "Click Your Account");

        // 7. Delete Account
        await clickElement('android=new UiSelector().text("Delete Account")',
            "Click Delete Account");

        // 8. Confirm Delete
        await clickElement('android=new UiSelector().text("Delete Account")',
            "Click Delete Account Confirm");

        // 9. Enter DELETE
        await clickElement('android=new UiSelector().text("DELETE")',
            "Click DELETE field");

        await $('android=new UiSelector().text("DELETE")').setValue("DELETE");
        pass("Entered DELETE text");

        // 10. Final Delete
        await clickElement('android=new UiSelector().text("Delete Account")',
            "Click Final Delete Button");

        await driver.pause(2000);

        // 11. Verify delete alert
        await verifyElement('android=new UiSelector().resourceId("android:id/alertTitle")',
            "Verify Account Deleted Alert");

        // 12. Click OK
        await clickElement('android=new UiSelector().resourceId("android:id/button1")',
            "Click OK on Delete Alert");

        // 13. Verify Login Page
        await verifyElement('android=new UiSelector().textContains("Welcome Back")',
            "Verify navigation back to Login page");

        pass("Account deleted & navigated to login");
    });

    after(() => {
        printSummary("REGISTRATION + DELETE ACCOUNT SUMMARY");
    });

});
