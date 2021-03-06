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

    // const rawToday = new Date();
    // const today = rawToday.getFullYear() + "-" + ( rawToday.getMonth() +1 ) + "-" + rawToday.getDate();

    const rawToday = new Date();
    // const today = rawToday.getFullYear() + "-" + ( rawToday.getMonth() +1 ) + "-" + rawToday.getDate();

    let month = (someDate) => {
        const thisMonth = someDate.getMonth() + 1
        if ( thisMonth < 10 )  {

            return "0"+thisMonth
        
        } else {
        
            return thisMonth
        
        }
    }

    let day = (someDate) => {
        const thisDay = someDate.getDate()
        if ( thisDay < 10 )  {

            return "0"+thisDay
        
        } else {
        
            return thisDay
        
        }
    }

    const today = rawToday.getFullYear() + "-" + month(rawToday) + "-" + day(rawToday);

    const baseURL = `https://performancemanager5.successfactors.eu/sf/timesheet?bplte_company=SAP#/timerecords/11516741/${today}`;
    // const baseURL = `https://performancemanager5.successfactors.eu/sf/timesheet?bplte_company=SAP#/timerecords/11516741/2022-06-13`;
    
    await page.goto(baseURL);
    await page.waitForTimeout(3000);
    // debugger;

    await page.goto(baseURL);
    await page.waitForTimeout(3000);
    // debugger;
    
    // Selectors
    const selectorApplyTime = 'span[id="__component1---timeRecordingView--applyPlannedTimeBtnExpanded-content"]';
    const selectorAllowances = 'span[id="__component1---timeRecordingView--recordsAllowance--add-inner"]';
    const selectorUpdateTime = 'bdi[id="__component1---timeRecordingView--btnSaveTimeRecords-BDI-content"]';
    const selectorDay1 = 'tr[id="__item6-__component1---timeSheetSummaryView--daysSummaryTableFragement--daysSummaryTable-0"]';
    const selectorDay2 = 'tr[id="__item6-__component1---timeSheetSummaryView--daysSummaryTableFragement--daysSummaryTable-1"]';
    const selectorDay3 = 'tr[id="__item6-__component1---timeSheetSummaryView--daysSummaryTableFragement--daysSummaryTable-2"]';
    const selectorDay4 = 'tr[id="__item6-__component1---timeSheetSummaryView--daysSummaryTableFragement--daysSummaryTable-3"]';
    const selectorDay5 = 'tr[id="__item6-__component1---timeSheetSummaryView--daysSummaryTableFragement--daysSummaryTable-4"]';
    
    const selectorSubmitTime = 'bdi[id="__component1---timeSheetSummaryView--submitTimeSheetBtnExpanded-BDI-content"]';
    const selectorConfirmSubmission = 'bdi[id="__component1---timeSheetSummaryView--btnConfirmSubmitDialog-BDI-content"]';

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
    
    // Set d = 0 to start submitting time from Monday
    for ( let d = 0; d < arrayOfDays.length; d++ ) {

        await page.waitForTimeout(3000);
        await page.click(arrayOfDays[d]);
        await page.waitForTimeout(3000);
        await page.waitForSelector(selectorApplyTime);
        await page.click(selectorApplyTime);
        await page.waitForTimeout(8000);
        await page.waitForSelector(selectorAllowances);
        await page.click(selectorAllowances);
        await page.waitForTimeout(5000);
        // debugger;
        await page.click(selectorUpdateTime);
        await page.waitForTimeout(5000);

    }
    await page.click(selectorSubmitTime);
    await page.waitForTimeout(5000);
    debugger;
    await page.click(selectorConfirmSubmission);
    await page.waitForTimeout(5000);
    console.log("Timesheet successfully submitted");

};

submitTimesheet();