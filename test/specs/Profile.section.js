// ----------------------------
// SUMMARY LOGGER
// ----------------------------
let steps = [];

function pass(step) {
    console.log(`✓ ${step}`);
    steps.push({ step, status: "PASS" });
}

function fail(step) {
    console.log(`✗ ${step}`);
    steps.push({ step, status: "FAIL" });
}

function printSummary(caseName) {
    console.log(`\n========= SUMMARY (${caseName}) =========`);
    steps.forEach(s => console.log(`${s.status === "PASS" ? "✓" : "✗"} ${s.step}`));
    console.log("========================================\n");
    steps = []; // Reset for next case
}

// ------------------------------------------------------
// POINTER FUNCTIONS (same as your code)
// ------------------------------------------------------
async function clickProfilePointer() {
    console.log("🔵 Trying to click Profile using pointer logic...");

    const points = [
        { x: 108, y: 265.8 },
        { x: 122, y: 248 },
        { x: 108, y: 303 },
        { x: 84,  y: 265.8 }
    ];

    try {
        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: points[0].x, y: points[0].y },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        pass("Clicked profile with pointer logic");
    } catch (e) {
        fail("Failed to click profile");
    }
}

async function clickMenuPointer() {
    console.log("🔵 Trying to click Menu button using pointer logic...");

    const points = [
        { x: 1172,   y: 220.8 },
        { x: 1198.9, y: 231 }
    ];

    try {
        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: points[0].x, y: points[0].y },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 80 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        pass("Clicked Menu with pointer logic");
    } catch (e) {
        fail("Failed to click Menu");
    }
}

// ------------------------------------------------------
// TEST CASES WITH SUMMARY LOGGING
// ------------------------------------------------------

