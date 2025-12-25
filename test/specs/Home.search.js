const { expect } = require('@wdio/globals');
const { swipeUp, saveButtonClick, uploadButtonClick } = require('../../helping.functions');

describe("CASE 1 — No Record Screens in Stash Tabs", () => {

    let results = [];

    function pass(step) {
        console.log(`✓ ${step}`);
        results.push({ step, status: "PASS" });
    }

    function fail(step) {
        console.log(`✗ ${step}`);
        results.push({ step, status: "FAIL" });
    }

    afterEach(() => {
        console.log("\n=== CASE 1 SUMMARY ===");
        results.forEach(r => {
            console.log(`${r.status === "PASS" ? "✓" : "✗"} ${r.step}`);
        });
        console.log("=======================\n");
    });

    it("Should verify no-record screens across All / Fabric / Patterns / Notions", async () => {

        console.log("🚀 Starting CASE 1 — Checking No Record Screens");

        // -------------------------------------------------------
        // STEP 1 → ALL TAB
        // -------------------------------------------------------
        try {
            console.log("Step 1.1: Clicking All tab");
            await $('android=new UiSelector().text("All")').click();
            pass("Clicked All tab");
        } catch (e) {
            fail("Failed to click All tab");
        }

        try {
            console.log("Step 1.2: Clicking Search your stash field");
            const searchBoxAll = await $('android=new UiSelector().text("Search your stash")');
            await searchBoxAll.click();
            await searchBoxAll.setValue("xxxxxxxxxxxxxxxxxxxxxxxxxxx123123");
            pass("Entered search text in All tab");
        } catch (e) {
            fail("Failed to enter search text in All tab");
        }

        console.log("Waiting 8 seconds for results...");
        await driver.pause(2000);

        try {
            const emptyMsg = await $('android=new UiSelector().text("Oh no! Your Stash is empty!")');
            const isDisplayed = await emptyMsg.isDisplayed();
            if (isDisplayed) pass("No record screen displayed in All tab");
            else fail("No record screen NOT displayed in All tab");
        } catch (e) {
            fail("No record screen NOT displayed in All tab");
        }

        // -------------------------------------------------------
        // STEP 2 → FABRIC TAB
        // -------------------------------------------------------
        try {
            console.log("Step 2.1: Clicking Fabric tab");
            await $('android=new UiSelector().text("Fabric")').click();
            pass("Clicked Fabric tab");
        } catch (e) {
            fail("Failed to click Fabric tab");
        }

        try {
            console.log("Step 2.2: Clearing search and adding text");
            const searchFabric = await $('android=new UiSelector().text("xxxxxxxxxxxxxxxxxxxxxxxxxxx123123")');
            await searchFabric.click();
            await searchFabric.clearValue();
            await driver.pause(2000);
            const searchBoxAll = await $('android=new UiSelector().text("Search your stash")');
            await searchBoxAll.click();
            await searchFabric.setValue("xxxxxxxxxxxxxxxxxxxxxxxxxxx123123");
            pass("Entered search text in Fabric tab");
        } catch (e) {
            fail("Failed to enter search in Fabric tab");
        }

        await driver.pause(4000);

        try {
            const emptyFabric = await $('android=new UiSelector().text("No fabric in your stash yet!")');
            if (await emptyFabric.isDisplayed()) pass("No record found in Fabric tab");
            else fail("No record screen NOT displayed in Fabric tab");
        } catch (e) {
            fail("No record screen NOT displayed in Fabric tab");
        }

        // -------------------------------------------------------
        // STEP 3 → PATTERNS TAB
        // -------------------------------------------------------
        try {
            console.log("Step 3.1: Clicking Patterns tab");
            await $('android=new UiSelector().text("Patterns")').click();
            pass("Clicked Patterns tab");
        } catch (e) {
            fail("Failed to click Patterns tab");
        }

        try {
            console.log("Step 3.2: Verifying No patterns added yet!");
            const emptyPattern = await $('android=new UiSelector().text("No patterns added yet!")');
            if (await emptyPattern.isDisplayed()) pass("No record found in Pattern tab");
            else fail("No record NOT showing in Patterns tab");
        } catch (e) {
            fail("No record NOT showing in Patterns tab");
        }

        // -------------------------------------------------------
        // STEP 4 → NOTIONS TAB
        // -------------------------------------------------------
        try {
            console.log("Step 4.1: Clicking Notions tab");
            await $('android=new UiSelector().text("Notions")').click();
            pass("Clicked Notions tab");
        } catch (e) {
            fail("Failed to click Notions tab");
        }

        try {
            console.log("Step 4.2: Verifying No notions here yet!");
            const emptyNotions = await $('android=new UiSelector().text("No notions here yet!")');
            if (await emptyNotions.isDisplayed()) pass("No record found in Notions tab");
            else fail("No record NOT showing in Notions tab");
        } catch (e) {
            fail("No record NOT showing in Notions tab");
        }

        // -------------------------------------------------------
        // STEP 4.3 → CLEAR SEARCH FIELD
        // -------------------------------------------------------
        try {
            console.log("Step 4.3: Clearing search field");
            const searchClear = await $('android=new UiSelector().text("xxxxxxxxxxxxxxxxxxxxxxxxxxx123123")');
            await searchClear.click();
            await searchClear.clearValue();
            pass("Cleared search field");
        } catch (e) {
            fail("Failed to clear search field");
        }

        // -------------------------------------------------------
        // FINAL CASE RESULT CHECK (FAIL TEST IF ANY STEP FAILS)
        // -------------------------------------------------------
        const anyFail = results.some(r => r.status === "FAIL");

        if (anyFail) {
            console.log("\x1b[31m❌ Some steps failed in CASE 1. Please check summary above.\x1b[0m");
            throw new Error("Some steps failed in CASE 1. Check console logs for details");
        } else {
            console.log("\x1b[32m✅ All steps passed successfully in CASE 1!\x1b[0m");
        }

        console.log("🎉 CASE 1 COMPLETED");
    });
});

