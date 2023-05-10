/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import getAmountFormat from "../../../support/utilities/getAmountFormat";

const createBookingPage = new CreateBookingPage();

const BOOKING = require('../../../fixtures/createBookingPage.json');
const AGENT = Cypress.env('agent')

describe('The balance after reservation', { tags: ['regression'] }, function() {
    
    before(() => {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');

        createBookingPage.getBalanceAmountOnBookingPage().should('include.text', '$');       
        getAmountFormat(createBookingPage.getBalanceAmountOnBookingPage()).as('balanceBeforeReservation'); 

        let numberOfPassengers = BOOKING.defaultBooking.passengerAmount;
        let passengerName = BOOKING.defaultBooking.passengerName;
        let passengerFareTypes = BOOKING.defaultBooking.fareType;

        createBookingPage.reserveSecondTripDefaultDay(numberOfPassengers, passengerName, passengerFareTypes);
    });   

    it('CR_2.01 | Verify Credit balance after reservation does not change', function() {
        getAmountFormat(createBookingPage.getBalanceAmountOnBookingPage()).should('be.equal', this.balanceBeforeReservation);
    })
})
