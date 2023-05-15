/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage"
import BookingPopup from "../../../pageObjects/BookingPopup"
import AccountManagementPage from "../../../pageObjects/AccountManagementPage"
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel"
import getAmountFormat from "../../../support/utilities/getAmountFormat"

const createBookingPage = new CreateBookingPage()
const bookingPopup = new BookingPopup()
const leftMenuPanel = new LeftMenuPanel()
const accountManagementPage = new AccountManagementPage()

const BOOKING = require('../../../fixtures/createBookingPage.json')
const AGENT = Cypress.env('agent')

describe('Change of balance after booking', { tags: ['regression'] }, function () {

    before(() => {
        cy.cleanData()
        cy.loginWithSession(AGENT.email, AGENT.password)
        cy.visit('/');
        cy.intercept('POST', '/booking/', (req) => {
            if (req.body.includes('action=get-trips')) {
                req.alias = 'getTrip'
            }
            if (req.body.includes('action=book-ticket')) {
                req.alias = 'waitForBookedTicket'
            }
        });
        cy.intercept('POST', '/orders').as('getPopUp');

        leftMenuPanel.clickAccountManagementIcon()
        accountManagementPage.getBalanceAmountOnAccountManagementPage().should('include.text', '$')
        getAmountFormat(accountManagementPage.getBalanceAmountOnAccountManagementPage()).as('balanceBeforeBooking')
        leftMenuPanel.clickBookingIcon()

        createBookingPage.getBalanceAmountOnBookingPage().should('include.text', '$');
        getAmountFormat(createBookingPage.getBalanceAmountOnBookingPage()).as('ACB');
        cy.intercept('POST', '/booking/', (req) => {
            if (req.body.includes('action=get-balance')) {
                req.alias = 'getFinalBalance'
            }
        })
        createBookingPage.createCustomBooking(BOOKING.defaultBooking)
        cy.wait('@waitForBookedTicket')
        cy.wait('@getPopUp')
        cy.wait('@getFinalBalance')

        getAmountFormat(bookingPopup.getTotalSumm()).as('TTS');
        bookingPopup.getBookingDateWithTime().as('expectedBookingDate')
        bookingPopup.getBookingIDNumber().as('expectedBookingId')
        bookingPopup.getBookingNegativeFullTicketPrice().as('expectedNegativeBookingAmount')
        bookingPopup.clickCloseBtnBookingPopup()
    });

    it('CB_2.01 | Verify Credit balance after booking decrease correctly', function () {
        getAmountFormat(createBookingPage.getBalanceAmountOnBookingPage()).should('eq', Number(this.ACB - this.TTS)) 
    });

    it('CB_2.02 | Verify the Booking record (the date, the bookingId and the amount) BookingPopup page and Account Management page is equal for 1 passenger', function () {
        cy.intercept('POST', '/booking/', (req) => {
            if (req.body.includes('action=get-balance')) {
                req.alias = 'getBalance'
            }
        })
        leftMenuPanel.clickAccountManagementIcon()
        cy.wait('@getBalance')

        accountManagementPage.getBookingDateTime().should('have.text', this.expectedBookingDate)
        accountManagementPage.getBookingDescription().should('contain.text', this.expectedBookingId)
        getAmountFormat(accountManagementPage.getBookingAmount()).should('equal', this.expectedNegativeBookingAmount)
    })

    it('CB_2.03 | Verify Credit balance on account management page decreased correctly after booking', function () {
        getAmountFormat(accountManagementPage.getBalanceAmountOnAccountManagementPage()).should('eq', this.balanceBeforeBooking - this.TTS)
    });
});