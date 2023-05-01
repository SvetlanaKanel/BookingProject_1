/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from "../../../pageObjects/BookingPopup";
import Header from "../../../pageObjects/Header";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();
const header = new Header();

const BOOKING = require('../../../fixtures/createBookingPage.json');
const AGENT = Cypress.env('agent')

describe('Popup window parameters verification after the reservation was completed', { tags: ['regression'] }, function() {

    before(() => {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');

        let numberOfPassengers = BOOKING.defaultBooking.passengerAmount;
        let passengerName = BOOKING.defaultBooking.passengerName;
        let passengerFareTypes = BOOKING.defaultBooking.fareType;

        createBookingPage.reserveSecondTripDefaultDay(numberOfPassengers, passengerName, passengerFareTypes)
    });

    beforeEach(function() {
        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData;
        })
        cy.fixture('bookingPopup').then(bookingPopUpData => {
            this.bookingPopUpData = bookingPopUpData;
        })
        header.getAgentNameText().as('agentName');
    })

    it('CR_1.01 | Verify Reservation status is Reserved', function() {
        bookingPopup.getBookingStatus().should('have.text', 'Reserved');
    })

    it('CR_1.02 | Verify Reservation date is equal to current Thailand date (DD-MMM-YY)', function() {
        const currentDate = bookingPopup.getCurrentDateInThailand();

        bookingPopup.getBookingDateWithoutTime().should('eq', currentDate);
    })

    it("CR_1.03 | Verify that the Channel field has Agent's name", function() {       
        
           bookingPopup.getChannelField().should('have.text', this.agentName);               
    })

    it('CR_1.04 | Verify Trip Details records - Route field is equal to features data', function() {
        const route = this.bookingPopUpData.defaultBookingDetails.route;

        bookingPopup.getBookingRoute().should('have.text', route);
    })

    it('CR_1.08 | Verify Arrival time field is equal to features data', function() {
        bookingPopup.getArrivalTime().should('have.text', this.bookingPopUpData.defaultBookingDetails.arrivalSecondTripTime);
    })

    it('CR_1.09 | Verify Departure station field is equal to features data', function() {
        bookingPopup.getBookingDepartureStation().should('have.text', this.bookingPopUpData.defaultBookingDetails.departureStation);
    })

    it('CR_1.10 | Verify Arrival station field is equal to features data', function() {
        bookingPopup.getBookingArrivalStation().should('have.text', this.bookingPopUpData.defaultBookingDetails.arrivalStation);
    })

    it('CR_1.07 | Verify Departure time field is equal to features data', function () {
        bookingPopup.getDepartureTime().should('have.text', this.bookingPopUpData.defaultBookingDetails.departureSecondTripTime);
    })

    it('CR_1.11 | Verify the quantity of passengers is equal to features data', function() {
        bookingPopup.getPassengerTitle().should('include.text', this.bookingPopUpData.defaultBookingDetails.quantity);
    })

    it('CR_1.12 | Verify fare type is adult (default data)', function() {
        bookingPopup.getOnePassengerTypeLabel().should('contain', this.bookingPopUpData.defaultBookingDetails.fareType);
    })

    it("CR_1.13 | Verifay passenger's name is equal to features data", function() {
        bookingPopup.getFirstPassengerName().should('have.text', this.bookingPopUpData.defaultBookingDetails.passengerName);
    })

    it ('CR_1.14 | Verify Message to operator is equal to features data', function() {
        bookingPopup.getBookingBtnMessageToOperator().should('include.text', this.bookingPopUpData.messageToOperator);
    })

    it('CR_1.15 | Verify Ticket price', function () {
        bookingPopup.getTicketsPrice().should('have.text', this.bookingData.defaultBooking.price)
        bookingPopup.getFirstFareTypePrice().should('have.text', this.bookingData.defaultBooking.price)
        bookingPopup.getTotalPrice().should('have.text', this.bookingData.defaultBooking.price)
    })
})

 