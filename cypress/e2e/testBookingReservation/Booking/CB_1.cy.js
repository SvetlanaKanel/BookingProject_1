/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from "../../../pageObjects/BookingPopup";
import Header from "../../../pageObjects/Header";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();
const header = new Header();

const BOOKING = require('../../../fixtures/createBookingPage.json');
const AGENT = Cypress.env('agent');


describe('Popup window parameters verification after the booking was completed', { tags: ['regression'] }, function () {

    before(() => {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
    
        createBookingPage.createCustomBooking(BOOKING.defaultBooking);
    });
    
    beforeEach(function () {
        cy.fixture('bookingPopup').then(bookingPopup => {
            this.bookingPopup = bookingPopup;
        });
    });
    
    it('CB_1.01 | Verify Booking status is Pending', function () {
        bookingPopup.getBookingStatus().should('contain', this.bookingPopup.bookingStatus);
    });

    it('CB_1.06 | Verify Ticket price', function () {
        bookingPopup.getTicketsPrice().should('have.text', this.bookingPopup.defaultBookingDetails.price)
        bookingPopup.getFirstFareTypePrice().should('have.text', this.bookingPopup.defaultBookingDetails.price)
        bookingPopup.getTotalPrice().should('have.text', this.bookingPopup.defaultBookingDetails.price)
    });

    it('CB_1.02 | Verify Booking date is equal to current Thailand date (DD-MMM-YY)', () => {        
        const currentDate = bookingPopup.getCurrentDateInThailand();

        bookingPopup.getBookingDateWithoutTime().should('eq', currentDate);
    });

    it("CB_1.10 | Verify that the Channel field has Agent's name", function() {
        header.getAgentName().then($el => {
            const agentName = $el.text().split(':')[0];

            bookingPopup.getChannelField().should('have.text', agentName);
        }) 
    })

    it("CB_1.03 | Verify Trip Details record such as Route is equal to features data", function() {
        bookingPopup.getBookingRoute().should('have.text', this.bookingPopup.defaultBookingDetails.route)
    });
})
