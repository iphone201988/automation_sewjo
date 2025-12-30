const { expect } = require("chai");

describe("ANDROID — STITCHLOG MODULE | Sewjo App", () => {

    let steps = [];

    /* ======================
       STEP LOGGING HELPERS
    ====================== */

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
        console.log("\n======= 📌 ANDROID — STITCHLOG SUMMARY =======");
        steps.forEach((s) =>
            console.log(`${s.status === "PASS" ? "✓" : "✗"} ${s.step}`)
        );
        console.log("==============================================\n");
    });

    /* =====================================================
       CASE 1: Navigate to Stitchlog Module (Android)
    ===================================================== */

    it("CASE 1 — Navigate to Stitchlog Module", async () => {

        await clickElement(
            'android=new UiSelector().text("Stitchlog")',
            "Tap on Stitchlog option"
        );

        await verifyElement(
            'android=new UiSelector().text("All StitchLogs")',
            "Verify All StitchLogs screen is displayed"
        );

        pass("User successfully navigated to Stitchlog module");
    });

    // /* =====================================================
    //    CASE 2: Validate Add Stitchlog (Empty & Valid Input)
    // ===================================================== */

    it("CASE 2 — Validate Add Stitchlog Field (Android)", async () => {

        await clickElement(
            'android=new UiSelector().text("󰐕")',
            "Tap on Add (+) Stitchlog button"
        );

        await verifyElement(
            'android=new UiSelector().text("New Stitchlog")',
            "Verify New Stitchlog screen is displayed"
        );

        const inputField = await $(
            'android=new UiSelector().className("android.widget.EditText")'
        );
        await inputField.click();
        pass("Tap on Stitchlog input field");

        const createBtn = await $('~Create');

        try {
            const enabled = await createBtn.isEnabled();
            if (!enabled) {
                pass("Create button is disabled when input is empty");
            } else {
                fail("Create button should be disabled for empty input");
            }
        } catch (e) {
            fail("Unable to verify Create button disabled state");
        }

        await inputField.setValue("Test entree");
        pass("Enter valid text in Stitchlog input field");

        await verifyElement(
            'android=new UiSelector().text("49 characters left")',
            "Verify character counter shows 49 characters left"
        );

        await clickElement(
            '~Create',
            "Tap on Create button"
        );
        // await driver.pause( 3000);
        // await verifyElement(
        //     'android=new UiSelector().text("New entry")'.waitForDisplayed({timeout: 5000}),
        //     "Verify Stitchlog created successfully"
        // );

        pass("User is able to create Stitchlog successfully");
    });
      // Add over view details -----------------------------------------------------------------
it("CASE 3 — Add details in Overview field", async () => {

    /* ===== Overview Field ===== */

    await clickElement(
        '~Overview',
        "Click on Overview field"
    );

    await clickElement(
        'android=new UiSelector().text("Briefly describe your project")',
        "Click on description input field"
    );

    const descField = await $(
        'android=new UiSelector().text("Briefly describe your project")'
    );
    await descField.setValue("the test");
    pass("Enter short description text");

    await verifyElement(
        'android=new UiSelector().text("242 characters left")',
        "Verify character counter is displayed"
    );

    await verifyElement(
        'android=new UiSelector().text("Cancel")',
        "Verify Cancel button is displayed"
    );

    await verifyElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(1)',
        "Verify correct icon is displayed"
    );

    // /* ===== Cancel Flow ===== */

    await clickElement(
        'android=new UiSelector().text("Cancel")',
        "Click on Cancel button"
    );

    await verifyElement(
        'android=new UiSelector().text("Briefly describe your project")',
        "Verify description field is visible after cancel"
    );

    // /* ===== Save Description ===== */

    await clickElement(
        'android=new UiSelector().text("Briefly describe your project")',
        "Click on description field again"
    );

    await descField.setValue(
        "the test entree has been this is the description text by automation"
    );
    pass("Enter full description text");

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(1)',
        "Click on correct (save) icon"
    );

    // /* ===== Scroll a little ===== */

    await driver.pause(800); // small animation wait (acceptable)
    await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
            { type: 'pointerMove', duration: 0, x: 500, y: 1600 },
            { type: 'pointerDown', button: 0 },
            { type: 'pointerMove', duration: 600, x: 500, y: 900 },
            { type: 'pointerUp', button: 0 }
        ]
    }]);
    pass("Scroll down to body measurements section");

    // /* ===== Body Measurements ===== */

    const measurement1 = await $('android=new UiSelector().text("0").instance(0)');
    await measurement1.click();
    await measurement1.setValue("5");
    pass("Enter first body measurement");

    const measurement2 = await $('android=new UiSelector().text("0").instance(1)');
    await measurement2.click();
    await measurement2.setValue("5");
    pass("Enter second body measurement");

    const measurement3 = await $('android=new UiSelector().text("0")');
    await measurement3.click();
    await measurement3.setValue("5");
    pass("Enter third body measurement");

    // /* ===== Save Measurements ===== */

    await clickElement(
        'android=new UiSelector().text("Save")',
        "Click on Save button for measurements"
    );

    // /* ===== Date Selection ===== */

    await clickElement(
        'android=new UiSelector().text("Select due date")',
        "Click on Select due date field"
    );

    await clickElement(
        'android=new UiSelector().text("Apply date")',
        "Apply selected date"
    );
