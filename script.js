const puppeteer = require('puppeteer');
const data = require("./config.json");
let numofPost = process.argv[2];
(async function () {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/', { waitUntil: "networkidle2" });
    await page.type("input[name='username']", data.user, { delay: 200 });
    await page.type("input[name='password']", data.pwd, { delay: 200 });
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click("button[type='submit']"),
    ]);
    await page.type("input[placeholder='Search']", "PepCoding");
    await page.waitForSelector(".fuqBx .JvDyy a", { visible: true });
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click(".fuqBx .JvDyy a"),
    ]);
    // ._9AhH0
    await page.waitForSelector("._9AhH0", { visible: true }); //like slector
    

    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click("._9AhH0"), //next post arrow
    ]);
    let i = 0;
    do {
        await page.waitForSelector(".fr66n button");
        await page.click(".fr66n button");
        await Promise.all([

            page.waitForNavigation({ waitUntil: "networkidle2" }),
            page.click("._65Bje.coreSpriteRightPaginationArrow"),
        ]);
        await page.waitForTimeout(3000);
        i++;
    } while (i < numofPost) { }
})();