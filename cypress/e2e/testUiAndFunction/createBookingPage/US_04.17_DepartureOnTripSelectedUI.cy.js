/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage.js";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.17 | Departure on trip selected UI', { tags: ['smoke'] }, function () {

    before(function () {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        cy.intercept('POST', '/booking/', (req) => {
            if (req.body.includes('action=get-trips')) {
            }
        }).as('getTrip')
        createBookingPage.clickCalendarNextButton();
        cy.wait('@getTrip').its('response.body').should('include', 'trip')
        cy.wait(500)
        createBookingPage.clickFirstTripCard();
    });

    beforeEach(function () {
        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData;
        })

        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
    });

    it('AT_04.17.01 | Verify "Selected Date" label has text color #00a65a, background-color #edf8ed, font-size: 150%', function () {
        createBookingPage.getLabelDepartureOnDate()
            .should('have.css', 'color', this.colors.greenBookingPage)
            .and('have.css', 'background-color', this.colors.lightGreenBookingPage)
            .and('have.css', 'font-size', this.bookingData.selectedDateLabel.front_size)
    });
});
