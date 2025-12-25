const { saveButtonClick } = require('../../helping.functions');

async function addOneFabric(count) {
    console.log(`\n🔵 STARTING FABRIC #${count}\n`);
    await driver.pause(2000);

    try {
        await $('android=new UiSelector().text("Fabric")').click();
        console.log(`[${count}] Clicked Fabric tab`);
    } catch (e) { 
        throw new Error(`[${count}] Could not click Fabric tab: ${e.message}`); 
    }

    try {
        await driver.pause(2000);
        await $('android=new UiSelector().text("󰐕")').click();
        console.log(`[${count}] Clicked Plus button`);
    } catch (e) { 
        throw new Error(`[${count}] Could not click Plus button: ${e.message}`); 
    }

    try {
        await driver.pause(2000);
        await $('android=new UiSelector().text("Add Fabric")').click();
        console.log(`[${count}] Selected Add Fabric`);
    } catch (e) { 
        throw new Error(`[${count}] Could not select Add Fabric: ${e.message}`); 
    }

    try {
        await $('android=new UiSelector().text("Image Upload")').click();
        console.log(`[${count}] Clicked Image Upload`);
    } catch (e) { 
        throw new Error(`[${count}] Could not click Image Upload: ${e.message}`); 
    }

    try {
        await $('android=new UiSelector().description("Photo Library")').click();
        console.log(`[${count}] Opened Photo Library`);
    } catch (e) { 
        throw new Error(`[${count}] Could not open Photo Library: ${e.message}`); 
    }

    const imageInstances = [14, 18, 22, 26, 34];
    for (const idx of imageInstances) {
        try {
            await $(`android=new UiSelector().className("android.view.View").instance(${idx})`).click();
            console.log(`[${count}] Selected image instance(${idx})`);
            await driver.pause(500);
        } catch (e) { 
            throw new Error(`[${count}] Could not click image instance(${idx}): ${e.message}`); 
        }
    }

    try {
        await $('android=new UiSelector().className("android.widget.Button").instance(6)').click();
        console.log(`[${count}] Clicked Done`);
    } catch (e) { 
        throw new Error(`[${count}] Could not click Done: ${e.message}`); 
    }

    await driver.pause(15000);

    try {
        await saveButtonClick();
        await driver.pause(2000);
        console.log(`[${count}] Clicked Save Button`);
    } catch (e) { 
        throw new Error(`[${count}] Could not click Save Button: ${e.message}`); 
    }

    await driver.pause(5000);
    console.log(`\n🟢 FABRIC #${count} COMPLETED\n`);
}

async function restartApp() {
    console.log("\n🔄 Restarting app...\n");
    await driver.terminateApp("com.sewjoappmobile");
    await driver.pause(3000); // extra pause for stability
    await driver.activateApp("com.sewjoappmobile");
    await driver.pause(5000);
}

describe("CASE — Add 200 Fabrics in 10 Batches", () => {
    const total = 200;
    const batch = 20;
    let start = 1;

    for (let batchNo = 1; batchNo <= total / batch; batchNo++) {
        it(`Batch ${batchNo}: Add fabrics ${start} to ${start + batch - 1}`, async () => {
            for (let i = start; i < start + batch; i++) {
                await addOneFabric(i);
            }

            await restartApp(); // restart app after each batch
        });

        start += batch;
    }
});
