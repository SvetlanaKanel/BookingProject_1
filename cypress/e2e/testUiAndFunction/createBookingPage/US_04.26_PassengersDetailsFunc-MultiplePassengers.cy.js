/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage.js";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.26 | Passengers details functionality - Multiple passengers', { tags: ['smoke', 'regression'] }, () => { 

    const chosenAmountPassengers = 4

    before(() => {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        cy.intercept('POST', '/booking/', (req) => {
            if (req.body.includes('action=get-trips')) {
            }
        }).as('getTrip');
        //Precondition
        createBookingPage.clickCalendarNextButton();
        cy.wait('@getTrip').its('response.body').should('include', 'trip')
        createBookingPage.clickFirstTripCard();
        createBookingPage.selectAmountPassengersDetailsDropdown(chosenAmountPassengers)
    });

    beforeEach(function () {
        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData;
        });
    });

    it('AT_04.26.01 | Verify the agent is able to select the number of passengers', function() {
        createBookingPage.getAmountOfChosenPass().then($el => {
            const amountPassengersListDetails = $el.toArray().length

            expect(amountPassengersListDetails).to.eql(chosenAmountPassengers)
        })
    });

    it('AT_04.26.02 | Verify the agent is able to enter the second and following passengers name', function() {
        createBookingPage.getExtraPassengerNameField().each($el => {
            cy.wrap($el).type(this.bookingData.inputField.main_passenger.name)

            cy.wrap($el).should('have.value', this.bookingData.inputField.main_passenger.name)
                .and('be.visible')
        })
    });

    it('AT_04.26.03 | Verify the agent is able to select the second and following passenger"s fare type', function() {
        createBookingPage.getExtraFareTypeData().each($el => {
            cy.wrap($el).select(this.bookingData.dropdowns.fareType.fareTypesNames[1], { force: true })         
        })

        createBookingPage.getExtraFareTypeDrop().each($el => {
            cy.wrap($el).should('have.text', this.bookingData.dropdowns.fareType.fareTypesNames[1])
            .and('be.visible')
        })
    });

    it('AT_04.26.04 | Verify that only one passenger is removed by clicking the "Remove passenger" button', function() {
        createBookingPage.clickRemovePassengerBtn(1)

        createBookingPage.getAmountOfChosenPass().should('have.length', chosenAmountPassengers - 1)
    });

    describe('AT_04.26.05 | Verify all info about main passenger is not deleted after selecting different number of passengers', () => {

        beforeEach(() => {
            createBookingPage.selectAmountPassengersDetailsDropdown(1)            
        });

        it('Verify Main passenger name input field data', function() {
            createBookingPage.typeIntoMainPassengerNameField(this.bookingData.inputField.main_passenger.name)
            createBookingPage.selectAmountPassengersDetailsDropdown(chosenAmountPassengers)

            createBookingPage.getMainPassengerNameField()
                .should('have.value', this.bookingData.inputField.main_passenger.name)           
        });
        
        it('Verify Main passenger phone country code data', function() {
            createBookingPage.selectCountryPhoneCode(this.bookingData.inputField.main_passenger.country)
            createBookingPage.selectAmountPassengersDetailsDropdown(chosenAmountPassengers)

            createBookingPage.getSelectedDialCode()
                .should('have.text', this.bookingData.inputField.main_passenger.phoneCountryCode)
        });

        it('Verify Main passenger phone number input field data', function() {
            createBookingPage.typeIntoMainPassengerPhoneField(this.bookingData.inputField.main_passenger.phone)
            createBookingPage.selectAmountPassengersDetailsDropdown(chosenAmountPassengers)

            createBookingPage.getMainPassengerPhoneField()
                .should('have.value', this.bookingData.inputField.main_passenger.phone)
        });

        it('Verify Main passenger Email input field data', function() {
            createBookingPage.typeIntoMainPassengerEmailField(this.bookingData.inputField.main_passenger.email)
            createBookingPage.selectAmountPassengersDetailsDropdown(chosenAmountPassengers)

            createBookingPage.getEmailInputField()
                .should('have.value', this.bookingData.inputField.main_passenger.email)
        });
        
        it('Verify Main passenger Fare type dropdown data', function() {
            createBookingPage.selectFareTypeMainPassenger(this.bookingData.dropdowns.fareType.fareTypesNames[2])
            createBookingPage.selectAmountPassengersDetailsDropdown(chosenAmountPassengers)
      
            createBookingPage.getMainPassengerFareTypeDropdownSelect()
                .should('have.value', this.bookingData.dropdowns.fareType.fareTypesNames[2].toLowerCase())
        });
    });
});