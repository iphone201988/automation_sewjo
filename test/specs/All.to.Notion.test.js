const { expect } = require('@wdio/globals');

// Notion add flow start from all page of appllication and end on the details page notion for now 

describe('🧵 Sewjo App – Notion Flow Test', () => {

    // ✅ Swipe Up Function (your working logic)
    async function swipeUp() {
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
    }

    // ✅ Save Button Click Function (your working logic)
    async function clickSaveButton() {
        console.log('🟢 Clicking Save button...');
        const { width, height } = await driver.getWindowRect();
        const x = Math.floor(width / 2);
        const y = Math.floor(height - 100);
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
        console.log('✅ Save button clicked successfully.');
    }

    it('🧩 Step 1: Verify Notion tab & navigate to Add Notions', async () => {
        console.log('🟢 Step 1: Checking if "Notions" tab is displayed...');
        const notionsTab = await $('android=new UiSelector().text("Notions")');
        if (!(await notionsTab.isDisplayed())) {
            console.log('❌ "Notions" tab not found — test stopped.');
            return;
        }
        await notionsTab.click();
        await driver.pause(2000);
        console.log('✅ Clicked "Notions" tab.');

        // Verify navigation to All Notions
        const allNotions = await $('android=new UiSelector().text("All Notions")');
        if (await allNotions.isDisplayed()) {
            console.log('✅ Navigation success — "All Notions" screen visible.');
        } else {
            console.log('❌ "All Notions" not displayed — stopping.');
            return;
        }

        // Open Add to Stash bottom sheet
        const plusBtn = await $('android=new UiSelector().text("󰐕")');
        await plusBtn.click();
        await driver.pause(2000);

        const addToStash = await $('android=new UiSelector().text("Add to Stash")');
        if (await addToStash.isDisplayed()) {
            console.log('✅ "Add to Stash" bottom sheet displayed.');
        } else {
            console.log('❌ Bottom sheet not displayed.');
            return;
        }

        // Verify Add Fabric / Pattern / Notions options
        const addFabric = await $('android=new UiSelector().text("Add Fabric")');
        const addPattern = await $('android=new UiSelector().text("Search & Add Pattern")');
        const addNotions = await $('android=new UiSelector().text("Add Notions")');
        if (await addFabric.isDisplayed() && await addPattern.isDisplayed() && await addNotions.isDisplayed()) {
            console.log('✅ Add Fabric, Add Pattern & Add Notions options are visible.');
        } else {
            console.log('❌ One or more Add options missing.');
        }
    });

    it('📸 Case 1: Save Notion with Image only', async () => {
        console.log('🟢 Case 1: Saving notion with image only...');

        // Click Add Notions
        const addNotionsBtn = await $('android=new UiSelector().text("Add Notions")');
        await addNotionsBtn.click();
        await driver.pause(2000);

        const notionUploadText = await $('android=new UiSelector().text("Notion Upload")');
        if (await notionUploadText.isDisplayed()) {
            console.log('✅ Add Notion page displayed successfully.');
        } else {
            console.log('❌ Add Notion page not displayed.');
            return;
        }
        // Image Upload flow
        const imageUpload = await $('android=new UiSelector().text("Image Upload")');
        await imageUpload.click();
        await driver.pause(1000);
        const photoLibrary = await $('android=new UiSelector().text("Photo Library")');
        await photoLibrary.click();
        await driver.pause(2000);

        const imageToSelect = await $('android=new UiSelector().className("android.view.View").instance(14)');
        await imageToSelect.click();
        await driver.pause(2000);

        const doneButton = await $('android=new UiSelector().className("android.widget.Button").instance(6)');
        await doneButton.click();
        await driver.pause(3000);
        console.log('✅ Image selected successfully.');

        // Save notion
        await clickSaveButton();

        const allNotionsText = await $('android=new UiSelector().text("All Notions")');
        if (await allNotionsText.isDisplayed()) {
            console.log('✅ Notion saved with image only.');
        } else {
            console.log('❌ Notion not saved correctly.');
        }
    });

    it('📝 Case 2: Save Notion with Image, Name & Notes', async () => {
        console.log('🟢 Case 2: Saving notion with image + details...');

        // Click + then Add Notions
        const plusBtn = await $('android=new UiSelector().text("󰐕")');
        await plusBtn.click();
        await driver.pause(2000);
        const addNotionsBtn = await $('android=new UiSelector().text("Add Notions")');
        await addNotionsBtn.click();
        await driver.pause(2000);

        // Upload image again
        const imageUpload = await $('android=new UiSelector().text("Image Upload")');
        await imageUpload.click();
        await driver.pause(1000);
        const photoLibrary = await $('android=new UiSelector().text("Photo Library")');
        await photoLibrary.click();
        await driver.pause(2000);
        const imageToSelect = await $('android=new UiSelector().className("android.view.View").instance(14)');
        await imageToSelect.click();
        await driver.pause(2000);
        const doneButton = await $('android=new UiSelector().className("android.widget.Button").instance(6)');
        await doneButton.click();
        await driver.pause(3000);
        console.log('✅ Image uploaded successfully.');

        // Scroll + expand
        await swipeUp();
        const arrowBtn = await $('android=new UiSelector().text("󰅀")');
        await arrowBtn.click();
        await driver.pause(1000);
        await swipeUp();

        // Fill Notion Name
        const notionNameField = await $('android=new UiSelector().text("e.g., Sparkle Lace, Wooden Buttons.")');
        await notionNameField.click();
        await notionNameField.setValue('Test automation notion');
        console.log('✅ Added notion name.');
        await swipeUp();

        // Fill Notes
        const notesField = await $('android=new UiSelector().text("Jot down important details, thoughts, or modifications")');
        await notesField.click();
        await notesField.setValue('test notes has been added by automation');
        console.log('✅ Added notes.');

        // Save notion
        await clickSaveButton();

        // click on first records 
        console.log('🟢 Clicking on the first notion record in the list...');
        const firstRecord = await $('android=new UiSelector().className("android.widget.ImageView").instance(5)');
        await firstRecord.click();
        await driver.pause(3000);
        console.log('✅ First notion record clicked successfully.');
        // Verify added record
        const newRecord = await $('android=new UiSelector().text("Test automation notion")');
        if (await newRecord.isDisplayed()) {
            console.log('✅ New notion record displayed.');
            // await newRecord.click();
            await driver.pause(2000);

            const notesCheck = await $('android=new UiSelector().text("test notes has been added by automation")');
            if (await notesCheck.isDisplayed()) {
                console.log('✅ Notion saved with name, image, and notes correctly.');
            } else {
                console.log('❌ Notes not displayed on details page.');
            }
        } else {
            console.log('❌ New notion record not found.');
        }
    });
});
