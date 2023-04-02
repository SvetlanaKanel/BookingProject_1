/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.27 | Passengers dropdown UI', { tags: ['smoke'] }, () => {
    
    before(() => {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        cy.intercept('POST', '/booking/', (req) => {
            if (req.body.includes('action=get-trips')) {
            }
        }).as('getTrip');
        //Precondition
        createBookingPage.clickCalendarNextButton();
        cy.wait('@getTrip').its('response.body').should('include', 'trip')  
        createBookingPage.clickFirstTripCard();
    });

    beforeEach(function () {
        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
    });

    it('AT_04.27.01 | Verify the color of the text in the passengers dropdown menu', function () {
        createBookingPage.getPassengersDetailsDropdown()
            .should('be.visible')
            .and('have.css', 'color', this.colors.greenBookingPage);
    });
});