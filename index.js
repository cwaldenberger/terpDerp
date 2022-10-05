


ducthieArray = []
ducthieArray.push('https://dutchie.com/embedded-menu/the-dispensary-eastern-express/products/flower')



const puppeteer = require('puppeteer');
let strainUrlArr

(async function collectStrainUrls(strainUrlArr) {
    //launch chrome, open window. nav to url
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(ducthieArray[0], {waitUntil: 'networkidle2'});
   //end launch

   //scroll p1
    await page.setViewport({
        width: 1200,
        height: 800
    });
    
    async function autoScroll(page) {
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                var totalHeight = 0;
                var distance = 100;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }
    
    await autoScroll(page);
    // end scroll p1


    //collect URL data p1
    let urlItems = []
    
    let urlData = await page.evaluate(function () {
        urlItems = Array.from(document.querySelectorAll("#main-content > div.product-list__Container-sc-1arkwfu-1.indfTt > div > div > a")).map(x => x.href)
        return urlItems
    })
    //end collect URL data p1

    //nav to p2  
    await page.click('#main-content > div.product-list__Container-sc-1arkwfu-1.indfTt > div.product-list__PaginationControlsContainer-sc-1arkwfu-0.cpUFBe > nav > div:nth-child(3) > button', {waitUntil: 'networkidle2'})
    //end nav to p2

    //scroll p2
    await page.setViewport({
        width: 1200,
        height: 800
    });
    
    await autoScroll(page);
    //end scroll p1
    
    //collect data p2
    let urlItems2 = []
    let urlData2 = await page.evaluate(function () {
        urlItems2 = Array.from(document.querySelectorAll("#main-content > div.product-list__Container-sc-1arkwfu-1.indfTt > div > div > a")).map(x => x.href)
        return urlItems2
    })
    //end collect data p2
    
    //concat collected data
    strainUrlArr = [...urlData, ...urlData2]
    //end concat collected data

    //close browser
    await browser.close()
    //end close browser

    //display all collected data in console
    console.log(strainUrlArr)
    //end console display

    // const browser2 = await puppeteer.launch({ headless: false });
    // const page2 = await browser.newPage();
    // await page2.goto(ducthieArray[0], {waitUntil: 'networkidle2'});

    return strainUrlArr
})();

(async function captureDetails(collectStrainUrls) {
    const strainUrls = await collectStrainUrls(strainUrlArr);
})();

































































































 // //Loop through each URL, collect data, return obj, close browser   
    
    // for (let i=0; i<strainUrlArr.length; i++){
    //  launch chrome, open tab, nav to url
    //     const strainWindow = await puppeteer.launch({ headless: false });
    //     const strainTab = await browser.newPage();
    //     await strainTab.goto('google.com');
    // // // }
    // end launch

    // console.log(strainUrlArr[0])


    // //scroll page
    //     await page.setViewport({
    //         width: 1200,
    //         height: 800
    //     });
        
    //     await autoScroll(page);
    // //end scroll page


    //     let brandName = document.querySelector('#__next > div.wrapper__Container-sc-1s2vg03-0.jtGFek > div > div.content-wrapper__Container-sc-1y2isoj-0.hcZWUf > div > div > div.layout__Content-sc-1ty1p5n-1.eJfYbA > div.layout__Details-sc-1ty1p5n-2.dSOvZj > div.typography__Brand-sc-1q7gvs8-2.eskRYt > a').innerText
    //     let strainName = document.querySelector('#__next > div.wrapper__Container-sc-1s2vg03-0.jtGFek > div > div.content-wrapper__Container-sc-1y2isoj-0.hcZWUf > div > div > div.layout__Content-sc-1ty1p5n-1.eJfYbA > div.layout__Details-sc-1ty1p5n-2.dSOvZj > h1').innerText
    //     let thcScore = document.querySelector('#__next > div.wrapper__Container-sc-1s2vg03-0.jtGFek > div > div.content-wrapper__Container-sc-1y2isoj-0.hcZWUf > div > div > div.layout__Content-sc-1ty1p5n-1.eJfYbA > div.layout__Details-sc-1ty1p5n-2.dSOvZj > div.product__Tags-sc-1pgqasa-1.cdLsNZ > div:nth-child(1) > button > span').innerText
    //     let cbdScore = document.querySelector('#__next > div.wrapper__Container-sc-1s2vg03-0.jtGFek > div > div.content-wrapper__Container-sc-1y2isoj-0.hcZWUf > div > div > div.layout__Content-sc-1ty1p5n-1.eJfYbA > div.layout__Details-sc-1ty1p5n-2.dSOvZj > div.product__Tags-sc-1pgqasa-1.cdLsNZ > div:nth-child(2) > button > span').innerText
    //     // let terp1 = document.querySelector().innerText
    //     // let terp2 = document.querySelector().innerText
    //     // let terp3 = document.querySelector().innerText
    //     // let terp4 = document.querySelector().innerText
    //     // let terp5 = document.querySelector().innerText
    //     // let cannabinoid1 = document.querySelector().innerText
    //     // let cannabinoid2 = document.querySelector().innerText
    //     // let cannabinoid3 = document.querySelector().innerText
    //     // let cannabinoid4 = document.querySelector().innerText
    //     // let cannabinoid5 = document.querySelector().innerText

    //      return{
    //         brandName,
    //         strainName,
    //         thcScore,
    //         cbdScore,
    //         // terpeneProfile: {
    //         //     terp1,
    //         //     terp2,
    //         //     terp3,
    //         //     terp4,
    //         //     terp5
    //         // },
    //         // cannabinoidProfile: {
    //         //     cannabinoid1,
    //         //     cannabinoid2,
    //         //     cannabinoid3,
    //         //     cannabinoid4,
    //         //     cannabinoid5
    //         }
    //     }
    // }