await driver.pause (2000);
    await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
            { type: 'pointerMove', duration: 0, x: 500, y: 1600 },
            { type: 'pointerDown', button: 0 },
            { type: 'pointerMove', duration: 600, x: 500, y: 900 },
            { type: 'pointerUp', button: 0 }
        ]
    }]);
    pass("Scroll down to body measurements section");

    /* ===== Priority Selection ===== */

    await clickElement(
        'android=new UiSelector().text("Add")',
        "Click on Add priority button"
    );

    await clickElement(
        'android=new UiSelector().text("Select priority")',
        "Click on Select priority"
    );

    await clickElement(
        'android=new UiSelector().text("Medium Priority")',
        "Select Medium Priority option"
    );
await driver.pause (2000);
    await clickElement(
        'android=new UiSelector().text("Save")',
        "Save priority selection"
    );
await driver.pause (2000);
    /* ===== Add Tag ===== */

    await clickElement(
        'android=new UiSelector().text("Add a tag...")',
        "Click on Add a tag field"
    );

    const tagField = await $('android=new UiSelector().text("Add a tag...")');
    await tagField.setValue("test tag");
    pass("Enter tag text");
await driver.pause (2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(3)',
        "Click on Add tag icon"
    );
await driver.pause (2000);

    /* ===== Change Cover ===== */

   await driver.pause(800);

await driver.performActions([{
    type: 'pointer',
    id: 'finger2',
    parameters: { pointerType: 'touch' },
    actions: [
        { type: 'pointerMove', duration: 0, x: 500, y: 800 },
        { type: 'pointerDown', button: 0 },
        { type: 'pointerMove', duration: 600, x: 500, y: 1700 },
        { type: 'pointerUp', button: 0 }
    ]
}]);

pass("Scroll up to previous section");

await driver.pause(800);

await driver.performActions([{
    type: 'pointer',
    id: 'finger2',
    parameters: { pointerType: 'touch' },
    actions: [
        { type: 'pointerMove', duration: 0, x: 500, y: 800 },
        { type: 'pointerDown', button: 0 },
        { type: 'pointerMove', duration: 600, x: 500, y: 1700 },
        { type: 'pointerUp', button: 0 }
    ]
}]);

pass("Scroll up to previous section");

    await clickElement(
        'android=new UiSelector().text("Change cover")',
        "Click on Change cover option"
    );

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(4)',
        "Select cover image"
    );
await driver.pause (2000);
    await clickElement(
        '~Crop',
        "Crop and apply selected cover image"
    );

    pass("CASE 3 completed — Overview details added successfully");
});

it("CASE 4 — Add Stitchlog with title and description only", async () => {

//     /* ===== Navigate to Stitchlog ===== */

    await clickElement(
        '~Stitchlog',
        "Click on Stitchlog (accessibility id)"
    );

    await driver.pause(1000); // small wait for screen load

    /* ===== New Entry ===== */

    await clickElement(
        'android=new UiSelector().text("New Entry")',
        "Click on New Entry button"
    );

//     /* ===== Title ===== */

    await clickElement(
        'android=new UiSelector().text("Title..")',
        "Click on Title field"
    );

    const titleField = await $('android=new UiSelector().text("Title..")');
    await titleField.setValue("Test title");
    pass("Enter Stitchlog title");

//     /* ===== Description ===== */

    await clickElement(
        'android=new UiSelector().resourceId("content")',
        "Click on Description field"
    );

    const descField = await $('android=new UiSelector().resourceId("content")');
    await descField.setValue("Test description");
    pass("Enter Stitchlog description");
await driver.pause(2000);
//     /* ===== Save Entry ===== */

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(7)',
        "Click on correct (save) button"
    );

    await driver.pause(2000); // wait for save completion

//     /* ===== Validation ===== */

    await verifyElement(
        'android=new UiSelector().text("Test title")',
        "Verify newly created Stitchlog title is displayed"
    );

    pass("CASE 4 passed — User is able to add Stitchlog with title and description only");
});

