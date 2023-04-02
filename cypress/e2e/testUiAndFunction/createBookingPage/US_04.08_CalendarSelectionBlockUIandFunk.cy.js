/// <reference types="Cypress" />

import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import startAndEndOfWeek from "../../../support/utilities/getStartAndEndOfTheWeek";

const leftMenuPanel = new LeftMenuPanel();
const createBookingPage = new CreateBookingPage();

const AGENT = Cypress.env('agent');

const getDateAndMonth = (el) => el.text().split('-')[0]

describe('US_04.08 | Calendar-selection block UI  week/month view', { tags: ['smoke'] }, () => {
    before(() => {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        leftMenuPanel.clickBookingIcon();
    });

    it('AT_04.08.03 | Verify that Label is present for week view', () => {
        createBookingPage.getLabelCalendar().should('be.visible');
    });

    it('AT_04.08.09 | Verify that Arrows is present for week view', () => {
        createBookingPage
            .getWeekButton().should('have.class', 'selected');
        createBookingPage.getCalendarPrevButton().should('be.visible');
        createBookingPage.getCalendarNextButton().should('be.visible');
    });

    it('AT_04.08.01 | Verify that Label is present for month view', () => {
        createBookingPage.clickMonthBtn();
        createBookingPage.getLabelCalendar().should('be.visible')
    });

    it('AT_04.08.10 | Verify that Arrows is present for month view', () => {
        createBookingPage.getMonthBtn().should('have.class', 'selected');
        createBookingPage.getCalendarPrevButton().should('be.visible');
        createBookingPage.getCalendarNextButton().should('be.visible');
    });
});

describe('US_04.08 | Calendar-selection block functionality week/month view', { tags: ['smoke', 'regression'] }, () => {
    beforeEach(function () {    
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        leftMenuPanel.clickBookingIcon();

        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData;
        });
    });

    it.skip('AT_04.08.04 | Verify that Click forward arrow works and switches month in correct order', () => {
        const date = new Date();
        date.setDate(date.getDate() + 2)
        createBookingPage.clickMonthBtn();
        for (let i = 0; i < 12; i++) {
            createBookingPage.clickCalendarNextButton();
            createBookingPage.getLabelCalendar().then(($label) => {
                const text = $label.text();
                expect(text).to.deep.equal(createBookingPage.getNextMonth(date));
            });
        }
    });

    it('AT_04.08.05 | Verify previous arrow button switches calendar-week label', () => {
        createBookingPage.clickCalendarNextButton();
        createBookingPage.getLabelCalendar().then(($el) => {
            let mondayWeekAhead = getDateAndMonth($el);
            createBookingPage.clickCalendarPrevButton();

            createBookingPage.getLabelCalendar().then(($el) => {
                expect($el.text()).to.eq(createBookingPage.getPreviousWeekMonSundDays(mondayWeekAhead));
            });
        })
    });

    it.skip('AT_04.08.06 | Verify that Click back arrow works and switches month in correct order', () => {
        createBookingPage.clickMonthBtn();
        const date = new Date()
        date.setDate(date.getDate() + 2)
        date.setMonth(date.getMonth() + 12);
        for (let i = 1; i <= 12; i++) {
            createBookingPage.clickCalendarNextButton();
        }
        for (let i = 12; i > 1; i--) {
            createBookingPage.clickCalendarPrevButton();
            createBookingPage.getLabelCalendar().then(($label) => {
                const text = $label.text();
                expect(text).to.deep.equal(createBookingPage.getPreviousMonth(date));
            });
        }
    });

    it.skip('AT_04.08.02 | Verify that Calendar Lable  shows week range in correct format from Monday to Sunday', () => {
        const date = new Date()
        let avalableForBookingDay = date.setDate(date.getDate() + 2);
        for (let i = 0; i < 10; i++) {
            createBookingPage.getLabelCalendar().then(($label) => {
                let text = $label.text();
                expect(text).to.deep.equal(startAndEndOfWeek(avalableForBookingDay))

                avalableForBookingDay = date.setDate(date.getDate() + 7);
                createBookingPage.clickCalendarNextButton();
            });
        }
    });

    it('AT_04.08.08 | Verify that back arrow click does not show the elapsed month', function () {
        createBookingPage.clickMonthBtn();
        createBookingPage.clickCalendarPrevButton();
        createBookingPage.getLabelCalendar().then(($label) => {
            let text = $label.text();
            expect(text).to.deep.equal(createBookingPage.getCurrentMonthAndYear())
        });
    });

    it.skip('AT_04.08.07 | Verify that back arrow click does not show elapsed week', function () {
        createBookingPage.clickCalendarPrevButton();
        createBookingPage.getMondayButton().then(($monday) => {
            let openedWeekMonday = $monday.text();
            expect(openedWeekMonday).to.deep.equal(createBookingPage.getCurrentMonday());
        });
    });

    it('AT_04.08.11 | Verify that month format label is "Oct 2023"', function () {
        createBookingPage.clickMonthBtn();
        createBookingPage.selectMonthFromMonthDropdown(this.bookingData.oct);
        createBookingPage.getLabelCalendar().should('include.text', this.bookingData.oct2023);
    });

    it('AT_04.08.12 | Verify that week format label is "2 Oct - 8 Oct"', function ()  {
        createBookingPage.clickMonthBtn();
        createBookingPage.selectMonthFromMonthDropdown(this.bookingData.oct);

        createBookingPage.clickgetOctoberMondayButton();

        createBookingPage.clickWeekBtn();
        createBookingPage.getLabelCalendar().should('include.text', this.bookingData.octWeek);
    });
});