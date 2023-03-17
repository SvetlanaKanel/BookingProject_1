import CreateBookingPage from "../../pageObjects/CreateBookingPage";
import BookingPopup from "../../pageObjects/BookingPopup";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();

const AGENT = Cypress.env('agent')

describe('US_AC.08 | ACTIONS > Extend reservation', { tags: ['regression'] }, function () {
    beforeEach(function () {
        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData;
        })
        cy.fixture('bookingPopup').then(bookingPopUpData => {
            this.bookingPopUpData = bookingPopUpData;
        })

        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
    })

    it('AT_AC.08.01 | Extend one time and verify the time counter in the text field "This reservation will expire in" is updated and starts counting down from 00:15:00', function () {
        let numberOfPassengers = 1;
        let passengerName = this.bookingData.inputField.main_passenger.name;
        let passengerFareTypes = this.bookingData.dropdowns.fareType.fareTypesNames[0];
        createBookingPage.reserveSecondTripDefaultDay(numberOfPassengers, passengerName, passengerFareTypes);

        bookingPopup.clickBtnExtend();

        bookingPopup.getTimeFromTimer().then(extendTime => {
            expect(extendTime).to.be.below(15);
            expect(extendTime).to.be.above(14);
        })
    })

    it('AT_AC.08.02 | Extend one time and verify the field Notes / Remarks has the text  "Agent DD-MM-YYYY HH:MM: reservation extended: 15 minutes', function () {
        cy.intercept('/tools/**').as('getToolsPing');
        let numberOfPassengers = 1;
        let passengerName = this.bookingData.inputField.main_passenger.name;
        let passengerFareTypes = this.bookingData.dropdowns.fareType.fareTypesNames[0];
        createBookingPage.reserveSecondTripDefaultDay(numberOfPassengers, passengerName, passengerFareTypes);

        bookingPopup.clickBtnExtend();

        bookingPopup.getChannelField().then($el => {
            let agentName = $el.text();           
            let formatterdDateAndTime = bookingPopup.getCurrentDateAndTimeInTailand();          
            let expectedNotesRemarkText = agentName + " " + formatterdDateAndTime + this.bookingPopUpData.notesRemark;
            cy.log(expectedNotesRemarkText);

            bookingPopup.getNotesRemarkField().should('have.text', expectedNotesRemarkText);
        })
    })
})
