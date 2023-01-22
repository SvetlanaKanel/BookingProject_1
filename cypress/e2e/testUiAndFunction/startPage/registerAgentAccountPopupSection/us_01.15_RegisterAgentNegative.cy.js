/// <reference types="cypress"/>

import {StartPage} from "../../../../pageObjects/StartPage.js";
import {RegisterPopup} from "../../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const registerPopup = new RegisterPopup();

describe('US_01.15 Register Agent Negative', function() {
    
    beforeEach(function() {
        cy.visit('/');
        startPage.clickRegisterAccountLink();

        cy.fixture('startPage/inputField').then(inputField => {
            this.inputField = inputField
        });
        cy.fixture('startPage/alert').then(errorMessage => {
            this.errorMessage = errorMessage
        });
    });

    it('AT_01.15.01 | Error message is displayed when trying to register without entering name', function()  {
        registerPopup.enterCompanyName(this.inputField['Company name'])
        registerPopup.enterEmail(this.inputField.Email)
        registerPopup.enterPhoneNumber(this.inputField['Phone number'])
        registerPopup.clickRegisterButton()
        registerPopup.getErrorMessage()
                     .should('be.visible')
                     .and('have.text',this.errorMessage.registerEmptyName)
    });

});
