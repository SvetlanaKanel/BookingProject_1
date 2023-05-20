/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from "../../../pageObjects/BookingPopup";


const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();

const AGENT = Cypress.env('agent');


describe('All trip card statuses (fully booked)', { tags: ['regression'] }, function () {

	beforeEach(function () {
		cy.cleanData();
		cy.loginWithSession(AGENT.email, AGENT.password);
		cy.visit('/');
		cy.intercept('POST', '/booking/', (req) => {
			if (req.body.includes('action=get-trips')) {
				req.alias = 'getTrip'
			}
			if (req.body.includes('action=book-ticket')) {
				req.alias = 'waitForBookedTicket'
			}
		})
		cy.intercept('POST', '/booking/?get-layout').as('getLayout')
		cy.intercept('POST', '/orders').as('getPopUp')

		cy.fixture('createBookingPage').then(bookingData => {
			this.bookingData = bookingData;
		})
	});

	it('CB_6.01 | Verify agent can not book ticket for the trip "Bangkok Khao -Phuket Town" if trip card status is "Fully booked"', function () {
		const passengerNames = this.bookingData.namesForVipBusTrip
		const fareTypes = this.bookingData.fareTypesVipBusTrip
		const passengerAmount = 24

		createBookingPage.selectDepartureStation(this.bookingData.dropdowns.departureStation.stationsNames[2])
		createBookingPage.selectArrivalStation(this.bookingData.dropdowns.arrivalStation.stationsNames[3])
		cy.wait('@getTrip').its('response.body').should('include', 'trip')
		createBookingPage.getTripClassDropdown().select(this.bookingData.tripClass.VIP_Bus)
		createBookingPage.clickOnAvailableTripCard()
		createBookingPage.getNumberSeatsAvailableTripCard().filter(':visible').each(($el) => {
			expect($el.text()).to.include('24')
		 })
		createBookingPage.getTimeOfDepartureSelectedTripCard().then(($time) => {
			let timeOfDeparture = $time.text()

			createBookingPage.chooseBookingInfoAndBookTickets(passengerNames, passengerAmount, fareTypes)
			cy.wait('@getTrip').its('response.body').should('include', 'trip')
			cy.wait('@waitForBookedTicket').its('response.body').should('include', '"message":"Booking confirmed!"')
			cy.wait('@getPopUp').its('response.body').should('include', '"status":"CONFIRMED"')

			bookingPopup.getPassengerTitle().should('have.text', 'Passengers (24)')
			bookingPopup.getDepartureTime().should('have.text', timeOfDeparture)
			bookingPopup.clickCloseBtnBookingPopup()
			cy.wait(400)
			
			createBookingPage.getDepartureTripCardsList().filter(':visible').each(($tripcard) => {
				if ($tripcard.text().includes(timeOfDeparture)) {
					expect($tripcard).to.have.class('booked').and.include.text('Fully booked')
					cy.wrap($tripcard).click({ force: true }).should('not.have.class', 'selected')
				}
			})
			createBookingPage.typeIntoMainPassengerEmailField(this.bookingData.namesForVipBusTrip[1])
			createBookingPage.getBookTicketsButton().should('have.attr', 'disabled')
		})
	})
});
	describe('All trip card statuses (overdue, innactive, innactive/disabled)', { tags: ['regression'] }, function () {

		beforeEach(function () {
			cy.loginWithSession(AGENT.email, AGENT.password);
			cy.visit('/');
			cy.intercept('POST', '/booking/', (req) => {
				if (req.body.includes('action=get-trips')) {
					req.alias = 'getTrip'
				}
			})
			cy.fixture('createBookingPage').then(bookingData => {
				this.bookingData = bookingData;
			})
		});

		it('CB_6.02 | Verify agent cannot book ticket if trip status is inactive/disable , trip: "Ayutthaya - Bangkok Khao San" ', function () {
			createBookingPage.selectDepartureStation(this.bookingData.dropdowns.disableTrip.departureStation)
			createBookingPage.selectArrivalStation(this.bookingData.dropdowns.disableTrip.arrivalStation)
			createBookingPage.getTripsPrice().should('contain.text',this.bookingData.disabedStatus)			
			createBookingPage.isAllTripOverdueClickNext(this.bookingData.ticketsAvailabilityStatusInactive)
			cy.wait('@getTrip').its('response.body').should('include', 'trip')
			
			createBookingPage.getAvailabilityTripStatus()
				.should('include.text', this.bookingData.ticketsAvailabilityStatusInactive)
				.filter(`:contains(${this.bookingData.ticketsAvailabilityStatusInactive})`) 
				.parent()
				.each(($tripCard) => {
					expect($tripCard.find('.price')).to.have.text(this.bookingData.disabedStatus)
					cy.wrap($tripCard).click()
					createBookingPage.getBookTicketsButton().should('be.disabled')
				});	
		})	
	})
