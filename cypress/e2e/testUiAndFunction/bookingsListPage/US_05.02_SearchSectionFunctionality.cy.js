/// <reference types="Cypress" />

import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from '../../../pageObjects/BookingPopup';
import getArray from "../../../support/utilities/getArray";
import { faker } from '@faker-js/faker';
import getCustomCalendarDate from "../../../support/utilities/getCustomCalendarDate";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();
const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();
const AGENT = Cypress.env("agent");
const BOOKING = require('../../../fixtures/createBookingPage.json');
const randomWord = faker.word.adjective(5);

function chooseCustomDatesRangeWithCount (startDayCount, endDayCount) {
  let startDate = bookingsListPage.getDateOnly(bookingsListPage.DD_MMCommaYYYYFormat(getCustomCalendarDate(startDayCount)))
  let startMonth = bookingsListPage.getMonthOnly(bookingsListPage.DD_MMCommaYYYYFormat(getCustomCalendarDate(startDayCount)))
  let startYear = bookingsListPage.getYearOnly(bookingsListPage.DD_MMCommaYYYYFormat(getCustomCalendarDate(startDayCount)))
  let endDate = bookingsListPage.getDateOnly(bookingsListPage.DD_MMCommaYYYYFormat(getCustomCalendarDate(endDayCount)))
  let endMonth = bookingsListPage.getMonthOnly(bookingsListPage.DD_MMCommaYYYYFormat(getCustomCalendarDate(endDayCount)))
  let endYear = bookingsListPage.getYearOnly(bookingsListPage.DD_MMCommaYYYYFormat(getCustomCalendarDate(endDayCount)))
  bookingsListPage.clickDrdnDatesRangeArrow()
  bookingsListPage.clickDrdnDatesRangeCustomRange()
  bookingsListPage.clickCustomDates(startDate, startMonth, startYear, endDate, endMonth, endYear)
}

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

    cy.intercept('/tools/ping/**').as('getPopUp')
    cy.intercept('POST', 'orders').as('orders')
    const bookingsDetails = BOOKING.bookingDetails
    for (const bookingDetails of bookingsDetails) {
      createBookingPage.createCustomBooking(bookingDetails)
      cy.wait('@getPopUp') 
      bookingPopup.clickCloseBtnBookingPopup()
    }
    
    leftMenuPanel.clickBookingManagementIcon();
    cy.wait('@orders')
  });

  it("AT_05.02.03.01| Verify the Clear anchor is clickable and removes all input data from the placeholder field Search", () => {
    bookingsListPage.typeInSearchField(randomWord);
    bookingsListPage.clickClearLink();

    bookingsListPage.getSearchField().should("be.empty");
  });

  it.skip('AT_05.02.01 | Verify that the agent is able to enter data in Search input field and find booking', function () {
    //Precondition
    leftMenuPanel.clickBookingIcon()
    cy.intercept('POST', 'orders').as('orders')
    createBookingPage.createCustomBooking(this.bookingData.bookingDetailsTest1)
    cy.intercept('/tools/ping/**').as('getPopUp')
    cy.wait('@getPopUp') 
    bookingPopup.clickCloseBtnBookingPopup()
    leftMenuPanel.clickBookingManagementIcon()

    chooseCustomDatesRangeWithCount(-3, 3)
    cy.wait('@orders')
    bookingsListPage.getTableBodyRows().should('have.length', 3)

    bookingsListPage.typeInSearchField(`${this.bookingData.bookingDetailsTest1.passengerName}{enter}`)
    bookingsListPage.getTableHeadersColumnsList().then(($header) => {
      let tableHeaderArray = getArray($header)
      let indexOfContact = tableHeaderArray.indexOf(this.bookingsListPage.columns.contact[1])
      
      bookingsListPage.getTableBodyCells().then(($cell) => {
        let tableDataArray = getArray($cell)
        expect(tableDataArray[indexOfContact]).to.eq(this.bookingData.bookingDetailsTest1.passengerName)
      })
    })
  });

  it.skip('AT_05.02.02 | Verify that the agent is able to enter data in Booking ID input field and find booking', function () {
    //Precondition
    leftMenuPanel.clickBookingIcon()
    cy.intercept('POST', 'orders').as('orders')
    createBookingPage.createCustomBooking(this.bookingData.bookingDetailsTest2)
    cy.intercept('/tools/ping/**').as('getPopUp')
    cy.wait('@getPopUp')
    bookingPopup.getBookingID().then(($id) => {
      let bookingID = $id.text()
      bookingPopup.clickCloseBtnBookingPopup()
      leftMenuPanel.clickBookingManagementIcon()

      chooseCustomDatesRangeWithCount(-3, 3)
      cy.wait('@orders')
      bookingsListPage.getTableBodyRows().should('have.length', 4)
      
      bookingsListPage.typeInBookingIDField(`${bookingID}{enter}`)
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

  it.skip('AT_05.02.04 | Verify that the agent is able to select route in Route filter dropdown menu and find bookings for this route', function () {
    //Precondition
    leftMenuPanel.clickBookingIcon()
    cy.intercept('POST', 'orders').as('orders')
    createBookingPage.createCustomBooking(this.bookingData.bookingDetailsTest3)
    cy.intercept('/tools/ping/**').as('getPopUp')
    cy.wait('@getPopUp') 
    bookingPopup.clickCloseBtnBookingPopup()
    leftMenuPanel.clickBookingManagementIcon()

    chooseCustomDatesRangeWithCount(-3, 3)
    cy.wait('@orders')
    bookingsListPage.getTableBodyRows().should('have.length', 5)

    bookingsListPage.selectRoute(this.bookingData.bookingDetailsTest3.route)
    bookingsListPage.getTableHeadersColumnsList().then(($header) => {
      let tableHeaderArray = getArray($header)
      let indexOfRoute = tableHeaderArray.indexOf(this.bookingsListPage.columns.route[1])
        
      bookingsListPage.getTableBodyCells().then(($cell) => {
        let tableDataArray = getArray($cell)
        expect(tableDataArray[indexOfRoute])
          .to.eq(this.bookingData.bookingDetailsTest3.departureStationName + " → " + this.bookingData.bookingDetailsTest3.arrivalStationName)
      })
    })
  });
});
