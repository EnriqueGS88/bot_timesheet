const puppeteer = require('puppeteer');

async function submitTimesheet() {

    const browser = await puppeteer.launch(
        {
            headless: false,
            defaultViewport:{
                width: 1400,
                height: 900,
                deviceScaleFactor: 1,
            },
            slowMo:70
        }

    );

    const page = await browser.newPage();

    const rawToday = new Date();
    const today = rawToday.getFullYear() + "-" + ( rawToday.getMonth() +1 ) + "-" + rawToday.getDate();

    const baseURL = `https://performancemanager5.successfactors.eu/sf/timesheet?bplte_company=SAP#/timerecords/11516741/${today}`;
    
    await page.goto(baseURL);
    await page.waitForTimeout(8000);
    // debugger;
    
    // Selectors
    const selectorApplyTime = 'span[id="__component1---timeRecordingView--applyPlannedTimeBtnExpanded-content"]';
    const selectorAllowances = 'bdi[id="__component1---timeRecordingView--recordsAllowance--add-BDI-content"]';
    const selectorUpdateTime = 'span[id="__component1---timeRecordingView--btnSaveTimeRecords-content"]';
    const selectorDay1 = 'tr[id="__item6-__component1---weekSummaryView--daysSummaryTableFragement--daysSummaryTable-0"]';
    const selectorDay2 = 'tr[id="__item6-__component1---weekSummaryView--daysSummaryTableFragement--daysSummaryTable-1"]';
    const selectorDay3 = 'tr[id="__item6-__component1---weekSummaryView--daysSummaryTableFragement--daysSummaryTable-2"]';
    const selectorDay4 = 'tr[id="__item6-__component1---weekSummaryView--daysSummaryTableFragement--daysSummaryTable-3"]';
    const selectorDay5 = 'tr[id="__item6-__component1---weekSummaryView--daysSummaryTableFragement--daysSummaryTable-4"]';
    const selectorSubmitTime = 'bdi[id="__component1---weekSummaryView--submitTimeSheetBtnExpanded-BDI-content"]';
    const selectorConfirmSubmission = 'bdi[id="__component1---weekSummaryView--btnConfirmSubmitDialog-BDI-content"]';
    const arrayOfDays = [
        selectorDay1,
        selectorDay2,
        selectorDay3,
        selectorDay4,
        selectorDay5,
    ]
    
    
    
    // debugger;
    await page.waitForSelector(selectorDay1);
    await page.waitForTimeout(5000)
    // debugger;
    
    for ( let d = 2; d < arrayOfDays.length-2; d++ ) {

        await page.waitForTimeout(3000);
        await page.click(arrayOfDays[d]);
        await page.waitForSelector(selectorApplyTime);
        await page.click(selectorApplyTime);
        await page.waitForTimeout(1000);
        await page.click(selectorAllowances);
        await page.waitForTimeout(2500);
        await page.click(selectorUpdateTime);
        await page.waitForTimeout(2000);

    }
    debugger;
    await page.click(selectorSubmitTime);
    await page.waitForTimeout(3000);
    await page.click(selectorConfirmSubmission);
    await page.waitForTimeout(5000);
    console.log("Timesheet successfully submitted");

};

submitTimesheet();