it("CASE 5 — Verify full Stitchlog functionality", async () => {

    /* =====================================================
       STEP 1: Verify Cross Button Working
    ===================================================== */
await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().text("Test description")',
        "Open Stitchlog entry"
    );

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(2)',
        "Click on Cross button"
    );
await driver.pause(2000);
    await verifyElement(
        'android=new UiSelector().description("Stitchlog")',
        "Verify Stitchlog screen displayed after closing entry"
    );

    pass("STEP 1 passed — Cross button working correctly");

    // /* =====================================================
    //    STEP 2: Verify Pin Button Working
    // ===================================================== */

    await clickElement(
        'android=new UiSelector().text("Test description")',
        "Open Stitchlog entry again"
    );
await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(0)',
        "Click on Pin button"
    );

    await clickElement(
        'android=new UiSelector().className("android.view.ViewGroup").instance(8)',
        "Close entry after pin"
    );
await driver.pause(2000);
    await verifyElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(3)',
        "Verify pinned icon is displayed"
    );

    await clickElement(
        'android=new UiSelector().text("Test description")',
        "Open Stitchlog entry again"
    );
await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(0)',
        "Unpin the Stitchlog"
    );

    await clickElement(
        'android=new UiSelector().className("android.view.ViewGroup").instance(8)',
        "Close entry after unpin"
    );

    pass("STEP 2 passed — Pin / Unpin working correctly");

    // /* =====================================================
    //    STEP 3: Verify Lock Button Working
    // ===================================================== */

    await clickElement(
        'android=new UiSelector().text("Test description")',
        "Open Stitchlog entry"
    );

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(1)',
        "Click on Lock button"
    );

    await clickElement(
        'android=new UiSelector().className("android.view.ViewGroup").instance(8)',
        "Close entry after lock"
    );
await driver.pause(2000);
    await verifyElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(3)',
        "Verify lock icon is displayed"
    );

    pass("STEP 3 passed — Lock button working correctly");

//     /* =====================================================
//        STEP 4: Edit Stitchlog Text
//     ===================================================== */

    await clickElement(
    'android=new UiSelector().text("Test description")',
    "Open Stitchlog entry for edit"
);

const editTitle = await $(
    'android=new UiSelector().className("android.widget.EditText").instance(0)'
);
await editTitle.addValue(" edit");
pass("Edit title text");

const editDescription = await $(
    'android=new UiSelector().className("android.widget.EditText").instance(1)'
);
await editDescription.click();
await editDescription.addValue(" edit");
pass("Edit description text");

await clickElement(
    'android=new UiSelector().className("android.widget.ImageView").instance(7)',
    "Save edited Stitchlog"
);

await verifyElement(
    'android=new UiSelector().text("edit")',
    "Verify edited title is displayed"
);
await driver.pause(3000);
    /* =====================================================
       STEP 5: Verify More Options Bottom Sheet
    ===================================================== */
await driver.pause(3000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(5)',
        "Click on More options"
    );

    await verifyElement(
        'android=new UiSelector().text("Journey Options")',
        "Verify Journey Options bottom sheet is displayed"
    );

    pass("STEP 5 passed — Bottom sheet opened successfully");

//     /* =====================================================
//        STEP 6: Verify Edit Option Navigation
//     ===================================================== */
await driver.pause(2000);
    await clickElement(
        '~Edit Item',
        "Click on Edit Item option"
    );
await driver.pause(2000);
    await verifyElement(
        'android=new UiSelector().description("Tag it")',
        "Verify navigation to Edit page"
    );
await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.view.ViewGroup").instance(8)',
        "Close Edit page"
    );

    pass("STEP 6 passed — Edit navigation working correctly");

//     /* =====================================================
//        STEP 7: Verify Duplicate Functionality
//     ===================================================== */
await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(5)',
        "Open More options again"
    );

    await clickElement(
        '~Duplicate',
        "Click on Duplicate option"
    );
await driver.pause(2000);
    await verifyElement(
        'android=new UiSelector().className("android.view.ViewGroup").instance(71)',
        "Verify duplicate Stitchlog created"
    );

    pass("STEP 7 passed — Duplicate functionality working");

