/// <reference types = "Cypress" />

import CreateBookingPage from "../../../../pageObjects/CreateBookingPage.js";

const createBookingPage = new CreateBookingPage();

describe('US_04.13 | Create booking page > Departure date > Month dropdown UI and functionality', () => {
    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        createBookingPage.clickMonthBtn();
    })

    it('AT_04.13.01 | Month dropdown menu (to the left of the Week button) has 13 months for selection', () => {
       createBookingPage.getMonthDropdownList().should('have.length', 13);       
    })
})