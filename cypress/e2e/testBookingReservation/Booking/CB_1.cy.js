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
        header.getAgentNameText().as('agentName');
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
        
        bookingPopup.getChannelField().should('have.text', this.agentName);   
    })

    it("CB_1.03 | Verify Trip Details record such as Route is equal to features data", function() {
        bookingPopup.getBookingRoute().should('have.text', this.bookingPopup.defaultBookingDetails.route)
    });

    it("CB_1.07 | Verify Trip Details record such as Vehicle is equal to features data.", function() {
        bookingPopup.getBookingVehicle().should('have.text', this.bookingPopup.defaultBookingDetails.vehicle)
    });

    it("CB_1.14 | Verify the Passenger name is correct", function() {
        bookingPopup.getFirstPassengerName().should('have.text', this.bookingPopup.defaultBookingDetails.passengerName)
    });   
    
    it("CB_1.16 | Verify the number Seat is equel", function() {
        bookingPopup.getBookingPassengerSeat().should('have.text', this.bookingPopup.defaultBookingDetails.passengerSeat)
    });     

    it("CB_1.15 | Verify the Notes/Remark is empty", function() {
        bookingPopup.getNotesRemarkField().should('be.empty')
    }); 
})
