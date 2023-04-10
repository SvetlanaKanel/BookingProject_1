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

describe(' Booking management', function () {

    before(() => {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');

        createBookingPage.createCustomBooking(BOOKING.defaultBooking);
    });

    it('CB_3.02 | Verify that the booking ticket has the correct ID', function () {
        let id
        bookingPopup.getBookingID().then(el => {
            id = el.text()            
        })

        bookingPopup.clickCloseBtnBookingPopup()
        leftMenuPanel.clickBookingManagementIcon()
        bookingsListPage.getIdColums().each($el => {
            if ($el.text() == id) {
                cy.wrap($el).click()
            }
        })

        bookingPopup.getBookingID().then($el => {
            expect($el.text()).to.eq(id)
        })
    });

});