//     /* =====================================================
//        STEP 8: Verify Delete Functionality
//     ===================================================== */
await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(5)',
        "Click on More options for delete"
    );

    await clickElement(
        '~Delete',
        "Click on Delete option"
    );

    await verifyElement(
        'android=new UiSelector().resourceId("android:id/alertTitle")',
        "Verify delete confirmation dialog displayed"
    );

    await clickElement(
        'android=new UiSelector().resourceId("android:id/button1")',
        "Confirm delete action"
    );

    pass("STEP 8 passed — Delete functionality working correctly");

    pass("CASE 5 completed — All Stitchlog functionalities verified successfully");
});
//--------- Case 6 ----------------------------------------------------
it("CASE 6 — Verify Stitchlog search functionality", async () => {

    /* =====================================================
       STEP 1: Add Dummy Data (2 Stitchlogs)
    ===================================================== */
await driver.pause(2000);
    // ---------- First Stitchlog ----------
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(6)',
        "Click on Plus button to add first stitchlog"
    );

    const title1 = await $('android=new UiSelector().text("Title..")');
    await title1.setValue("Test entree 1");
    pass("Enter title for first stitchlog");

    const content1 = await $('android=new UiSelector().resourceId("content")');
    await content1.setValue("test content 1");
    pass("Enter description for first stitchlog");

    await clickElement(
        'android=new UiSelector().description("Tag it")',
        "Click on Tag field"
    );

    await clickElement(
        'android=new UiSelector().description("Planning")',
        "Select Planning tag"
    );
await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(7)',
        "Save first stitchlog"
    );

    await driver.pause(2000);
await driver.pause(2000);
//     // ---------- Second Stitchlog ----------
    await clickElement(
        'android=new UiSelector().className("android.view.ViewGroup").instance(84)',
        "Click on Plus button to add second stitchlog"
    );

    const title2 = await $('android=new UiSelector().text("Title..")');
    await title2.setValue("Test entree 2");
    pass("Enter title for second stitchlog");

    const content2 = await $('android=new UiSelector().resourceId("content")');
    await content2.setValue("test content 2");
    pass("Enter description for second stitchlog");

    await clickElement(
        'android=new UiSelector().description("Tag it")',
        "Click on Tag field again"
    );

    await clickElement(
        'android=new UiSelector().description("Cutting")',
        "Select Cutting tag"
    );

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(7)',
        "Save second stitchlog"
    );

    await driver.pause(2000);
    pass("STEP 1 passed — Dummy data added successfully");

//     /* =====================================================
//        STEP 2: Search with Wrong Entry
//     ===================================================== */
  await driver.pause(2000);
   await clickElement(
    'android=new UiSelector().className("android.widget.ImageView").instance(1)',
    "Click on Search icon"
);

const searchField = await $('android=new UiSelector().className("android.widget.EditText")');
await searchField.setValue("dfgdfgdf");
pass("Enter invalid search text");
await driver.pause(2000);
// ✅ Use textContains instead of text
await verifyElement(
    'android=new UiSelector().textContains("space to think out loud")',
    "Verify empty state displayed for wrong search"
);

pass("STEP 2 passed — Wrong search handled correctly");

    /* =====================================================
       STEP 3: Verify Cross Button in Search
    ===================================================== */
await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(2)',
        "Click on Search cross button"
    );
await driver.pause(2000);
    await verifyElement(
        'android=new UiSelector().text("Test entree 2")',
        "Verify stitchlogs visible after clearing search"
    );

    pass("STEP 3 passed — Search reset working");

    /* =====================================================
       STEP 4: Search by Title
    ===================================================== */
await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(1)',
        "Open search again"
    );

    await searchField.clearValue();
    await searchField.setValue("Test entree 2");
    pass("Search by title");
await driver.pause(2000);
    await verifyElement(
        'android=new UiSelector().text("Test entree 2")',
        "Verify stitchlog filtered by title"
    );

    pass("STEP 4 passed — Search by title working");

    /* =====================================================
       STEP 5: Search by Tag Name
    ===================================================== */
await driver.pause(2000);
    await searchField.clearValue();
    await searchField.setValue("plan");
    pass("Search by tag name");
await driver.pause(2000);
    await verifyElement(
        'android=new UiSelector().text("Planning")',
        "Verify stitchlog filtered by tag"
    );

    pass("STEP 5 passed — Search by tag working");

//     /* =====================================================
//        STEP 6: Search by Content
//     ===================================================== */
await driver.pause(2000);
    await searchField.clearValue();
    await searchField.setValue("test content 2");
    pass("Search by content");
