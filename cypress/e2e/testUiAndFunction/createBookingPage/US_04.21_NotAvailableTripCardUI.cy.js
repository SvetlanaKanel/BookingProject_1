/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const AGENT = Cypress.env('agent');
const createBookingPage = new CreateBookingPage();

describe('US_04.21 | Not available trip card UI', () => {

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        cy.viewport(1280, 720)
    })

    it('AT_04.21.01 | Verify the warning text displays', () => {

        createBookingPage
            .selectDepartureStation('Chonburi')

        createBookingPage
            .selectArrivalStation('Bangkok Khao San')

        createBookingPage
            .clickSaturdayButton()

        cy
            .get('.nothing')
            .should('be.visible')
            .and('have.text', 'Trips are not available. Try searching for another date or location.')
    })

});