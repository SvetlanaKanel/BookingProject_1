/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import getArray from "../../../support/utilities/getArray";

const createBookingPage = new CreateBookingPage();

describe('US_04.29 | Seat selection dropdown UI and functionality', () => {

    const AGENT = Cypress.env('agent');
    
    beforeEach(function() {
        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData;
        });

        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
    });

    before(function() {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        cy.intercept('POST', '/booking/', (req) => {
            if (req.body.includes('action=get-trips')) {
            }
        }).as('getTrip')
        createBookingPage.clickCalendarNextButton()
        cy.wait('@getTrip').its('response.body').should('include', 'trip') 
        createBookingPage.clickOnFirstAvailableTripCard()
        createBookingPage.getLabelSeatSelection()
            .should('be.visible')
            .and('have.text', 'Seat selection')
    });

    it('AT_04.29.01 | The amount of passengers in the "Seat selection dropdown" is equal the number of available tickets in the selected trip', { tags: ['regression'] }, function () {

        createBookingPage.getTicketsAvailableFirstTripCard().then(($tickets) => {
            const ticketsAvailable = Number($tickets.text())
            
            createBookingPage.getSeatSelectionDropdownList().then(($el) => {
                const passengersAmountArray = getArray($el)
                const passengersAmountAvailable = passengersAmountArray[passengersAmountArray.length - 1]
    
                expect(parseInt(passengersAmountAvailable)).to.equal(ticketsAvailable)
            })
        })
    });

    it('AT_04.29.02 | The list of passengers starts with "1 passenger" and each subsequent element increases by one', { tags: ['regression'] }, function () {
        
        createBookingPage.getSeatSelectionDropdownList().then(($el) => {
            const passengersArray = getArray($el)
                
            if (passengersArray[0] == this.bookingData.dropdowns.seatSelection.onePassenger) {
                for (let i = passengersArray.length - 1; i > 0; i--) {
                    expect(passengersArray[i])
                    .to.equal((parseInt(passengersArray[i - 1]) + 1) + ' ' + this.bookingData.dropdowns.seatSelection.passengers)
                }
                expect(passengersArray[0]).to.equal(this.bookingData.dropdowns.seatSelection.onePassenger)
            }
        })
    });

    it('AT_04.29.03 | When selecting the required amount of passengers the corresponding number of seats in the "Seats table" will be rgb(157, 208, 157) color', { tags: ['smoke'] }, function() {
        let passengersAmountBoundaryArray = [this.bookingData.validBoundaryValues.minimum,
                                             this.bookingData.validBoundaryValues.nominalValue,
                                             this.bookingData.validBoundaryValues.maximum]
            
            for(let passengersAmount of passengersAmountBoundaryArray){
                createBookingPage.getSeatSelectionDropdown()
                    .select(passengersAmount, { force: true })
                    .should('have.value', parseInt(passengersAmount))

                createBookingPage.getSelectedSeats().then(($el) => {
                    expect($el).to.have.css('background-color', this.colors.greenSeat)

                    const selectedSeatsArr = getArray($el)
                    const selectedSeats = selectedSeatsArr.length

                expect(selectedSeats).to.equal(parseInt(passengersAmount))   
                })
            }
    });

    it('AT_04.29.04 | The number of passengers in "Seat selection dropdown" is equal the number of passengers is displayed in the "Passengers details dropdown".', { tags: ['smoke'] }, function () {
        createBookingPage.getSeatSelectionDropdownList().then(($el) => {
           let arrayOfSeats = $el
               .toArray()
               .map(el => el.innerText.split('\n'))

           let indexOfSeat = Math.floor(Math.random() * arrayOfSeats.length)
           let amountOfPass = arrayOfSeats[indexOfSeat]

           createBookingPage.getSeatSelectionDropdown().select(amountOfPass)

           createBookingPage.getAmountOfChosenPass().then(($el) => {
            let amountOfChoosenPass = $el
                .toArray()
                .map(el => el.innerText)

            expect(parseInt(amountOfPass)).to.eq(amountOfChoosenPass.length)
           })
        }) 
    });

    it('AT_04.29.05 | Verify number of passengers selected in the "Seat selection dropdown" became equal to the number of passengers in the "Summary" section', { tags: ['regression'] }, function () {
             createBookingPage.getRandomAmountOfPassSeatSelectionDrpDwn().then($el => {
                let amountOfPass = $el;

                createBookingPage.getSeatSelectionDropdown().select(amountOfPass)

                createBookingPage.getAmountOfPassengersInSummary().then($el => {
                let amountOfPassengersInSummary = $el
                    .toArray()
                    
                 expect(parseInt(amountOfPass)).to.eq(amountOfPassengersInSummary.length)
             })
         })
    })

    it('AT_04.29.06 |Verify that when you select a random number of passengers in the "Seat Selection" drop down list, it is equal to the number of passengers in the "Passenger Information" drop-down list', { tags: ['regression'] }, function () {
        let passengersAmountBoundaryArray = [
          this.bookingData.validBoundaryValues.minimum,
          this.bookingData.validBoundaryValues.nominalValue,
          this.bookingData.validBoundaryValues.maximum,
        ];
    
        for (let passengersAmount of passengersAmountBoundaryArray) {
          createBookingPage
            .getSeatSelectionDropdown()
            .select(passengersAmount);

          createBookingPage
            .getPassengersDetailsDropdown()
            .should("be.visible");
          createBookingPage
            .getPassengersDetailsDropdown()
            .should("have.value", parseInt(passengersAmount));
        }
      });
});