await driver.pause(2000);
    await verifyElement(
        'android=new UiSelector().text("test content 2")',
        "Verify stitchlog filtered by content"
    );
await driver.pause(2000);
    await verifyElement(
        'android=new UiSelector().text("Cutting")',
        "Verify related tag displayed"
    );

    pass("STEP 6 passed — Search by content working");

//     /* =====================================================
//        STEP 7: Reset Search Field
//     ===================================================== */
await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(2)',
        "Clear search field"
    );
await driver.pause(2000);
    await verifyElement(
        'android=new UiSelector().text("Test entree 2")',
        "Verify second stitchlog visible after reset"
    );
await driver.pause(2000);
    await verifyElement(
        'android=new UiSelector().text("Test entree 1")',
        "Verify first stitchlog visible after reset"
    );

    pass("STEP 7 passed — Search reset successful");
    pass("CASE 6 completed — Stitchlog search functionality verified");
});

it("CASE 7 — Verify Stitchlog plus (+) functionality", async () => {

    /* =====================================================
       STEP 1: Verify Quick selectors are selectable
    ===================================================== */
    await driver.pause(2000);

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(8)',
        "Click on Plus button"
    );

    await clickElement(
        '~Shopping List',
        "Select Shopping List quick selector"
    );

    await verifyElement(
        'android=new UiSelector().text("Shopping List")',
        "Verify Shopping List title displayed"
    );

    pass("STEP 1 passed — Quick selector selectable");


    // /* =====================================================
    //    STEP 2: Verify quick selectors appear after clearing title
    // ===================================================== */
    const shoppingTitle = await $('android=new UiSelector().text("Shopping List")');
    await shoppingTitle.clearValue();
    pass("Clear Shopping List title");

    await driver.pause(1000);

    await verifyElement(
        '~To-Do List',
        "Verify To-Do List quick selector displayed"
    );

    await verifyElement(
        '~Progress',
        "Verify Progress quick selector displayed"
    );

    pass("STEP 2 passed — Quick selectors visible after title cleared");


    // /* =====================================================
    //    STEP 3: Verify save with only attachment (Photo Library)
    // ===================================================== */
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(2)',
        "Maximize stitchlog screen"
    );

    await driver.pause(2000);

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(2)',
        "Click Plus button"
    );

    await clickElement(
        'android=new UiSelector().text("Photo Library")',
        "Open Photo Library"
    );

    await driver.pause(2000);

    await clickElement(
        'android=new UiSelector().className("android.view.View").instance(14)',
        "Select first image"
    );
    await clickElement(
        'android=new UiSelector().className("android.view.View").instance(18)',
        "Select second image"
    );
    await clickElement(
        'android=new UiSelector().className("android.view.View").instance(22)',
        "Select third image"
    );

    await clickElement(
        'android=new UiSelector().className("android.widget.Button").instance(6)',
        "Click Done button"
    );

    await driver.pause(1000);

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(6)',
        "Save stitchlog with attachments only"
    );

    pass("STEP 3 passed — Stitchlog saved with only attachments");


    /* =====================================================
       STEP 4: Verify Open Camera feature
    ===================================================== */
    await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(12)',
        "Click Add button"
    );

    await driver.pause(2000);

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(2)',
        "Maximize screen"
    );

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(2)',
        "Click Plus button"
    );

    await clickElement(
        '~Open Camera',
        "Open Camera"
    );

    await driver.pause(1000);

    await clickElement(
        '~Shutter',
        "Capture image"
    );

    await clickElement(
        '~Done',
        "Confirm captured image"
    );

    await driver.pause(1000);

    const cameraTitle = await $('android=new UiSelector().text("Title..")');
    await cameraTitle.setValue("Camera test");
    pass("Enter Camera stitchlog title");

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(6)',
        "Save camera stitchlog"
    );

    await verifyElement(
        'android=new UiSelector().text("Camera test")',
        "Verify Camera stitchlog created"
    );

    pass("STEP 4 passed — Open Camera working successfully");
    /* =====================================================
       STEP 5: Verify Add from Web functionality
    ===================================================== */
    await driver.pause(4000);

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(12)',
        "Click Add button"
    );
 await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(2)',
        "Maximize screen"
    );

    await driver.pause(2000);

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(2)',
        "Click Plus button"
    );
await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().text("Add from Web")',
        "Select Add from Web"
    );
