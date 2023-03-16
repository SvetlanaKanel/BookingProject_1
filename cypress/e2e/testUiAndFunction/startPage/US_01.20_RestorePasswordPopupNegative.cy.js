/// <reference types="cypress"/>

import {StartPage} from "../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../pageObjects/StartPage.js";
import {RestorePopup} from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();
const restorePopup = new RestorePopup();

describe ('US_01.20 | Start Page > Restore Password Negative', { tags: ['regression'] }, function () {
    beforeEach(function () {
        cy.then(Cypress.session.clearCurrentSessionData);
        cy.visit('/');
        startPage.clickLoginButton();
        loginPopup.clickForgotYourPasswordLink();

        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });
    });

    it('AT_01.20.01 | Verify that the user is not able to restore the password with empty Email input', function() {
        restorePopup.clickRestoreButton();
        restorePopup
            .getEnterEmailAlert()
            .should('be.visible')
            .and('have.text', this.startPage.alert.restorePasswordPopup.enterEmailAlert);
    });

    it('AT_01.20.03 | Verify that the error message Wrong email is displayed with two @ signs at the Email input', function() {
        restorePopup.enterEmail(this.startPage.data.invalidEmail);
        restorePopup.clickRestoreButton();
        restorePopup.getEnterEmailAlert()
            .should('be.visible')
            .and('have.text', this.startPage.alert.restorePasswordPopup.wrongEmail);

    });

    it('AT_01.20.02 | Verify that the user is not able to restore the password with a missing domain at the Email input', function() {
        restorePopup.enterEmail(this.startPage.dataInvalid.missingDomainEmail);
        restorePopup.clickRestoreButton();
        restorePopup.getEnterEmailAlert()
            .should('be.visible')
            .and('have.text', this.startPage.alert.restorePasswordPopup.wrongEmail);
    });

    it('AT_01.20.04 | Verify that the error message Wrong email is displayed without @ sign and the domain name at the Email input', function() {
        restorePopup.enterEmail(this.startPage.dataInvalid.missingDomainAndAtSignEmail);
        restorePopup.clickRestoreButton();
        restorePopup.getEnterEmailAlert()
            .should('be.visible')
            .and('have.text', this.startPage.alert.restorePasswordPopup.wrongEmail);
    });
});