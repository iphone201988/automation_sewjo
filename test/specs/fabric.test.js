const { expect, driver, $ } = require('@wdio/globals');
const { saveButtonClick, swipeUp } = require('../../helping.functions');

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
        await el.waitForDisplayed({ timeout: 7000 });
        pass(step);
    } catch (e) {
        fail(step);
    }
}

after(() => {
    console.log("\n======= 📌 FABRIC TEST SUMMARY =======");
    steps.forEach(s => console.log(`${s.status === "PASS" ? "✓" : "✗"} ${s.step}`));
    console.log("========================================\n");
});


// =========================================================
//                  TEST SUITE – FABRIC
// =========================================================

describe("FABRIC MODULE — TEST CASES", () => {


    // ======================================================
    // CASE 1 — Verify Fabric Page
    // ======================================================

    it("CASE 1 — Verify the Fabric Page UI elements", async () => {

        await clickElement('android=new UiSelector().text("Fabric")',
            "Tap on Fabric tab");

        await verifyElement('android=new UiSelector().text("All Fabrics")',
            "Verify 'All Fabrics' text is displayed");
    });



    // ======================================================
    // CASE 2 — Add fabric with Image only
    // ======================================================

    it("CASE 2 — Add Fabric with Image only", async () => {

        await clickElement('android=new UiSelector().text("󰐕")',
            "Tap on Plus (+) icon");

        await clickElement('android=new UiSelector().text("Add Fabric")',
            "Tap on Add Fabric field");

        await clickElement('android=new UiSelector().text("Image Upload")',
            "Tap on Image Upload option");

        await clickElement('android=new UiSelector().description("Photo Library")',
            "Select Photo Library");

        await clickElement('android=new UiSelector().className("android.view.View").instance(14)',
            "Select image from library");

        await clickElement('android=new UiSelector().className("android.widget.Button").instance(6)',
            "Tap on Done button");

        // Save button (using pointer function)
        try {
            await saveButtonClick();
            pass("Tap Save button using pointer logic");
        } catch (e) {
            fail("Tap Save button using pointer logic");
        }

        await driver.pause(4000);
        pass("Wait after saving image");

    });



    // ======================================================
    // CASE 3 — Add Fabric + Full Details + Verification + Delete
    // ======================================================

    it("CASE 3 — Add Fabric with all details and verify in detail page", async () => {

        // ➤ Open Add Fabric screen
        await clickElement('android=new UiSelector().text("󰐕")',
            "Tap on Plus (+) icon");

        await clickElement('android=new UiSelector().text("Add Fabric")',
            "Tap on Add Fabric field");

        await clickElement('android=new UiSelector().text("Image Upload")',
            "Tap on Image Upload option");

        await clickElement('android=new UiSelector().description("Photo Library")',
            "Select Photo Library");

        await clickElement('android=new UiSelector().className("android.view.View").instance(14)',
            "Select image from library");

        await clickElement('android=new UiSelector().className("android.widget.Button").instance(6)',
            "Tap on Done button");

        // ➤ Enter Fabric Type (Content & Weave)
        await clickElement('android=new UiSelector().text("Type or select content (e.g., Cotton)")',
            "Tap Fabric Type field");

        try {
            await $('android=new UiSelector().text("Type or select content (e.g., Cotton)")').setValue("add by test auto");
            pass("Enter fabric content (add by test auto)");
        } catch {
            fail("Enter fabric content (add by test auto)");
        }
        await driver.pause (2000);
        await clickElement('android=new UiSelector().className("android.widget.TextView").instance(9)',
            "Select green dropdown fabric type value");

        // ➤ Add Length and Width
        try {
            await $('android=new UiSelector().className("android.widget.EditText").instance(1)').setValue("15");
            pass("Enter Length (15)");
        } catch {
            fail("Enter Length (15)");
        }

        try {
            await $('android=new UiSelector().className("android.widget.EditText").instance(2)').setValue("15");
            pass("Enter Width (15)");
        } catch {
            fail("Enter Width (15)");
        }

        // ➤ Arrow button click (close keyboard)
        await clickElement('android=new UiSelector().text("󰅀")');

        // ➤ Swipe Up
        try {
            await swipeUp();
            pass("Swipe up to reveal more fields");
        } catch {
            fail("Swipe up to reveal more fields");
        }

        // ➤ Fabric Name
        await clickElement('android=new UiSelector().text("e.g., Floral, White Cotton, Blue Denim")',
            "Tap on Fabric Name field");

        try {
            await $('android=new UiSelector().text("e.g., Floral, White Cotton, Blue Denim")').setValue("Test automation fabr");
            pass("Enter Fabric Name (Test automation fabr)");
        } catch {
            fail("Enter Fabric Name");
        }

        // ➤ Usage (What you are making)
        await clickElement('android=new UiSelector().text("Type or select (e.g., Dress, Blazer)")',
            "Tap on What You Are Making field");

        try {
            await $('android=new UiSelector().text("Type or select (e.g., Dress, Blazer)")').setValue("Test automation");
            pass("Enter Usage (Test automation)");
        } catch {
            fail("Enter Usage (Test automation)");
        }

        await clickElement('android=new UiSelector().className("android.widget.TextView").instance(19)',
            "Select green dropdown usage value");

        // ➤ Save Button
        try {
            await saveButtonClick();
            pass("Tap Save button using pointer logic");
        } catch {
            fail("Tap Save button using pointer logic");
        }

        await driver.pause(4000);
        await driver.pause(4000);
        // ➤ Select first record
        await $('android=new UiSelector().text("Test automation fabr").instance(0)').click();

        // ➤ Verify detail page fields
        await verifyElement('android=new UiSelector().text("Test automation fabr")',
            "Verify Fabric Name is displayed");

        await verifyElement('android=new UiSelector().text("15yd")',
            "Verify Length (15yd)");

        await verifyElement('android=new UiSelector().text("15in")',
            "Verify Width (15in)");

        // await verifyElement('android=new UiSelector().text("add by test auto")',
        //     "Verify Fabric Content & Weave text");

        // await verifyElement('android=new UiSelector().text("Test automation")',
        //     "Verify Usage text");

        // ➤ Delete Fabric
        await clickElement('android=new UiSelector().resourceId("icon-button-container").instance(2)',
            "Tap more options");

        await clickElement('android=new UiSelector().text("Delete")',
            "Tap Delete option");

        await clickElement('android=new UiSelector().resourceId("android:id/button1")',
            "Confirm delete");
        await driver.pause (5000);
        await verifyElement('android=new UiSelector().text("All Fabrics")',
            "Verify 'All Fabrics' text after deletion");
    });

});
