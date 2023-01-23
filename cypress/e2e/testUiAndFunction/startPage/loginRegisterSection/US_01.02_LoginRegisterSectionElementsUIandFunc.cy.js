/// <reference types="Cypress" />

import { StartPage } from "../../../../pageObjects/StartPage";

const startPage = new StartPage();

describe('US_01.02 | Login-register section elements UI and functionality', () => {

    beforeEach(function () {
        cy.fixture('startPage/links').then(links => {
            this.links = links;
        });

		cy.visit('/')
	});

    it('AT_01.02.01 | Verify Link "Register account now": visible and have text "Register account now"', function () {
        startPage
        .getRegisterAccountLink()
        .should('be.visible')
        .and('have.text', this.links.registerAccountNowEnglishText);
    });
})