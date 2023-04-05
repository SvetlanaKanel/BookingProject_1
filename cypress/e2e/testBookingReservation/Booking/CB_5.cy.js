/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();
const BOOKING_DATA = require('../../../fixtures/createBookingPage.json');

describe('Agent with 0 balance cannot book ticket', { tags: ['regression'] }, function () {

    before(() => {
        cy.loginWithSession(BOOKING_DATA.agentZeroEmail, BOOKING_DATA.agentZeroPassword);
        cy.visit('/');
    });

    it('CB_5.01 | Verify agent cannot book a ticket with 0 balance', function () {
        createBookingPage.getBalanceAmountOnBookingPage().should("have.text", BOOKING_DATA.zeroBalance)
        createBookingPage.clickSecondTripCard()
        createBookingPage.typeIntoMainPassengerNameField(BOOKING_DATA.passengers[0].name)
        createBookingPage.clickBookTicketsBtn()
        cy.on('window:alert', (msg) => {
            expect(msg).to.eq(BOOKING_DATA.alertZeroBalance)
        })
    });

})
