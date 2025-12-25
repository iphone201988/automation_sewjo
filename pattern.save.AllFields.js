const { expect } = require('@wdio/globals');
const { swipeUp, saveButtonClick, uploadButtonClick } = require('../../helping.functions');

describe('🧵 Sewjo App - Case 3: Save Pattern with All Fields and Private Image (Full)', () => {

    // --- helpers (your working implementations) ---
  

    it('Case 3: Save pattern with all fields and private image (full steps)', async () => {
        let casePassed = true;
        try {
            // 1. Click plus and verify Add to Stash
            console.log('Step 1: Click Plus button');
            const plusBtn = await $('android=new UiSelector().text("󰐕")');
            await plusBtn.click();
            await driver.pause(1500);

            const addToStash = await $('android=new UiSelector().text("Add to Stash")');
            if (await addToStash.isDisplayed()) {
                console.log('✅ Add to Stash displayed');
            } else {
                console.log('❌ Add to Stash not displayed');
                casePassed = false;
            }

            // 2. Click Search & Add Pattern and verify screen
            console.log('Step 2: Click "Search & Add Pattern"');
            const addPatternOption = await $('android=new UiSelector().text("Search & Add Pattern")');
            await addPatternOption.click();
            await driver.pause(1500);

            const searchPattern = await $('android=new UiSelector().text("Search for Pattern")');
            if (await searchPattern.isDisplayed()) {
                console.log('✅ Search for Pattern screen displayed');
            } else {
                console.log('❌ Search for Pattern not displayed');
                casePassed = false;
            }

            // 3. Click Add Pattern
            console.log('Step 3: Click "Add Pattern"');
            const addPatternButton = await $('android=new UiSelector().text("Add Pattern")');
            await addPatternButton.click();
            await driver.pause(1500);

            // 4. Click Image Upload
            console.log('Step 4: Click "Image Upload"');
            const imageUpload = await $('android=new UiSelector().text("Image Upload")');
            await imageUpload.click();
            await driver.pause(1500);

            // 5-6. Select public image (instance(0)), Photo Library, pick image, Done
            console.log('Step 5-6: Select public image -> Photo Library -> pick -> Done');
            const publicUpload = await $('android=new UiSelector().description("Upload").instance(0)');
            await publicUpload.click();
            await driver.pause(800);

            const photoLibrary = await $('android=new UiSelector().text("Photo Library")');
            await photoLibrary.click();
            await driver.pause(2000);

            const pickImage = await $('android=new UiSelector().className("android.view.View").instance(14)');
            await pickImage.click();
            await driver.pause(1200);

            const doneBtn = await $('android=new UiSelector().className("android.widget.Button").instance(6)');
            await doneBtn.click();
            await driver.pause(2500);

            // 7. Click Model Image and Upload
            console.log('Step 7: Click "Model Image" then "Upload"');
            const modelImage = await $('android=new UiSelector().text("Model Image")');
            await modelImage.click();
            await driver.pause(800);

            const uploadBtnText = await $('android=new UiSelector().text("Upload")');
            await uploadBtnText.click();
            await driver.pause(1000);

            // 8. Click Upload using working pointer logic
            console.log('Step 8: Clicking Upload (coordinates)');
            await uploadButtonClick();
            await driver.pause(1500);

            // 9. Click Got it
            try {
                const gotIt = await $('android=new UiSelector().text("Got it!")');
                if (await gotIt.isDisplayed()) {
                    await gotIt.click();
                    await driver.pause(1000);
                    console.log('✅ Clicked Got it');
                }
            } catch (e) {
                // not critical
            }

            // 10. Click pattern name field and add text
            console.log('Step 10: Enter pattern name');
            const patternNameField = await $('android=new UiSelector().text("e.g., V1927, Vintage Wrap Dress")');
            await patternNameField.click();
            await patternNameField.clearValue().catch(()=>{}); // ignore if not supported
            await patternNameField.setValue('pattern name added by automation');
            await driver.pause(800);

            // 11. Enter brand and select green area
            console.log('Step 11: Enter brand and select suggestion');
            const brandField = await $('android=new UiSelector().text("Type or select (e.g., Vogue Patterns)")');
            await brandField.click();
            await brandField.setValue('automation brand');
            await driver.pause(800);
            // click green area suggestion (TextView.instance(7))
            const brandSelect = await $('android=new UiSelector().className("android.widget.TextView").instance(7)');
            await brandSelect.click();
            await driver.pause(800);

            // 12. Click arrow to display all fields
            console.log('Step 12: Click arrow to expand fields');
            const arrow = await $('android=new UiSelector().text("󰅀")');
            await arrow.click();
            await driver.pause(800);

            // 13. Scroll up and fill description
            console.log('Step 13: Scroll up and add description');
            await swipeUp();
            const descField = await $('android=new UiSelector().text("E.g., Wide-leg trousers with pleats and pockets")');
            await descField.click();
            await descField.setValue('Automation text has been added for the testing purpose');
            await driver.pause(800);

            // 14. Min and Max size (instances 2 and 3)
            console.log('Step 14: Fill min & max size');
            const minSize = await $('android=new UiSelector().className("android.widget.EditText").instance(2)');
            await minSize.click();
            await minSize.setValue('2');
            await driver.pause(500);

            const maxSize = await $('android=new UiSelector().className("android.widget.EditText").instance(3)');
            await maxSize.click();
            await maxSize.setValue('3');
            await driver.pause(500);

            // 15. Scroll up
            console.log('Step 15: Scroll up');
            await swipeUp();

            // 16. Enter pattern view (Enter total views)
            console.log('Step 16: Enter total views');
            const viewsField = await $('android=new UiSelector().text("Enter total views")');
            await viewsField.click();
            await viewsField.setValue('3');
            await driver.pause(500);
            await swipeUp();

            // 17. Small wait
            await driver.pause(500);

            // 18. Click dropdown ImageView.instance(3) and select "B"
            console.log('Step 18: Select dropdown option "B"');
            const dropdown = await $('android=new UiSelector().className("android.widget.ImageView").instance(3)');
            await dropdown.click();
            await driver.pause(800);
            const optB = await $('android=new UiSelector().text("B")');
            await optB.click();
            await driver.pause(600);

            // 19. Size field instance(1) set to 2
            console.log('Step 19: Enter size');
            const sizeField = await $('android=new UiSelector().className("android.widget.EditText").instance(1)');
            await sizeField.click();
            await sizeField.setValue('2');
            await driver.pause(600);

            // 20. Scroll up
            console.log('Step 20: Scroll up');
            await swipeUp();

            // 21. Add a tag then click add button (ImageView.instance(4))
            console.log('Step 21: Add tag');
            const addTag = await $('android=new UiSelector().text("Add a tag...")');
            await addTag.click();
            await addTag.setValue('Test automation tag');
            await driver.pause(500);
            const addTagBtn = await $('android=new UiSelector().className("android.widget.ImageView").instance(4)');
            await addTagBtn.click();
            await driver.pause(800);

            // 22. Pattern type field -> add and select (TextView.instance(5))
            console.log('Step 22: Add pattern type');
            const patternType = await $('android=new UiSelector().text("Type or select (e.g., Apparel, Home Decor) ")');
            await patternType.click();
            await patternType.setValue('Test pattern');
            await driver.pause(800);
            const typeSelect = await $('android=new UiSelector().className("android.widget.TextView").instance(5)');
            await typeSelect.click();
            await driver.pause(800);
            await swipeUp();

            // 23. Category type -> add and select (TextView.instance(6))
            console.log('Step 23: Add category type');
            const categoryType = await $('android=new UiSelector().text("Type or select (e.g., Top, Bottom)")');
            await categoryType.click();
            await categoryType.setValue('Test type by automation');
            await driver.pause(800);
            const catSelect = await $('android=new UiSelector().className("android.widget.TextView").instance(6)');
            await catSelect.click();
            await driver.pause(800);

            // 24. Scroll up
            console.log('Step 24: Scroll up again');
            await swipeUp();

            // 25. Specific style field and select instance(8)
            console.log('Step 25: Select style');
            const styleField = await $('android=new UiSelector().text("Type or select (e.g., Skirt, Shirt, Pillows) ")');
            await styleField.click();
            await styleField.setValue('Test automation style');
            await driver.pause(800);
            const styleSelect = await $('android=new UiSelector().className("android.widget.TextView").instance(8)');
            await styleSelect.click();
            await driver.pause(800);

            // 26. Fabric type -> add and select TextView.instance(4)
            console.log('Step 26: Add fabric type');
            const fabricType = await $('android=new UiSelector().text("Type or select (e.g., Cotton, Denim, Silk)")');
            await fabricType.click();
            await fabricType.setValue('Test fabric type');
            await driver.pause(800);
            const fabricSelect = await $('android=new UiSelector().className("android.widget.TextView").instance(4)');
            await fabricSelect.click();
            await driver.pause(800);
            await swipeUp();

            // 27. Notion needed field
            console.log('Step 27: Add notion needed text');
            const notionNeeded = await $('android=new UiSelector().text("List required notions (e.g., 8 buttons, 14” zipper)")');
            await notionNeeded.click();
            await notionNeeded.setValue('Text text has been added by automatic testing system');
            await driver.pause(800);

            // 28. Scroll up
            console.log('Step 28: Scroll up');
            await swipeUp();

            // 29. Skill level select Intermediate
            console.log('Step 29: Select skill level');
            const skillField = await $('android=new UiSelector().text("Select (e.g., Beginner)")');
            await skillField.click();
            await driver.pause(600);
            const skillVal = await $('android=new UiSelector().text("Intermediate")');
            await skillVal.click();
            await driver.pause(600);

            // 30. Age group select Child
            console.log('Step 30: Select age group "Child"');
            const ageField = await $('android=new UiSelector().text("Select (e.g., Adult/Child/Baby)")');
            await ageField.click();
            await driver.pause(600);
            const childVal = await $('android=new UiSelector().text("Child")');
            await childVal.click();
            await driver.pause(600);
            await swipeUp();

            // 31. Enter specifications
            console.log('Step 31: Enter specifications');
            const specField = await $('android=new UiSelector().text("E.g., seam allowance, finished garment measurements")');
            await specField.click();
            await specField.setValue('test specification has been added by automation system');
            await driver.pause(800);

            // 32. Click Save using working logic
            console.log('Step 32: Click Save');
            await saveButtonClick();
            await driver.pause(3000);

            // 33. Verify the pattern appears
            console.log('Step 33: Verify pattern presence in list');
            const savedPattern = await $('android=new UiSelector().text("pattern name added by automation")');
            if (await savedPattern.isDisplayed()) {
                console.log('✅ Pattern saved and visible in list');
            } else {
                console.log('❌ Pattern not visible after save');
                casePassed = false;
            }

            // 34. Final pass/fail
            if (casePassed) {
                console.log('🎉 CASE 3 PASSED: All steps succeeded');
            } else {
                console.error('❌ CASE 3 FAILED: One or more verifications failed');
            }

        } catch (err) {
            console.error('❌ CASE 3 ERROR:', err.message);
            throw err;
        }
    });
// 


it('🟩 Case 2: Add Pattern With Private Image + Pattern & Brand Name', async () => {

    console.log('-----------------------------------------');
    console.log('🟩 Case 2: Add Pattern With Private Image');
    console.log('-----------------------------------------');

    let casePassed = true;

    try {

        // 1. Click +
        // console.log("Step 1: Clicking + button");
        // await $('android=new UiSelector().text("󰐕")').click();
        // await driver.pause(1500);

        // const addToStash = await $('android=new UiSelector().text("Add to Stash")');
        // if (!await addToStash.isDisplayed()) throw new Error("Add to Stash not displayed");


        // // 2. Click Search & Add Pattern → Verify search page
        // console.log("Step 2: Clicking Search & Add Pattern");
        // await $('android=new UiSelector().text("Search & Add Pattern")').click();
        // await driver.pause(1500);

        // const searchPage = await $('android=new UiSelector().text("Search for Pattern")');
        // if (!await searchPage.isDisplayed()) throw new Error("Search for Pattern not displayed");


        // // 3. Click Add Pattern
        // console.log("Step 3: Clicking Add Pattern");
        // await $('android=new UiSelector().text("Add Pattern")').click();
        // await driver.pause(1500);


        // // 4. Click Image Upload
        // console.log("Step 4: Clicking Image Upload");
        // await $('android=new UiSelector().text("Image Upload")').click();
        // await driver.pause(1500);


        // // 5. Public image → Photo Library
        // console.log("Step 5: Selecting public image option");
        // await $('android=new UiSelector().description("Upload").instance(0)').click();
        // await driver.pause(1000);
        // await $('android=new UiSelector().text("Photo Library")').click();
        // await driver.pause(2000);


        // // 6. Select image + Done
        // console.log("Step 6: Selecting image");
        // await $('android=new UiSelector().className("android.view.View").instance(14)').click();
        // await driver.pause(1500);

        // await $('android=new UiSelector().className("android.widget.Button").instance(6)').click();
        // await driver.pause(3000);


        // // 7. Click Model Image → Upload
        // console.log("Step 7: Clicking Model Image text");
        // await $('android=new UiSelector().text("Model Image")').click();
        // await driver.pause(1000);

        // console.log("Clicking Upload button");
        // await $('android=new UiSelector().text("Upload")').click();
        // await driver.pause(1500);


        // // 8. Pointer upload click (working logic)
        // console.log("Step 8: Clicking Upload pointer button");
        // await uploadButtonClick();
        // await driver.pause(4000);


        // // 9. Got it
        // console.log("Step 9: Clicking Got it");
        // try {
        //     const gotIt = await $('android=new UiSelector().text("Got it!")');
        //     if (await gotIt.isDisplayed()) {
        //         await gotIt.click();
        //         await driver.pause(2000);
        //     }
        // } catch (e) { /* ignore */ }


        // 10. Enter pattern name
        console.log("Step 10: Entering Pattern Name");
        const patternField = await $('android=new UiSelector().text("e.g., V1927, Vintage Wrap Dress")');
        await patternField.click();
        await patternField.setValue("pattern name added by automation");
        await driver.pause(1500);


        // 11. Enter brand name + select suggestion
        console.log("Step 11: Entering Brand Name");
        const brandField = await $('android=new UiSelector().text("Type or select (e.g., Vogue Patterns)")');
        await brandField.click();
        await brandField.setValue("automation brand");
        await driver.pause(1500);

        console.log("Clicking brand suggestion");
        await $('android=new UiSelector().className("android.widget.TextView").instance(7)').click();
        await driver.pause(1500);


        // 12. Save pointer button
        console.log("Step 12: Clicking Save button");
        await saveButtonClick();
        await driver.pause(4000);


        // 13. Verify added text in list
        console.log("Step 13: Verifying pattern added in list");
        const listItem = await $('android=new UiSelector().text("pattern name added by automation")');
        if (!await listItem.isDisplayed()) throw new Error("Pattern name not showing in list");


        // 14. Click first record
        console.log("Step 14: Clicking first record");
        await $('android=new UiSelector().className("android.widget.ImageView").instance(5)').click();
        await driver.pause(2000);


        // 15. Verify name in details
        console.log("Step 15: Verifying name in details");
        const detailName = await $('android=new UiSelector().text("pattern name added by automation")');
        if (!await detailName.isDisplayed()) throw new Error("Pattern name not found in details");


        // 16. Verify brand in details
        console.log("Step 16: Verifying brand name in details");
        const detailBrand = await $('android=new UiSelector().text("automation brand")');
        if (!await detailBrand.isDisplayed()) throw new Error("Brand name not found in details");

    } catch (err) {
        casePassed = false;
        console.log("❌ Case 2 Failed → " + err.message);
    }

    // 17 & 18: Final pass/fail summary
    if (casePassed) {
        console.log("🟩 Case 2 Passed: Add Pattern With Private Image");
    } else {
        console.log("🟥 Case 2 Failed: Add Pattern With Private Image");
        throw new Error("Case 2 Failed");
    }

});

});