describe("CASE 2 — Verify the search accuracy of all tabs", () => {

    let results = [];

    function pass(step) {
        console.log(`✓ ${step}`);
        results.push({ step, status: "PASS" });
    }

    function fail(step) {
        console.log(`✗ ${step}`);
        results.push({ step, status: "FAIL" });
    }

    afterEach(() => {
        console.log("\n=== CASE 2 SUMMARY ===");
        results.forEach(r => {
            console.log(`${r.status === "PASS" ? "✓" : "✗"} ${r.step}`);
        });
        console.log("=======================\n");
    });

    it("Should verify search accuracy across Fabric, Pattern, and Notion", async () => {

        console.log("🚀 Starting CASE 2 — Search Accuracy Test");

        // -------------------------------------------------------
        // STEP 1: Search Fabric with fabric name
        // -------------------------------------------------------
        try {
            console.log("Step 1.1: Clicking All tab");
            await $('android=new UiSelector().text("All")').click();
            pass("Clicked All tab");
        } catch (e) { fail("Failed to click All tab"); }

        try {
            console.log("Step 1.2: Clicking Search your stash field");
            const searchBox = await $('android=new UiSelector().text("Search your stash")');
            await searchBox.click();
            await searchBox.setValue("test 34");
            pass("Entered 'test 34' in search");
        } catch (e) { fail("Failed to enter 'test 34' in search"); }

        try {
            const fabricRecord = await $('android=new UiSelector().text("Test 34")');
            if (await fabricRecord.isDisplayed()) pass("'Test 34' is displayed");
            else fail("'Test 34' is NOT displayed");
        } catch (e) { fail("'Test 34' is NOT displayed"); }

        // -------------------------------------------------------
        // STEP 2: Search Fabric with fabric tag
        // -------------------------------------------------------
       try {
    console.log("Step 2.1: Clicking search field to enter tag");
    const searchField = await $('android=new UiSelector().text("test 34")');
    await searchField.click();
    await searchField.clearValue();
    const searchBox = await $('android=new UiSelector().text("Search your stash")');
     await searchBox.click();  
    await searchBox.setValue("12"); // set new value
    pass("Entered '12' in search");
}catch (e) { fail("Failed to enter '12' in search"); }

        try {
            const fabricTag = await $('android=new UiSelector().text("fabric12")');
            if (await fabricTag.isDisplayed()) pass("'fabric12' tag is displayed");
            else fail("'fabric12' tag is NOT displayed");
        } catch (e) { fail("'fabric12' tag is NOT displayed"); }

        // -------------------------------------------------------
        // STEP 3: Search Pattern with pattern tag
        // -------------------------------------------------------
        try {
            console.log("Step 3.1: Clicking search field to enter pattern tag");
            const searchField = await $('android=new UiSelector().text("12")');
            await searchField.click();
            await searchField.clearValue();
             const searchBox = await $('android=new UiSelector().text("Search your stash")');
             await searchBox.click();  
            await searchBox.setValue("test tag");
            pass("Entered 'test tag' in search");
        } catch (e) { fail("Failed to enter 'test tag' in search"); }

        try {
            const patternTag = await $('android=new UiSelector().text("Pat 567")');
            if (await patternTag.isDisplayed()) pass("'Pat 567' pattern is displayed");
            else fail("'Pat 567' pattern is NOT displayed");
        } catch (e) { fail("'Pat 567' pattern is NOT displayed"); }

        // -------------------------------------------------------
        // STEP 4: Search Pattern with pattern name
        // -------------------------------------------------------
        try {
            console.log("Step 4.1: Clicking search field to enter pattern name");
            const searchField = await $('android=new UiSelector().text("test tag")');
            await searchField.click();
            await searchField.clearValue();
            const searchBox = await $('android=new UiSelector().text("Search your stash")');
            await searchBox.setValue("pat");
            pass("Entered 'pat' in search");
        } catch (e) { fail("Failed to enter 'pat' in search"); }

        try {
            const patternName = await $('android=new UiSelector().text("Pat 567")');
            const patternTag = await $('android=new UiSelector().text("Test tag")');
            if (await patternName.isDisplayed() && await patternTag.isDisplayed()) pass("'Pat 567' and 'Test tag' are displayed");
            else fail("'Pat 567' and 'Test tag' are NOT displayed");
        } catch (e) { fail("'Pat 567' and 'Test tag' are NOT displayed"); }

        // -------------------------------------------------------
        // STEP 5: Search Notion with notion name
        // -------------------------------------------------------
        try {
            console.log("Step 5.1: Clicking search field to enter notion name");
            const searchField = await $('android=new UiSelector().text("pat")');
            await searchField.click();
             await searchField.clearValue();
            const searchBox = await $('android=new UiSelector().text("Search your stash")');
            await searchBox.setValue("not 687");
            pass("Entered 'not 687' in search");
        } catch (e) { fail("Failed to enter 'not 687' in search"); }

        try {
            const notion1 = await $('android=new UiSelector().text("ntop")');
            const notion2 = await $('android=new UiSelector().text("Not 687")');
            if (await notion1.isDisplayed() && await notion2.isDisplayed()) pass("'ntop' and 'Not 687' are displayed");
            else fail("'ntop' and 'Not 687' are NOT displayed");
        } catch (e) { fail("'ntop' and 'Not 687' are NOT displayed"); }

        // -------------------------------------------------------
        // STEP 6: Search Notion with notion tag
        // -------------------------------------------------------
        try {
            console.log("Step 6.1: Clicking search field to enter notion tag");
            const searchField = await $('android=new UiSelector().text("not 687")');
            await searchField.click();
             await searchField.clearValue();
            const searchBox = await $('android=new UiSelector().text("Search your stash")');
            await searchBox.setValue("ntop");
            pass("Entered 'ntop' in search");
        } catch (e) { fail("Failed to enter 'ntop' in search"); }

        try {
            const notion1 = await $('android=new UiSelector().text("ntop")');
            const notion2 = await $('android=new UiSelector().text("Not 687")');
            if (await notion1.isDisplayed() && await notion2.isDisplayed()) pass("'ntop' and 'Not 687' are displayed");
            else fail("'ntop' and 'Not 687' are NOT displayed");
        } catch (e) { fail("'ntop' and 'Not 687' are NOT displayed"); }

        try {
            const clearField = await $('android=new UiSelector().text("ntop")');
            await clearField.click();
            await clearField.clearValue();
            pass("Cleared search field at end");
        } catch (e) { fail("Failed to clear search field"); }

        // -------------------------------------------------------
        // FINAL RESULT CHECK
        // -------------------------------------------------------
        const anyFail = results.some(r => r.status === "FAIL");

        if (anyFail) {
            console.log("\x1b[31m❌ Some steps failed in CASE 2. Please check summary above.\x1b[0m");
            throw new Error("Some steps failed in CASE 2. Check console logs for details");
        } else {
            console.log("\x1b[32m✅ All steps passed successfully in CASE 2!\x1b[0m");
        }

        console.log("🎉 CASE 2 COMPLETED");
    });
});


