/// <reference types="Cypress" />

import BookingPopup from "../../../pageObjects/BookingPopup";
import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import { faker } from '@faker-js/faker';

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');
const randomFirstName = faker.name.firstName();
const randomLastName = faker.name.lastName();
const randomFullName = `${randomFirstName} ${randomLastName}`;
const randomEmail = faker.internet.email(randomFirstName, randomLastName, 'qatest.site');
const randomPhoneNumber = faker.phone.number('61#######');
const randomNotes = faker.random.words();
const bookingPopup = new BookingPopup();

describe('US_04.32 | Total functionality', () => {
    before(() => {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
    });

    beforeEach(() => {
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

    it('AT_04.32.02| Verify that after pressing the button “Reset” all the information is erased from the booking',() => {
        createBookingPage.typeIntoMainPassengerNameField(randomFullName)
        createBookingPage.typeIntoMainPassengerEmailField(randomEmail)
        createBookingPage.typeIntoMainPassengerPhoneField(randomPhoneNumber)
        createBookingPage.typeNotesInputField(randomNotes)
        createBookingPage.clickResetButton()
        createBookingPage.getMainPassengerNameField().should('be.empty')
        createBookingPage.getEmailInputField().should('be.empty')
        createBookingPage.getMainPassengerPhoneField().should('be.empty')
        createBookingPage.getNotesInputField().should('be.empty')
    })

    it('AT_04.32.03 | Verify that the "Book tickets" button is clickable',() =>{
        createBookingPage.typeIntoMainPassengerNameField(randomFullName)
        createBookingPage.typeIntoMainPassengerEmailField(randomEmail)
        createBookingPage.typeIntoMainPassengerPhoneField(randomPhoneNumber)
        createBookingPage.typeNotesInputField(randomNotes)
        createBookingPage.clickBookTicketsBtn()
        bookingPopup.getBookingPopupWindow().should('be.visible');
    })
})
