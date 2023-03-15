/// <reference types="Cypress" />

import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();

function formatDate(date) {
    const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' }
    return date.toLocaleString('en-US', optionsDate)
        .replace(/(\S{3}).(\d{1,2})(.).(\d{4})/, "$2 $1$3 $4")
}

describe('US_05.04 | Date filter functionality', { tags: ['regression'] }, () => {

    const AGENT = Cypress.env('agent')

    beforeEach(function () {
        cy.fixture('bookingsListPage').then(bookingsListPage => {
            this.bookingsListPage = bookingsListPage;
        })
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');

        //Precondition
        leftMenuPanel.clickBookingManagementIcon()
    });

    it('AT_05.04.01 Verify that the "filterDateType" dropdown is clickable', function() {  
        bookingsListPage.clickDateRangeType()
    });

    it('AT_05.04.03 | Verify that the Agent can switch and choose from "By purchase date" to "By departure date"', function() {
        bookingsListPage.getDateRangeTypeDefault('include.text', this.bookingsListPage.view);
    });

    it('AT_05.04.05 | Verify calendar dates are correct if clicking on corresponding date from date range dropdown menu', () => {
        let arrayOfDatesRange = [bookingsListPage.today(), bookingsListPage.tommorow(),
                                bookingsListPage.yesterday(), bookingsListPage.nextWeek(),
                                bookingsListPage.lastWeek(), bookingsListPage.lastThirtyDays(),
                                bookingsListPage.nextMonth(), bookingsListPage.thisMonth(),
                                bookingsListPage.lastMonth()]
        
        bookingsListPage.getDrpdDatesRangeList().each(($el, i) => {
            bookingsListPage.clickDrdnDatesRangeArrow() 
            if ($el.text() == 'Custom Range') {
                return false
            }
            cy.wrap($el).click()

            bookingsListPage.getDrdnDatesRangeValue().then(($el) => {
                expect($el.text()).to.eq(arrayOfDatesRange[i])
            })
        })
    })

    it('AT_05.04.06 | Verify custom range dates match chosen custom range dates (week back - week forward from current date)', () => {
        let getWeekForwardDates = bookingsListPage.getEndDateFromDatesRange(bookingsListPage.nextWeek())
        let startDate = bookingsListPage.getDateOnly(bookingsListPage.getWeekBackDates())
        let startMonth = bookingsListPage.getMonthOnly(bookingsListPage.getWeekBackDates())
        let startYear = bookingsListPage.getYearOnly(bookingsListPage.getWeekBackDates())
        let endDate = bookingsListPage.getDateOnly(getWeekForwardDates)
        let endMonth = bookingsListPage.getMonthOnly(getWeekForwardDates)
        let endYear = bookingsListPage.getYearOnly(getWeekForwardDates)
       
        bookingsListPage.clickDrdnDatesRangeArrow()
        bookingsListPage.clickDrdnDatesRangeCustomRange()
        bookingsListPage.chooseCustomDatesRange(startDate, startMonth, startYear, endDate, endMonth, endYear)

        bookingsListPage.getDrdnDatesRangeValue().then(($el) => {
            expect($el.text()).to.eq(bookingsListPage.formattedDatesRangeDD_MMCommaYYYY(bookingsListPage.getWeekBackDates(), getWeekForwardDates))
        })
    })
});