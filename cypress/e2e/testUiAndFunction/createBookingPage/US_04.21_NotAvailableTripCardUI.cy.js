/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

describe('US_04.21 | Not available trip card UI', () => {
    const AGENT = Cypress.env('agent');

    before(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);

        createBookingPage.selectDepartureStation('Chonburi')
        createBookingPage.selectArrivalStation('Bangkok Khao San')
        createBookingPage.clickSaturdayButton()
    })

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })

        cy.fixture('colors').then(colors => {
            this.colors = colors;
        })
    })

    it('AT_04.21.01 | Verify the warning text displays', function () {
        cy
            .get('.nothing')
            .should('be.visible')
            .and('have.text', this.createBookingPage.warningTexts.notAvailableTripText)
    })

    it('AT_04.21.02 | Verify that block has background-color: #F6EAEA and solid border-color: #B84D4D', function () {
        cy
            .get('.nothing')
            .should('have.css', 'background-color', this.colors.redWarningBg)
            .and('have.css', 'border-color', this.colors.redWarningBorder)
            .and('have.css', 'border-style', 'solid')
    })

});