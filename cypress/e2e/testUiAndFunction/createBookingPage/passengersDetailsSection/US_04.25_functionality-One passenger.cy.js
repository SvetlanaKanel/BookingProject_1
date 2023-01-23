/// <reference types="Cypress" />

import {PassengersDetailsSection} from "../../../../pageObjects/CreateBookingPage.js";

const passengersDetailsSection = new PassengersDetailsSection();

describe('US_04.25 | functionality - One passenger', () => {
    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.fixture('createBookingPage/inputField').then(passengers => {
            this.passengers = passengers;
        })
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    })

    it('AT_04.25.01 | Verify the opportunity to fill main passengers name in "Passenger name" input field', function () {
        passengersDetailsSection.getMainPassengerField()
            .type(this.passengers.main_passenger.name)
            .should('have.value', this.passengers.main_passenger.name)          
    })
})
