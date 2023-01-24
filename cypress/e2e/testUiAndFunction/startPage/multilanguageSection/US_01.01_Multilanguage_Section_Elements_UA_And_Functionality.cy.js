/// <reference types="cypress"/>
import {StartPage} from "../../../../pageObjects/StartPage.js";
const startPage = new StartPage();


describe('US_01.01 | Multilanguage section elements UI and functionality', () => {
    beforeEach(function () {
        cy.visit('/');
    })
    it ('TC_01.01.05| Start page >Multilanguage Section > British flag icon is visible and clicable', ()=>{
        startPage.getBritishFlagIcon().should('be.visible')
    })
    
});
