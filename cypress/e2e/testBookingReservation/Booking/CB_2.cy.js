/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage"
import BookingPopup from "../../../pageObjects/BookingPopup"
import AccountManagementPage from "../../../pageObjects/AccountManagementPage"
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel"

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
        cy.visit('/')

        cy.intercept('POST', 'booking', (req) => {
            if (req.body.includes('action=get-trips')) {
            }
          }).as('getTrip')
        createBookingPage.createCustomBooking(BOOKING.defaultBooking)

        bookingPopup.getBookingDateWithTime().as('expectedBookingDate')
        bookingPopup.getBookingIDNumber().as('expectedBookingId')
        bookingPopup.getBookingNegativeFullTicketPrice().as('expectedNegativeBookingAmount')

    });

    it('CB_2.02 | Verify the Booking record (the date, the bookingId and the amount) BookingPopup page and Account Management page is equal for 1 passenger', function () {
        bookingPopup.clickCloseBtnBookingPopup()
        leftMenuPanel.clickAccountManagementIcon()

        accountManagementPage.getBookingDateTime().should('have.text', this.expectedBookingDate)
        accountManagementPage.getBookingDescription().should('contain.text', this.expectedBookingId)
        accountManagementPage.getBookingAmount().should('have.text', this.expectedNegativeBookingAmount)
    })

})
