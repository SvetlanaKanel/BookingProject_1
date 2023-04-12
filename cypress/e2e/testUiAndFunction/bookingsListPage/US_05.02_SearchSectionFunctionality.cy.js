/// <reference types="Cypress" />

import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from '../../../pageObjects/BookingPopup';
import getArray from "../../../support/utilities/getArray";
import { faker } from '@faker-js/faker';

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();
const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();
const AGENT = Cypress.env("agent");
const BOOKING = require('../../../fixtures/createBookingPage.json');
const randomWord = faker.word.adjective(5);

describe("US_05.02_Search section functionality", { tags: ['regression'] }, () => {

  beforeEach(function () {
    cy.fixture('createBookingPage').then(bookingData => {
        this.bookingData = bookingData;
    })

    cy.fixture('bookingsListPage').then(bookingsListPage => {
      this.bookingsListPage = bookingsListPage;
    })
  });

  before(() => {
    cy.cleanData();
    cy.loginWithSession(AGENT.email, AGENT.password);
    cy.visit("/");

    cy.intercept('POST', '/booking/', (req) => {
			if (req.body.includes('action=get-trips')) {
				req.alias = 'getTrip'
			}
			if (req.body.includes('action=book-ticket')) {
				req.alias = 'waitForBookedTicket'
			}
		})

    cy.intercept('POST', 'orders', (req) => {
      if (req.body.includes('action=get-booking')) {
      }
    }).as('getPopUp')
  
    const bookingsDetails = BOOKING.bookingDetails
    for (const bookingDetails of bookingsDetails) {
      createBookingPage.createCustomBooking(bookingDetails)
      cy.wait('@waitForBookedTicket')
      cy.wait('@getPopUp') 
      bookingPopup.clickCloseBtnBookingPopup()
    }
    cy.intercept('POST', 'orders', (req) => {
      if (req.body.includes('action=get-orders')) {
      }
    }).as('orders')
    leftMenuPanel.clickBookingManagementIcon();
    cy.wait('@orders').its('response.body').should('include', '"recordsTotal"')
    bookingsListPage.chooseCustomDatesRangeWithCount(-3, 3)
    cy.wait('@orders')
    bookingsListPage.getTableBodyRows()
      .should('have.length', 4)
  });

  it('AT_05.02.01 | Verify that the agent is able to enter data in Search input field and find booking', function () {
    cy.intercept('POST', 'orders', (req) => {
      if (req.body.includes('action=get-orders')) {
      }
    }).as('orders')

    bookingsListPage.typeInSearchField(`${this.bookingData.bookingDetails[2].passengerName}{enter}`)
    cy.wait('@orders').its('response.body').should('include', '"recordsTotal"')
    bookingsListPage.getTableBodyRows().filter(':visible')
      .should('have.length', 1)

    bookingsListPage.getTableHeadersColumnsList().then(($header) => {
      let tableHeaderArray = getArray($header)
      let indexOfContact = tableHeaderArray.indexOf(this.bookingsListPage.columns.contact[1])
      
      bookingsListPage.getTableBodyCells().then(($cell) => {
        let tableDataArray = getArray($cell)
        expect(tableDataArray[indexOfContact]).to.eq(this.bookingData.bookingDetails[2].passengerName)
      })
    })
  });

  it('AT_05.02.02 | Verify that the agent is able to enter data in Booking ID input field and find booking', function () {
    //Precondition
    cy.intercept('POST', '/booking/', (req) => {
			if (req.body.includes('action=get-trips')) {req.alias = 'getTrip'}
			if (req.body.includes('action=book-ticket')) {req.alias = 'waitForBookedTicket'}
		})

    cy.intercept('POST', 'orders', (req) => {
      if (req.body.includes('action=get-booking')) {
      }
    }).as('getPopUp')

    leftMenuPanel.clickBookingIcon()
    createBookingPage.createCustomBooking(this.bookingData.bookingDetailsTest)
    cy.wait('@waitForBookedTicket')
    cy.wait('@getPopUp')
    bookingPopup.getBookingID().then(($id) => {
      let bookingID = $id.text()
      bookingPopup.clickCloseBtnBookingPopup()
      cy.intercept('POST', '/orders', (req) => {
        if (req.body.includes('action=get-orders')) {
        }
      }).as('orders')
      leftMenuPanel.clickBookingManagementIcon()

      cy.wait('@orders').its('response.body').should('include', '"recordsTotal"')
      bookingsListPage.chooseCustomDatesRangeWithCount(-3, 3)
      cy.wait('@orders')
      bookingsListPage.getTableBodyRows()
        .should('have.length', 5)
      
      bookingsListPage.typeInBookingIDField(`${bookingID}{enter}`)
      cy.wait('@orders')
      bookingsListPage.getTableBodyRows().filter(':visible')
        .should('have.length', 1)

      bookingsListPage.getTableHeadersColumnsList().then(($header) => {
        let tableHeaderArray = getArray($header)
        let indexOfID = tableHeaderArray.indexOf(this.bookingsListPage.columns.id[1])
        
        bookingsListPage.getTableBodyCells().then(($cell) => {
          let tableDataArray = getArray($cell)
          expect(tableDataArray[indexOfID]).to.eq(bookingID)
        })
      })
    })
  });

  it("AT_05.02.03.01| Verify the Clear anchor is clickable and removes all input data from the placeholder field Search", () => {
    bookingsListPage.typeInSearchField(randomWord);
    bookingsListPage.clickClearLink();

    bookingsListPage.getSearchField().should("be.empty");
  });

  it('AT_05.02.04 | Verify that the agent is able to select route in Route filter dropdown menu and find bookings for this route', function () {
    cy.intercept('POST', 'orders', (req) => {
      if (req.body.includes('action=get-orders')) {
      }
    }).as('orders')
    
    leftMenuPanel.clickBookingManagementIcon()
    cy.wait('@orders').its('response.body').should('include', '"recordsTotal"')
    bookingsListPage.chooseCustomDatesRangeWithCount(-3, 3)
    cy.wait('@orders')
    bookingsListPage.getTableBodyRows()
      .should('have.length', 5)

    bookingsListPage.selectRoute(this.bookingData.bookingDetails[3].route)
    cy.wait('@orders')
    bookingsListPage.getTableBodyRows().filter(':visible')
      .should('have.length', 1)

    bookingsListPage.getTableHeadersColumnsList().then(($header) => {
      let tableHeaderArray = getArray($header)
      let indexOfRoute = tableHeaderArray.indexOf(this.bookingsListPage.columns.route[1])
        
      bookingsListPage.getTableBodyCells().then(($cell) => {
        let tableDataArray = getArray($cell)
        expect(tableDataArray[indexOfRoute])
          .to.eq(this.bookingData.bookingDetails[3].departureStationName + " → " + this.bookingData.bookingDetails[3].arrivalStationName)
      })
    })
  });
});
