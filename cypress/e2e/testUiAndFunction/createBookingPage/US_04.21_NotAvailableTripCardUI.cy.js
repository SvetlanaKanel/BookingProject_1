/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const AGENT = Cypress.env('agent');
const createBookingPage = new CreateBookingPage();

describe('US_04.21 | Not available trip card UI', () => {

    before(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        cy.viewport(1280, 720)
    })

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
    })

    it('AT_04.21.01 | Verify the warning text displays', function () {

        createBookingPage
            .selectDepartureStation('Chonburi')

        createBookingPage
            .selectArrivalStation('Bangkok Khao San')

        createBookingPage
            .clickSaturdayButton()

        cy
            .get('.nothing')
            .should('be.visible')
            .and('have.text', this.createBookingPage.warningTexts.notAvailableTripText)
    })

});
