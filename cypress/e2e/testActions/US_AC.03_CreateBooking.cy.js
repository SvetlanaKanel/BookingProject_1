/// <reference types="Cypress" />

import CreateBookingPage from "../../pageObjects/CreateBookingPage"
import BookingPopup from "../../pageObjects/BookingPopup"
import waitForToolsPing from '../../support/utilities/waitForToolsPing'

const createBookingPage = new CreateBookingPage()
const bookingPopup = new BookingPopup()

const MANAGER = Cypress.env('manager')
const AGENT = Cypress.env('agent')
const CI = Cypress.env('CI')

describe('US_AC.03 | Create booking for 1 passenger', () => {

    beforeEach(function () {
        cy.cleanCiData(MANAGER.email, MANAGER.password, CI)

        cy.visit('/')
        cy.login(AGENT.email, AGENT.password)

        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage
        })
    })

    it('AT_AC.03.01| Create booking for 1 passenger: Adult', function () {
        const passengerName = this.createBookingPage.passengers[0].name
        const adultFareType = this.createBookingPage.passengers.find((passenger) => passenger.fareType === 'adult').fareType
        const passengerAmount = 1

        createBookingPage.createBooking(passengerName, passengerAmount, adultFareType)
        waitForToolsPing()

        bookingPopup.getBookingDetailsTitle().contains('Booking details');
        bookingPopup.getFirstFareType().contains('Adult');
    })
})
