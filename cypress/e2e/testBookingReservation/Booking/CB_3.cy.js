/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from "../../../pageObjects/BookingPopup";
import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import Header from "../../../pageObjects/Header";
import getArray from "../../../support/utilities/getArray";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();
const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();
const header = new Header();

const BOOKING = require('../../../fixtures/createBookingPage.json');
const AGENT = Cypress.env('agent');

describe('Booking management', function () {

    beforeEach(function () {
        cy.fixture('createBookingPage').then(bookingData => {
           this.bookingData = bookingData;
       });

       cy.fixture('bookingsListPage').then(bookingsListPage => {
           this.bookingsListPage = bookingsListPage;
       });

       cy.fixture('bookingPopup').then(bookingPopup => {
           this.bookingPopup = bookingPopup;
       });
    });

    before(() => {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');

        cy.intercept('POST', '/booking/', (req) => {
			if (req.body.includes('action=get-trips')) {
            }
        }).as('getTrip');

        cy.intercept('POST', '/booking/?get-layout').as('getLayout')

        cy.intercept('POST', 'orders', (req) => {
            if (req.body.includes('action=get-booking')) {
            }
        }).as('getPopUp');
        
        cy.intercept('POST', 'orders', (req) => {
            if (req.body.includes('action=get-orders')) {
            }
        }).as('orders');

        const passengerNames = BOOKING.defaultBooking.passengerName
        const fareTypes = BOOKING.defaultBooking.fareType
        const passengerAmount = 1
        header.getAgentNameText().as('agentName')
        createBookingPage.clickOnAvailableTripCard()

        createBookingPage.getTimeOfDepartureSelectedTripCardText().as('timeOfDeparture')
        createBookingPage.getLabelDepartureOnDateText().as('departureOnDate')
        createBookingPage.getVehicleClassSelectedTripCardText().as('vehicle')
        createBookingPage.getPassengerSeatNumberText().as('seatNumber')
        createBookingPage.chooseBookingInfoAndBookTickets(passengerNames, passengerAmount, fareTypes)
        cy.wait('@getPopUp')

        bookingPopup.getBookingIDNumber().as('bookingID')
        bookingPopup.getBookingDateWithTime().as('bookingDate')
        bookingPopup.getBookingStatusText().as('bookingStatus')
        bookingPopup.getFirstPassengerNameText().as('bookingContact')
        bookingPopup.clickCloseBtnBookingPopup()

        leftMenuPanel.clickBookingManagementIcon()
        cy.wait('@orders')
        bookingsListPage.chooseCustomDatesRangeWithCount(-1, 2)
        cy.wait('@orders')
        bookingsListPage.clickColumnsSettingButton()
        bookingsListPage.checkAllColumnsCheckbox()
        bookingsListPage.clickColumnsOkButton()
        cy.wait('@orders')
    });
 
    it('CB_3.01 | Verify record in Bookings management (all columns) for default booking and 1 passenger', function () {
        bookingsListPage.getTableHeadersColumnsList().then(($header) => {
            let tableHeaderArray = getArray($header)
            let indexOfID = tableHeaderArray.indexOf(this.bookingsListPage.columns.id[1])
            let indexOfBookingDate = tableHeaderArray.indexOf(this.bookingsListPage.columns.bookingDate[1])
            let indexOfRoute = tableHeaderArray.indexOf(this.bookingsListPage.columns.route[1])
            let indexOfDepartureDate = tableHeaderArray.indexOf(this.bookingsListPage.columns.departureDate[1])
            let indexOfDepartureTime = tableHeaderArray.indexOf(this.bookingsListPage.columns.departureTime[1])
            let indexOfVehicle = tableHeaderArray.indexOf(this.bookingsListPage.columns.vehicle[1])
            let indexOfChannelAgent = tableHeaderArray.indexOf(this.bookingsListPage.columns.channelAgent[1])
            let indexOfSeats = tableHeaderArray.indexOf(this.bookingsListPage.columns.seats[1])
            let indexOfNumbers = tableHeaderArray.indexOf(this.bookingsListPage.columns.numbers[1])
            let indexOfContact = tableHeaderArray.indexOf(this.bookingsListPage.columns.contact[1])
            let indexOfPriceUsd = tableHeaderArray.indexOf(this.bookingsListPage.columns.priceUsd[1])
            let indexOfStatus = tableHeaderArray.indexOf(this.bookingsListPage.columns.status[1])
            let indexOfExpire = tableHeaderArray.indexOf(this.bookingsListPage.columns.expire[1])
            let indexOfNotes = tableHeaderArray.indexOf(this.bookingsListPage.columns.notes[1])

            bookingsListPage.getTableBodyCells().then(($cell) => {
              let tableDataArray = getArray($cell)
              expect(tableDataArray[indexOfID]).to.eq(this.bookingID)
              expect(tableDataArray[indexOfBookingDate]).to.eq(this.bookingDate)
              expect(tableDataArray[indexOfRoute]).to.eq(this.bookingData.defaultBooking.departureStationName + " → " + this.bookingData.defaultBooking.arrivalStationName)
              expect(tableDataArray[indexOfDepartureDate]).to.eq(this.departureOnDate)
              expect(tableDataArray[indexOfDepartureTime]).to.eq(this.timeOfDeparture)
              expect(tableDataArray[indexOfVehicle]).to.eq(this.vehicle)
              expect(tableDataArray[indexOfChannelAgent]).to.eq(this.agentName)
              expect(tableDataArray[indexOfSeats]).to.eq(this.bookingData.defaultBooking.passengerAmount)
              expect(tableDataArray[indexOfNumbers]).to.eq(this.seatNumber)
              expect(tableDataArray[indexOfContact]).to.eq(this.bookingData.defaultBooking.passengerName)
              expect(`${tableDataArray[indexOfPriceUsd]} USD`).to.eq(this.bookingData.defaultBooking.price)
              expect(tableDataArray[indexOfStatus].trim()).to.eq(this.bookingStatus)
              expect(tableDataArray[indexOfExpire]).to.eq('')
              expect(tableDataArray[indexOfNotes]).to.eq('')
            })
          })
    });

    it('CB_3.02 | Verify that the booking ticket has the correct ID', function () {
        bookingsListPage.getIdColums().each($el => {
            if ($el.text() == this.bookingID) {
                cy.wrap($el).click()
            }
        })

        bookingPopup.getBookingID().then($el => {
            expect($el.text()).to.eq(this.bookingID)
        })
    });

    it('CB_3.03 | Verify that the booking ticket has the correct Booking date', function () {
        bookingPopup.getBookingDate().then($el => {
            expect($el.text()).to.eq(this.bookingDate)
        })
    });

    it('CB_3.04 | Verify that the booking ticket has the correct Departure date', function () {
       bookingPopup.getDepartureDate().then($el => {
            expect($el.text()).to.eq(this.departureOnDate)
        })
    });

    it('CB_3.06 | Verify that the booking ticket has the correct Route', function () {
        bookingsListPage.getBookingRoute().then($el => {
             expect($el.text()).to.eq(this.bookingData.defaultBooking.departureStationName + " → " + this.bookingData.defaultBooking.arrivalStationName)
         })
     });

    it('CB_3.07 | Verify that the booking ticket has the correct Vehicle', function () {
        bookingPopup.getBookingVehicle().then($el => {
             expect($el.text()).to.eq(this.vehicle)
         })
     });
      
     it('CB_3.08 | Verify that the booking ticket has the correct seat number', function () {
        bookingPopup.getBookingPassengerSeatNumber().then($el => {
             expect($el.text()).to.eq(this.seatNumber)
         })
     });

     it('CB_3.09 | Verify that the booking ticket has the correct Contact', function () {
        bookingPopup.getFirstPassengerName().then($el => {
            expect($el.text()).to.eq(this.bookingContact)
        })
     });
    
     it('CB_3.15 | Verify that the booking ticket has the correct Departure time', function () {
        bookingPopup.getDepartureTime().then($el => {
             expect($el.text()).to.eq(this.timeOfDeparture)
         })
     });
     
});