/// <reference types="cypress"/>

import {StartPage} from "../../../../pageObjects/StartPage.js";
import {RegisterPopup} from "../../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const registerPopup = new RegisterPopup();

describe('US_01.15 | Start Page > Register Agent Negative', function() {
    
    beforeEach(function() {
        cy.visit('https://qatest.site/');
        startPage.clickRegisterAccountLink();

        cy.fixture('startPage/registerAgent').then(newAgent => {
            this.newAgent = newAgent
        });
        cy.fixture('startPage/alert').then(errorMessage => {
            this.errorMessage = errorMessage
        });
    });

    it('AT_01.15.01 | Error message is displayed when trying to register without entering name', function()  {
        registerPopup.enterCompanyName(this.newAgent.companyName)
        registerPopup.enterEmail(this.newAgent.email)
        registerPopup.enterPhoneNumber(this.newAgent.phone)
        registerPopup.clickRegisterButton()
        registerPopup.getErrorMessage()
                     .should('be.visible')
                     .and('have.text',this.errorMessage.registerEmptyName)
    });

});
