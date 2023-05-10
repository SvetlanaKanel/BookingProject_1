/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from "../../../pageObjects/BookingPopup";
import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();
const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();

const BOOKING = require('../../../fixtures/createBookingPage.json');
const AGENT = Cypress.env('agent');

describe('Booking management', { tags: ['regression'] }, function () {
    
    before(() => {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');

        cy.intercept('POST', 'orders', (req) => {
            if (req.body.includes('action=get-booking')) {
            }
        }).as('getPopUp');

        cy.intercept('POST', 'orders', (req) => {
            if (req.body.includes('action=get-orders')) {
            }
        }).as('orders');

        let numberOfPassengers = BOOKING.defaultBooking.passengerAmount;
        let passengerName = BOOKING.defaultBooking.passengerName;
        let passengerFareTypes = BOOKING.defaultBooking.fareType;

        createBookingPage.reserveSecondTripDefaultDay(numberOfPassengers, passengerName, passengerFareTypes);
        cy.wait('@getPopUp');

        bookingPopup.getBookingIDNumber().as('bookingID');
        bookingPopup.getBookingDateWithTime().as('bookingDate');
        bookingPopup.clickCloseBtnBookingPopup();

        leftMenuPanel.clickBookingManagementIcon();
        cy.wait('@orders');
        bookingsListPage.chooseCustomDatesRangeWithCount(-1, 2);
        cy.wait('@orders');
        bookingsListPage.clickColumnsSettingButton();
        bookingsListPage.checkAllColumnsCheckbox();
        bookingsListPage.clickColumnsOkButton();
        cy.wait('@orders');
    });

    it('CR_3.03 | Verify that the reservation ticket has the correct Reservation date', function () {
        bookingsListPage.getIdColums().each($el => {
            if ($el.text() == this.bookingID) {
                cy.wrap($el).click();
            };
        });

        bookingPopup.getBookingDate().then($el => {
            expect($el.text()).to.eq(this.bookingDate);
        });
    });
});