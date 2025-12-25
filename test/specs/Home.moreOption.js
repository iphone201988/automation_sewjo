const { expect, driver } = require("@wdio/globals");

describe("📌 STASH — MORE OPTION TEST CASES", () => {

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

    after(() => {
        console.log("\n======= 📌 STASH — MORE MENU SUMMARY =======");
        steps.forEach((s) => console.log(`${s.status === "PASS" ? "✓" : "✗"} ${s.step}`));
        console.log("=============================================\n");
    });

    // -----------------------------------------------------
    // 🔵 CASE 1 — DELETE BUTTON FUNCTIONALITY
    // -----------------------------------------------------

    it("CASE 1 — Verify Delete Button Functionality", async () => {

        await clickElement(
            'android=new UiSelector().text("All")',
            "Click on All tab"
        );

        await clickElement(
            'android=new UiSelector().className("android.widget.ImageView").instance(6)',
            "Click on More option"
        );

        await verifyElement(
            'android=new UiSelector().text("Delete")',
            "Verify More menu text is visible"
        );

        await clickElement(
            'android=new UiSelector().text("Delete")',
            "Click Delete button (first)"
        );

        await verifyElement(
            'android=new UiSelector().resourceId("android:id/alertTitle")',
            "Verify alert dialog is visible"
        );

        await clickElement(
            'android=new UiSelector().resourceId("android:id/button2")',
            "Click Cancel button in alert"
        );

        await clickElement(
            'android=new UiSelector().className("android.widget.ImageView").instance(6)',
            "Click More option again"
        );

        await clickElement(
            'android=new UiSelector().text("Delete")',
            "Click Delete button again"
        );

        await clickElement(
            'android=new UiSelector().resourceId("android:id/button1")',
            "Click final Confirm Delete button"
        );
    });


    // -----------------------------------------------------
    // 🔵 CASE 2 — DUPLICATE BUTTON FUNCTIONALITY
    // -----------------------------------------------------

    it("CASE 2 — Verify Duplicate Button Functionality", async () => {

         await driver.pause(3000);
        await clickElement(
            'android=new UiSelector().text("All")',
            "Click on All tab"
        );
await driver.pause(2000);
        await clickElement(
            'android=new UiSelector().className("android.widget.ImageView").instance(6)',
            "Click on More option"
        );

        await verifyElement(
            'android=new UiSelector().text("Duplicate")',
            "Verify More menu text is visible"
        );

        await clickElement(
            'android=new UiSelector().text("Duplicate")',
            "Click Duplicate button"
        );
    });


    // -----------------------------------------------------
    // 🔵 CASE 3 — REPORT A PROBLEM FUNCTIONALITY
    // -----------------------------------------------------

    it("CASE 3 — Verify Report A Problem Functionality", async () => {

        await clickElement(
            'android=new UiSelector().text("All")',
            "Click on All tab"
        );

        await clickElement(
            'android=new UiSelector().className("android.widget.ImageView").instance(6)',
            "Click on More option"
        );

        await verifyElement(
            'android=new UiSelector().text("Report a problem")',
            "Verify More menu is visible"
        );

        await clickElement(
            'android=new UiSelector().text("Report a problem")',
            "Click on Report a problem"
        );

        await clickElement(
            'android=new UiSelector().className("android.view.ViewGroup").instance(10)',
            "Select ‘Something Went Wrong’ option"
        );
          await driver.pause(2000);

        await clickElement(
            'android=new UiSelector().className("android.widget.CheckBox").instance(3)',
            "Select ‘Other’ checkbox"
        );

        try {
            const tf = await $('android=new UiSelector().text("Describe the issue. Be as detailed as possible!")');
            await tf.click();
            await tf.setValue("the test entered has been added");
            pass("Enter issue description text");
        } catch (e) {
            fail("Enter issue description text");
        }

        await verifyElement(
            'android=new UiSelector().text("Send FeedBack")',
            "Verify Send Feedback button is visible"
        );

        await clickElement(
            'android=new UiSelector().text("Send FeedBack")',
            "Click Send Feedback button"
        );

        await verifyElement(
            'android=new UiSelector().text("All")',
            "Verify user returns to All tab"
        );
    });

});
