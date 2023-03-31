/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import { faker } from '@faker-js/faker';

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');
const randomFirstName = faker.name.firstName();
const randomLastName = faker.name.lastName();
const randomFullName = `${randomFirstName} ${randomLastName}`;
const randomEmail = faker.internet.email(randomFirstName, randomLastName, 'qatest.site');
const randomPhoneNumber = faker.phone.number('#########');

describe('US_04.32 | Total functionality', () => {
    before(() => {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        cy.intercept('POST', '/booking/', (req) => {
            if (req.body.includes('action=get-trips')) {
            }
        }).as('getTrip')
        createBookingPage.clickCalendarNextButton()
        cy.wait('@getTrip').its('response.body').should('include', 'trip') 
        createBookingPage.clickOnFirstAvailableTripCard()
    });

    it('AT_04.32.01 | Verify that the "Reset" button is clickable',() => {
        createBookingPage.typeIntoMainPassengerNameField(randomFullName)
        createBookingPage.clickResetButton()
        createBookingPage.getMainPassengerNameField().should('be.empty')
    })
})
