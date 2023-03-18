/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import BookingsListPage from "../../../pageObjects/BookingsListPage";
import BookingPopup from "../../../pageObjects/BookingPopup";

const createBookingPage = new CreateBookingPage();
const leftMenuPanel = new LeftMenuPanel();
const bookingsListPage = new BookingsListPage();
const bookingPopup = new BookingPopup();

const BOOKING = require('../../../fixtures/createBookingPage.json');
const AGENT = Cypress.env('agent');

describe('US_05.16 | Buttons section UI and funtionality', () => {
    
    before(() => {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        
        //Precondition
        createBookingPage.createBooking(BOOKING.inputField.main_passenger.name, 1, BOOKING.dropdowns.fareType.fareTypesNames[0])
        leftMenuPanel.clickBookingManagementIcon()
    }); 

    beforeEach(function () {
        cy.fixture('bookingPopup').then(bookingPopup => {
            this.bookingPopup = bookingPopup;
        });
    });

      it('AT_05.16.01 | Verify that after clicking any booking ID line a pop-up window with booking/trip details appears', function() {
        bookingsListPage.clickFirstRowBokTkt()
        bookingPopup.getBookingDetailsTitle().should('have.text', this.bookingPopup.sectionsPopup[0])
      });
});