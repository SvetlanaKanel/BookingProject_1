/// <reference types="Cypress" />

import { DepartureOnSection } from "../../../../pageObjects/CreateBookingPage";
import { DepartureDateSection } from "../../../../pageObjects/CreateBookingPage"

const departureOnSection = new DepartureOnSection();
const departureDateSection = new DepartureDateSection();

describe('US_04.11 | Calendar week functionality', () => {

	const AGENT = Cypress.env('agent');

	beforeEach(function () {
		cy.visit('/')
		cy.login(AGENT.email, AGENT.password)
	});

	it('AT_04.11.02 | Verify chosen date, current month and year are displayed in the Departure on section', function () {
		const current = new Date()
		const thailandCurrentMonthAndYear = new Date(current).toLocaleString('en-GB', { month: 'short', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })

		departureDateSection.getCalendarDaySelectionWrapper().not('.unavailable').first().click().then(($date) => {
			let dateChosen = $date.text()
			departureOnSection.getLabelDepartureOnDate().then(($el) => {
				let departureDateFullFormat = $el.text()

				expect(departureDateFullFormat).to.deep.equal(dateChosen + " " + thailandCurrentMonthAndYear)
			})
		})
	})
});