/// <reference types="Cypress" />

import Header from "../../../../pageObjects/Header";
import LeftMenuPanel from "../../../../pageObjects/LeftMenuPanel";

const header = new Header();
const leftMenuPanel = new LeftMenuPanel();

describe('US_02.02 header burger menu functionality', () => {
    const AGENT = Cypress.env('agent');

    beforeEach(function() {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    })    

    it('TC_02.02.01 Link names on the left side panel revealed after clicking on the burger menu', () => {
        leftMenuPanel.getBookingNameLink().should('not.be.visible')
        leftMenuPanel.getBookingManagementNameLink().should('not.be.visible');
        leftMenuPanel.getAccountManagementNameLink().should('not.be.visible');
        leftMenuPanel.getContactUsNameLink().should('not.be.visible');
        header.clickBurgerMenu();

        leftMenuPanel.getBookingNameLink().should('be.visible')
        leftMenuPanel.getBookingManagementNameLink().should('be.visible');
        leftMenuPanel.getAccountManagementNameLink().should('be.visible');
        leftMenuPanel.getContactUsNameLink().should('be.visible');        
    })
})