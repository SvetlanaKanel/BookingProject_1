/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from "../../../pageObjects/BookingPopup";


const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();
const AGENT = Cypress.env('agent');


beforeEach(function () {
    cy.cleanData();
    cy.loginWithSession(AGENT.email, AGENT.password);
    cy.visit('/');

    cy.fixture('createBookingPage').then(bookingData => {
        this.bookingData = bookingData;
    });

    cy.fixture('bookingPopup').then(bookingPopup => {
        this.bookingPopup = bookingPopup;
    });
})

describe('Popup window parameters verification after the booking was completed', { tags: ['regression'] }, function () {

    it('AT_CB_1.01 | Verify Booking status is Pending', function () {
        const filteredPassengers = this.bookingData.passengers.filter((passenger) => passenger.fareType === 'elder' );
        const passengerNames = filteredPassengers.map((passenger) => passenger.name);
        const elderFareTypes = filteredPassengers.map((passenger) => passenger.fareType);
        const passengerAmount = 2;
    
        createBookingPage.createBooking(passengerNames, passengerAmount, elderFareTypes)

        bookingPopup.getBookingStatus().should('contain', this.bookingPopup.bookingStatus);
    });

    it('CB_1.06 | Verify Ticket price', function () {
        createBookingPage.createCustomBooking(this.bookingData.defaultBooking)

        bookingPopup.getTicketsPrice().should('have.text', this.bookingPopup.defaultBookingDetails.price)
        bookingPopup.getFirstFareTypePrice().should('have.text', this.bookingPopup.defaultBookingDetails.price)
        bookingPopup.getTotalPrice().should('have.text', this.bookingPopup.defaultBookingDetails.price)
    });
})