// =======================
// CASE 3 — Fabric Search (Name + Tag)
// =======================

describe("CASE 3 — Verify Fabric tab search by name and tag", () => {

    let steps = [];

    function pass(step) {
        console.log(`✓ ${step}`);
        steps.push({ step, status: "PASS" });
    }

    function fail(step) {
        console.log(`✗ ${step}`);
        steps.push({ step, status: "FAIL" });
    }

    afterEach(() => {
        console.log("\n=== CASE 3 SUMMARY ===");
        steps.forEach(s => {
            console.log(`${s.status === "PASS" ? "✓" : "✗"} ${s.step}`);
        });
        console.log("=======================\n");

        const hasFail = steps.some(s => s.status === "FAIL");
        if (hasFail) {
            console.log("❌ Some steps failed in CASE 3. Please check summary above.");
        } else {
            console.log("✅ All steps passed in CASE 3.");
        }
    });

    it("Should verify Fabric tab search using Fabric name and Fabric tag", async () => {

        console.log("\n🚀 Starting CASE 3 — Fabric tab search by name and tag");

        // ------------------------------------------
        // STEP 1 — SEARCH FABRIC BY NAME
        // ------------------------------------------

        try {
            console.log("Step 1.1: Clicking Fabric tab");
            const fabricTab = await $('android=new UiSelector().text("Fabric")');
            await fabricTab.click();
            pass("Clicked Fabric tab");
        } catch (e) {
            fail("Failed to click Fabric tab");
        }

        try {
            console.log("Step 1.2: Clicking search field 'Search your stash'");
            const searchField = await $('android=new UiSelector().text("Search your stash")');
            await searchField.click();
            pass("Clicked search field");
        } catch (e) {
            fail("Failed to click search field");
        }

        try {
            console.log("Step 1.3: Entering fabric name: test 34");
            const inputField = await $('android=new UiSelector().text("Search your stash")');
            await inputField.setValue("test 34");
            pass("Entered 'test 34' in search field");
        } catch (e) {
            fail("Failed to enter 'test 34' in search");
        }

        try {
            console.log("Step 1.4: Verifying fabric result: Test 34");
            const result = await $('android=new UiSelector().text("Test 34")');
            const display = await result.isDisplayed();
            if (display) {
                pass("Fabric name result 'Test 34' displayed");
            } else {
                fail("Fabric name result 'Test 34' NOT displayed");
            }
        } catch (e) {
            fail("Fabric name result 'Test 34' NOT displayed");
        }


        // ------------------------------------------
        // STEP 2 — SEARCH FABRIC BY TAG
        // ------------------------------------------

        try {
            console.log("Step 2.1: Clearing field & entering fabric tag '12'");
            const searchField = await $('android=new UiSelector().text("test 34")');
            await searchField.click();
            await searchField.clearValue();
            const searchBox = await $('android=new UiSelector().text("Search your stash")');
            await searchBox.setValue("12");  // corrected logic
            pass("Entered '12' in search field");
        } catch (e) {
            fail("Failed to enter '12' in search");
        }

        try {
            console.log("Step 2.2: Verifying tag result: fabric12");
            const tagResult = await $('android=new UiSelector().text("fabric12")');
            const isShown = await tagResult.isDisplayed();
            if (isShown) {
                pass("Fabric tag result 'fabric12' displayed");
            } else {
                fail("Fabric tag result 'fabric12' NOT displayed");
            }
        } catch (e) {
            fail("Fabric tag result 'fabric12' NOT displayed");
        }

        console.log("🎉 CASE 3 COMPLETED\n");
    });
});

