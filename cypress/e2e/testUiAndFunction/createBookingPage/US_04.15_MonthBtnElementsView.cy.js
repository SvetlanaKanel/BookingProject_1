/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');
describe('US_04.15 | Create booking page > Month button elements view', () => {

    before(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        createBookingPage.clickMonthBtn();
    })

    it('AT_04.15.01 Month button is visible, has the attribute "selected" and its background color is #00a65a( rgb(0, 166, 90) )', () => {
        createBookingPage.getMonthBtn()
            .should('be.visible')
            .and('have.class', 'selected')
            .and('have.css', 'background-color', 'rgb(0, 166, 90)');
    })
});