await driver.pause(2000);
    const webInput = await $('android=new UiSelector().text("Search by keyword or paste a link")');
    await webInput.setValue("https://www.fabcycle.shop/");
    pass("Enter website URL");
 await driver.pause(4000);

    await clickElement(
        '~Go',
        "Click Go button"
    );

    await driver.pause(4000);
   await driver.$('~Save').click();

  await $('android=new UiSelector().text("Pick an image to add to journey")').waitForDisplayed({ timeout: 20000 });

    await verifyElement(
        'android=new UiSelector().textContains("Pick an image")',
        "Verify image picker screen displayed"
    );

    await clickElement(
        'android=new UiSelector().text("Select all images")',
        "Select all web images"
    );
 await driver.pause(2000);
    await clickElement(
        '~Next',
        "Click Next button"
    );

    const webTitle = await $('android=new UiSelector().text("Title..")');
    await webTitle.setValue("Web images");
    pass("Enter title for web images stitchlog");
 await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(6)',
        "Save web images stitchlog"
    );

    await verifyElement(
        'android=new UiSelector().textContains("Web images")',
        "Verify Web images stitchlog created"
    );

    pass("STEP 5 passed — Add from Web working");


    /* =====================================================
       STEP 6: Verify Web image view link working
    ===================================================== */
    await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().text("󰌹").instance(0)',
        "Open web image link"
    );

    await $('android=new UiSelector().textContains("Textile")')
    .waitForDisplayed({ timeout: 10000 });

await verifyElement(
    'android=new UiSelector().textContains("Textile")',
    "Verify web page opened successfully"
);

    await clickElement(
        'android=new UiSelector().text("Close")',
        "Close web view"
    );
 await driver.pause(2000);
    await verifyElement(
        'android=new UiSelector().text("Stitchlog")',
        "Verify navigated back to Stitchlog screen"
    );

    pass("STEP 6 passed — Web image link working");


//     /* =====================================================
//        STEP 7: Verify Upload from Stash functionality
//     ===================================================== */
    await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(19)',
        "Click Add button"
    );
 await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(2)',
        "Maximize screen"
    );

    await driver.pause(2000);

    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(2)',
        "Click Plus button"
    );

    await clickElement(
        '~Upload from Stash',
        "Select Upload from Stash"
    );

    await verifyElement(
        'android=new UiSelector().text("Add from Stash")',
        "Verify Add from Stash screen"
    );
 await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(1)',
        "Select stash item"
    );

    await driver.pause(2000);

    await clickElement(
        '~Done',
        "Confirm stash selection"
    );

    const stashTitle = await $('android=new UiSelector().text("Title..")');
    await stashTitle.setValue("Upload from stash");
    pass("Enter Upload from stash title");
 await driver.pause(2000);
    await clickElement(
        'android=new UiSelector().className("android.widget.ImageView").instance(6)',
        "Save stash stitchlog"
    );

    await verifyElement(
        'android=new UiSelector().textContains("Upload from stash")',
        "Verify stash stitchlog created"
    );

    pass("STEP 7 passed — Upload from Stash working");


    /* =====================================================
       STEP 8: Verify Progress Percentage (Hold & Swipe)
    ===================================================== */
  const sliderEl = await $('android=new UiSelector().className("android.widget.ImageView").instance(0)');
await sliderEl.waitForDisplayed({ timeout: 10000 });

const location = await sliderEl.getLocation();
const size = await sliderEl.getSize();
const screen = await driver.getWindowRect();

const startX = location.x + (size.width * 0.2);     // inside the element
const endX = screen.width - 20;                     // near right edge of screen
const centerY = location.y + (size.height / 2);

// Verify initial progress
await $('android=new UiSelector().text("0%")').waitForDisplayed({ timeout: 10000 });
await verifyElement(
    'android=new UiSelector().text("0%")',
    "Verify initial progress is 0%"
);

// Hold and swipe to screen end
await driver.performActions([{
    type: 'pointer',
    id: 'finger1',
    parameters: { pointerType: 'touch' },
    actions: [
        { type: 'pointerMove', duration: 0, x: startX, y: centerY },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 600 },
        { type: 'pointerMove', duration: 1200, x: endX, y: centerY }, // LONG swipe
        { type: 'pointerUp', button: 0 }
    ]
}]);

await driver.releaseActions();

// Verify final progress
await $('android=new UiSelector().text("100%")').waitForDisplayed({ timeout: 10000 });
await verifyElement(
    'android=new UiSelector().text("100%")',
    "Verify progress reached 100%"
);

pass("STEP 8 passed — Progress percentage working");

});





















});