describe("PROFILE TESTS", () => {


    // it("CASE 1 — Verify Profile page and all tabs", async () => {
    //     console.log("\n================ CASE 1 START ================\n");

    //     try {
    //         // STEP 1
    //         await clickProfilePointer();
    //         await driver.pause(2500);

    //         // STEP 2
    //         const userName = await $('android=new UiSelector().text("iopLive  @iop")');
    //         if (await userName.isDisplayed()) pass("User name is visible");
    //         else fail("User name is NOT visible");

    //         // STEP 3
    //         const stash = await $('android=new UiSelector().text("Stash")');
    //         if (await stash.isDisplayed()) pass("Stash is visible");
    //         else fail("Stash is NOT visible");

    //         // STEP 4
    //         const allTab = await $('android=new UiSelector().text("All")');
    //         if (await allTab.isDisplayed()) pass("All tab visible");
    //         else fail("All tab NOT visible");
    //         await allTab.click();
    //         pass("All tab clickable");

    //         // STEP 5
    //         const fabricTab = await $('android=new UiSelector().text("Fabrics")');
    //         if (await fabricTab.isDisplayed()) pass("Fabrics visible");
    //         else fail("Fabrics NOT visible");
    //         await fabricTab.click();
    //         pass("Fabrics clickable");

    //         // STEP 6
    //         const patterns = await $('android=new UiSelector().text("Patterns")');
    //         if (await patterns.isDisplayed()) pass("Patterns visible");
    //         else fail("Patterns NOT visible");
    //         await patterns.click();
    //         pass("Patterns clickable");

    //         // STEP 7
    //         const notions = await $('android=new UiSelector().text("Notions")');
    //         if (await notions.isDisplayed()) pass("Notions visible");
    //         else fail("Notions NOT visible");
    //         await notions.click();
    //         pass("Notions clickable");

    //         // STEP 8
    //         const reviews = await $('android=new UiSelector().text("Reviews").instance(1)');
    //         if (await reviews.isDisplayed()) pass("Reviews visible");
    //         else fail("Reviews NOT visible");
    //         await reviews.click();
    //         pass("Reviews clickable");

    //         // STEP 9
    //         await driver.back();
    //         await driver.pause(800);
    //         await driver.back();
    //         pass("Back navigation successful");

    //     } catch (e) {
    //         fail("CASE 1 encountered an exception");
    //         console.log(e);
    //     }

    //     printSummary("CASE 1");
    //     console.log("\n================ CASE 1 END ================\n");
    // });



    it("CASE 2 — Verify Profile Search functionality", async () => {
        console.log("\n================ CASE 2 START ================\n");
             await driver.pause(2000);
        try {
            // STEP 1
            await $('android=new UiSelector().className("android.widget.ImageView").instance(0)').click();
            pass("Clicked profile icon for search");
            await driver.pause(2000);

            // STEP 2
            const searchBox = await $('android=new UiSelector().text("Search for makers")');
            await searchBox.click();
            pass("Search field clicked");

            // STEP 3
            await searchBox.setValue("TOM");
            pass("Entered text: TOM");
            await driver.pause(1500);

            // Verify cross button
            const crossButton = await $('android=new UiSelector().className("android.widget.ImageView").instance(2)');
            if (await crossButton.isDisplayed()) pass("Cross button visible");
            else fail("Cross button NOT visible");

            // STEP 4
            const searchResultText = await $('android=new UiSelector().text("Search Result")');
            if (await searchResultText.isDisplayed()) pass("Search Result text visible");
            else fail("Search Result NOT visible");

            // STEP 5
            await driver.pause(2000);
            const tomResult = await $('android=new UiSelector().text("Tom")');
            if (await tomResult.isDisplayed()) pass("Search result matched: Tom");
            else fail("'Tom' not found in results");

            // STEP 6
            await driver.pause(2000);
            await $('android=new UiSelector().text("Tom")').click();
            await $('android=new UiSelector().text("Tom")').click();
            pass("Clicked on Tom from suggestions");
            await driver.pause(1500);

            const tomProfile = await $('android=new UiSelector().text("Tom  @tomyadav647")');
            if (await tomProfile.isDisplayed()) pass("Tom profile opened successfully");
            else fail("Tom profile NOT opened");

            // STEP 7
            await driver.back();
            pass("Back navigation successful");

        } catch (e) {
            fail("CASE 2 encountered an exception");
            console.log(e);
        }

        printSummary("CASE 2");
        console.log("\n================ CASE 2 END ================\n");
    });

it("CASE 3 — Verify invalid text search handling", async () => {
    console.log("\n================ CASE 3 START ================\n");

    try {
        // 1. Click search bar
        const searchBar = await $('android=new UiSelector().text("Search for makers")');
        await searchBar.click();
        pass("Clicked search bar");

        // Enter invalid text
        await searchBar.setValue("gdgfhdghdfghdfgh");
        pass("Entered invalid text");

        await driver.pause(1500);
        await driver.pause(2000);

        // 2. Verify "No maker found"
        const noMaker = await $('android=new UiSelector().text("No makers found. Try again or check spelling.")');
        if (await noMaker.isDisplayed()) pass("No maker found message visible");
        else fail("No record text not displaying when searching invalid entry");

        // 3. Clear search field
        const crossButton = await $('android=new UiSelector().className("android.widget.ImageView").instance(2)');
        if (await crossButton.isDisplayed()) {
            await crossButton.click();
            pass("Cleared search field");
        } else {
            fail("Cross button not visible to clear search field");
        }

    } catch (e) {
        fail("CASE 3 encountered exception");
        console.log(e);
    }

    printSummary("CASE 3");
    console.log("\n================ CASE 3 END ================\n");
});

it("CASE 4 — Verify Follow User functionality", async () => {
    console.log("\n================ CASE 4 START ================\n");

    try {
        // Step 1: search Tom
        const searchBox = await $('android=new UiSelector().text("Search for makers")');
        await searchBox.click();
        pass("Clicked search box");

        await searchBox.setValue("Tom");
        pass("Entered text: Tom");
        await driver.pause(2000);

        // Step 2: verify Tom appears
        let tomEntry = await $('android=new UiSelector().text("Tom")');
        if (await tomEntry.isDisplayed()) {
            pass("Tom is visible in results");
        } else {
            pass("Waiting for Tom to appear again...");
            await driver.pause(2000);
        }

        // Step 3: click Tom
        tomEntry = await $('android=new UiSelector().text("Tom")');
        await tomEntry.click();
         await tomEntry.click();
        pass("Clicked Tom entry");

        await driver.pause(1500);

        // Step 4: verify Follow button
        const followBtn = await $('android=new UiSelector().text("Follow ")');
        if (await followBtn.isDisplayed()) pass("Follow button visible");
        else fail("Follow button NOT visible");

        // Step 5: click Follow & verify Following
        await followBtn.click();
        pass("Clicked Follow");

        const followingBtn = await $('android=new UiSelector().text("Following ")');
        if (await followingBtn.isDisplayed()) pass("Following button visible");
        else fail("Following not displaying after clicking Follow");

        // Step 6: Back
        await driver.back();
        pass("Navigated back");

        // Step 7: repeat search
        await searchBox.click();
        await searchBox.setValue("Tom ");
        pass("Re-entered Tom");

        await driver.pause(2000);

        // Step 8: open Tom again
        tomEntry = await $('android=new UiSelector().text("Tom")');
        await tomEntry.click();
        pass("Opened Tom again");

        // Step 9: verify Following
        const followingCheck = await $('android=new UiSelector().text("Following ")');
        if (await followingCheck.isDisplayed()) {
            pass("Follow state persisted — Working correctly");
        } else {
            fail("Following process is not working correctly");
        }

    } catch (e) {
        fail("CASE 4 encountered exception");
        console.log(e);
    }

    printSummary("CASE 4");
    console.log("\n================ CASE 4 END ================\n");
});

it("CASE 5 — Edit user profile and verify updated name", async () => {
    console.log("\n================ CASE 5 START ================\n");

    try {

        // 1. Click Menu pointer
        await $('android=new UiSelector().resourceId("icon-button-container")').click();
        pass("Clicked Menu button");

        // 2. Click Edit profile details
        const editProfile = await $('android=new UiSelector().text("Edit profile details")');
        await editProfile.click();
        pass("Opened Edit profile details");

        // 3. Edit Name → test automation
        const editBtn = await $('android=new UiSelector().text("Edit").instance(0)');
        await editBtn.click();
        pass("Clicked Edit for name");

        const nameField = await $('android=new UiSelector().className("android.widget.EditText")');
        await nameField.clearValue();
        await nameField.setValue("test automation");
        pass("Entered name: test automation");

        const saveBtnInner = await $('android=new UiSelector().text("Save").instance(1)');
        await saveBtnInner.click();
        pass("Clicked inner Save button");

        await driver.pause(1500);

        const saveMainBtn = await $('android=new UiSelector().text("Save").instance(0)');
        await saveMainBtn.click();
        pass("Clicked main Save button");

        await driver.pause(2000);

        // 4. Verify updated name
        const updatedName = await $('android=new UiSelector().text("test automation   @iop")');
        if (await updatedName.isDisplayed()) pass("Updated name visible: test automation");
        else fail("Updated name NOT visible");

        // 5. Again edit the profile
        await clickMenuPointer();
        await editProfile.click();
        pass("Reopened Edit profile page");

        // 6. Verify Edit option visible
        if (await editBtn.isDisplayed()) pass("Edit button visible again");
        else fail("Edit button NOT visible");

        // 7. Click Edit again
        await editBtn.click();
        pass("Clicked Edit");

        // 8. Change name back to iopLive
        await nameField.click();
        await nameField.clearValue();
        await nameField.setValue("iopLive");
        pass("Updated name to iopLive");

        const saveBtnInner2 = await $('android=new UiSelector().text("Save").instance(1)');
        await saveBtnInner2.click();
        pass("Clicked inner Save button");

        await saveMainBtn.click();
        pass("Clicked main Save button");

        await driver.pause(1500);

        // 9. Verify final name restored
        const finalName = await $('android=new UiSelector().text("iopLive  @iop")');
        if (await finalName.isDisplayed()) {
            pass("Profile updated back to iopLive");
        } else {
            fail("Profile update failed");
        }

    } catch (e) {
        fail("CASE 5 encountered exception");
        console.log(e);
    }

    printSummary("CASE 5");
    console.log("\n================ CASE 5 END ================\n");
});

});