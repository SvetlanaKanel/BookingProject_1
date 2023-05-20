/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from "../../../pageObjects/BookingPopup";
import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import Header from "../../../pageObjects/Header";
import getArray from "../../../support/utilities/getArray";

import { defaultBooking } from "../../../fixtures/createBookingPage.json";
import { columns } from "../../../fixtures/bookingsListPage.json";
import { status, confirmMessage } from "../../../fixtures/bookingPopup.json";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();
const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();
const header = new Header();

const BOOKING = require('../../../fixtures/createBookingPage.json');
const AGENT = Cypress.env('agent');

describe('Booking management', { tags: ['regression'] }, function () {
    
    before(() => {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');

        cy.intercept('POST', '/booking/?get-layout').as('getLayout');

        cy.intercept('POST', '/booking/', (req) => {
			if (req.body.includes('action=get-trips')) {
            }
        }).as('getTrip');

        cy.intercept('POST', '/orders', (req) => {
            if (req.body.includes('action=get-booking')) {
            }
        }).as('getPopUp');

        cy.intercept('POST', '/orders', (req) => {
            if (req.body.includes('action=get-orders')) {
            }
        }).as('orders');

        let numberOfPassengers = BOOKING.defaultBooking.passengerAmount;
        let passengerName = BOOKING.defaultBooking.passengerName;
        let passengerFareTypes = BOOKING.defaultBooking.fareType;
        header.getAgentNameText().as('agentName')
        createBookingPage.clickOnAvailableTripCard()

        createBookingPage.getTimeOfDepartureSelectedTripCardText().as('timeOfDeparture')
        createBookingPage.getLabelDepartureOnDateText().as('departureOnDate')
        createBookingPage.getVehicleClassSelectedTripCardText().as('vehicle')
        createBookingPage.getPassengerSeatNumberText().as('seatNumber')
        createBookingPage.reserveAvailableTrip(numberOfPassengers, passengerName, passengerFareTypes);
        cy.wait('@getPopUp');

        bookingPopup.getBookingIDNumber().as('bookingID');
        bookingPopup.getBookingDateWithTime().as('bookingDate');
        bookingPopup.getBookingStatusText().as('bookingStatus');
        bookingPopup.getFirstPassengerNameText().as('bookingContact');
        bookingPopup.getFormatTimeFromTimer().as('timeExpire');
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

    it('CR_3.01 | Verify record in Bookings management (all columns) for default reservation and 1 passenger', function () {
        bookingsListPage.getTableHeadersColumnsList().then(($header) => {
            let tableHeaderArray = getArray($header)
            let indexOfID = tableHeaderArray.indexOf(columns.id[1])
            let indexOfBookingDate = tableHeaderArray.indexOf(columns.bookingDate[1])
            let indexOfRoute = tableHeaderArray.indexOf(columns.route[1])
            let indexOfDepartureDate = tableHeaderArray.indexOf(columns.departureDate[1])
            let indexOfDepartureTime = tableHeaderArray.indexOf(columns.departureTime[1])
            let indexOfVehicle = tableHeaderArray.indexOf(columns.vehicle[1])
            let indexOfChannelAgent = tableHeaderArray.indexOf(columns.channelAgent[1])
            let indexOfSeats = tableHeaderArray.indexOf(columns.seats[1])
            let indexOfNumbers = tableHeaderArray.indexOf(columns.numbers[1])
            let indexOfContact = tableHeaderArray.indexOf(columns.contact[1])
            let indexOfPriceUsd = tableHeaderArray.indexOf(columns.priceUsd[1])
            let indexOfStatus = tableHeaderArray.indexOf(columns.status[1])
            let indexOfExpire = tableHeaderArray.indexOf(columns.expire[1])
            let indexOfNotes = tableHeaderArray.indexOf(columns.notes[1])

            bookingsListPage.getTableBodyCells().then(($cell) => {
              let tableDataArray = getArray($cell)
              expect(tableDataArray[indexOfID]).to.eq(this.bookingID)
              expect(tableDataArray[indexOfBookingDate]).to.eq(this.bookingDate)
              expect(tableDataArray[indexOfRoute]).to.eq(defaultBooking.departureStationName + " → " + defaultBooking.arrivalStationName)
              expect(tableDataArray[indexOfDepartureDate]).to.eq(this.departureOnDate)
              expect(tableDataArray[indexOfDepartureTime]).to.eq(this.timeOfDeparture)
              expect(tableDataArray[indexOfVehicle]).to.eq(this.vehicle)
              expect(tableDataArray[indexOfChannelAgent]).to.eq(this.agentName)
              expect(tableDataArray[indexOfSeats]).to.eq(defaultBooking.passengerAmount)
              expect(tableDataArray[indexOfNumbers]).to.eq(this.seatNumber)
              expect(tableDataArray[indexOfContact]).to.eq(defaultBooking.passengerName)
              expect(`${tableDataArray[indexOfPriceUsd]} USD`).to.eq(defaultBooking.price)
              expect(tableDataArray[indexOfStatus].trim()).to.eq(this.bookingStatus)
              expect(tableDataArray[indexOfExpire]).to.include(this.timeExpire)
              expect(tableDataArray[indexOfNotes]).to.eq('')
            })
          })
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

    //This test should be the last one in the describe
    it('CR_3.04 | Verify that agent can confirm reservation and book ticket', function () {
        cy.intercept('POST', '/orders', (req) => {
            if (req.body.includes('action=get-booking')) {
                req.alias = 'getBookingPopup'
            }
            if (req.body.includes('action=get-orders')) {
                req.alias = 'getOrders'
            }
        })
        let statusReserved = status[0]
        let statusPending = status[1]

        bookingPopup.clickCloseBtnBookingPopup()
        let indexOfStatus
        bookingsListPage.getTableHeadersColumnsList().then(($header) => {
            let tableHeaderArray = getArray($header)
            indexOfStatus = tableHeaderArray.indexOf(columns.status[1])

            bookingsListPage.getTableBodyCells().then(($cell) => {
                let tableDataArray = getArray($cell)
                expect(tableDataArray[indexOfStatus].trim()).to.eq(statusReserved)
            })
        })

        bookingsListPage.getTableBodyRows().contains(this.bookingID).click()
        cy.wait('@getBookingPopup').its('response.body').should('include', 'RESERVED')

        bookingPopup.clickConfirmTicketButton()
        cy.on('window:confirm', (str) => {
            expect(str).to.equal(confirmMessage)
        })
        cy.wait('@getBookingPopup').its('response.body').should('include', 'PENDING')
        
        bookingPopup.clickCloseBtnBookingPopup()
        cy.wait('@getOrders')
        
        bookingsListPage.getTableBodyCells().then(($cell) => {
            let tableDataArray = getArray($cell)
            expect(tableDataArray[indexOfStatus].trim()).to.eq(statusPending)
        })
    });
});