describe("CASE 4 — Verify pattern search by tag and name", () => {

    let steps = [];

    function pass(step) {
        console.log(`✓ ${step}`);
        steps.push({ step, status: "PASS" });
    }

    function fail(step) {
        console.log(`✗ ${step}`);
        steps.push({ step, status: "FAIL" });
    }

    afterEach(() => {
        console.log("\n=== CASE 4 SUMMARY ===");
        steps.forEach(s => {
            console.log(`${s.status === "PASS" ? "✓" : "✗"} ${s.step}`);
        });
        console.log("=======================\n");

        const hasFail = steps.some(s => s.status === "FAIL");
        if (hasFail) {
            console.log("❌ Some steps failed in CASE 4. Please check summary above.");
        } else {
            console.log("✅ All steps passed in CASE 4.");
        }
    });

    it("Should verify pattern search using tag and name", async () => {

        console.log("\n🚀 Starting CASE 4 — Pattern tab search by tag & name");

        // ---------------------------------------------------
        // STEP 1 — SEARCH PATTERN USING TAG (12 → test tag)
        // ---------------------------------------------------

        try {
            console.log("Step 1.1: Clicking Patterns tab");
            const patternsTab = await $('android=new UiSelector().text("Patterns")');
            await patternsTab.click();
            pass("Clicked Patterns tab");
        } catch (e) {
            fail("Failed to click Patterns tab");
        }

        try {
            console.log("Step 1.2: Clicking on text '12' to modify search");
            const tagField = await $('android=new UiSelector().text("12")');
            await tagField.click();
            await tagField.clearValue();
            const searchBox = await $('android=new UiSelector().text("Search your stash")');
            await searchBox.setValue("test tag");
            pass("Entered 'test tag' in search");
        } catch (e) {
            fail("Failed to enter 'test tag' in search");
        }

        try {
            console.log("Step 1.3: Verifying pattern result 'Pat 567'");
            const patternItem = await $('android=new UiSelector().text("Pat 567")');
            const visible = await patternItem.isDisplayed();
            if (visible) {
                pass("Pattern 'Pat 567' displayed");
            } else {
                fail("Pattern 'Pat 567' NOT displayed");
            }
        } catch (e) {
            fail("Pattern 'Pat 567' NOT displayed");
        }


        // ---------------------------------------------------
        // STEP 2 — SEARCH PATTERN USING NAME (test tag → pat)
        // ---------------------------------------------------

        try {
            console.log("Step 2.1: Clicking search field 'test tag' to modify");
            const searchField = await $('android=new UiSelector().text("test tag")');
            await searchField.click();
            await searchField.clearValue();
            const searchBox = await $('android=new UiSelector().text("Search your stash")');
            await searchBox.setValue("pat");
            pass("Entered 'pat' in search");
        } catch (e) {
            fail("Failed to enter 'pat' in search");
        }

        try {
            console.log("Step 2.2: Verifying pattern results: Pat 567 & Test tag");
            const res1 = await $('android=new UiSelector().text("Pat 567")');
            const res2 = await $('android=new UiSelector().text("Test tag")');

            const visible1 = await res1.isDisplayed();
            const visible2 = await res2.isDisplayed();

            if (visible1 && visible2) {
                pass("Both 'Pat 567' and 'Test tag' displayed");
            } else {
                fail("One or both pattern results NOT displayed");
            }

        } catch (e) {
            fail("Pattern results NOT displayed for search 'pat'");
        }

        console.log("🎉 CASE 4 COMPLETED\n");

    });
});
