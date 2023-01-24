/// <reference types="cypress"/>


describe('US_01.01 | Multilanguage section elements UI and functionality', () => {
    beforeEach(function () {
        cy.visit('/');
    })
    it ('TC_01.01.05| Start page >Multilanguage Section > British flag icon is visible and clicable', ()=>{
        cy.get('.en').should('be.visible')
    })
    
});