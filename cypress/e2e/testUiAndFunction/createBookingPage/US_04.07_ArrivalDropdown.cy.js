/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.07_Arrival Dropdown UI and functionality ', { tags: ['smoke'] }, () => {

    before(() => {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
    });
    
    beforeEach(function () {
        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData;
        });
    });

    it('AT_04.07.02 | Verify that after clicking on any space outside of the opened drop-down menu, the drop-down menu will close', { tags: ['regression'] }, function () {
        createBookingPage.clickArrivalStationDropdown();
        createBookingPage.clickArrivalStationDropdown();
        createBookingPage.getArrivalSearchField().should('not.exist');
        createBookingPage.getArrivalStationList().should('not.exist');
    });

    it('AT_04.07.01 | Verify the Arrival station Dropdown Menu is clickable and opens up the dropdown menu', { tags: ['regression'] }, function () {
        createBookingPage.clickArrivalStationDropdown()
        createBookingPage.getArrivalStationList().should('be.visible')
    });

    it('AT_04.07.03 | Verify that the background of the selected item in the Dropdown Menu has gray color (#DDDDDD).', function() {
        createBookingPage.selectNeedArrivalStation(this.bookingData.dropdowns.arrivalStation.stationsNames[2])
        createBookingPage.hoverNeedArrivalStation(this.bookingData.dropdowns.arrivalStation.stationsNames[1])
        createBookingPage.getArrivalStationList().each($el => {
            if($el.text() == this.bookingData.dropdowns.arrivalStation.stationsNames[2]){ 
                              
                expect($el).to.have.css('background-color', this.colors.greyDropdownBack)
            }
        })
    })

    it('AT_04.07.04 | Verify that the background of the newly selected item changes color to green(#00A65A) when the item is selected.', function() {
        createBookingPage.hoverNeedArrivalStation(this.bookingData.dropdowns.arrivalStation.stationsNames[1])
        createBookingPage.getArrivalStationList().each($el => {
            if($el.text() == this.bookingData.dropdowns.arrivalStation.stationsNames[1]) {

                expect($el).to.have.css('background-color', this.colors.greenBookingPage)
            }
        })
    });

    
    it('AT_04.07.05 | Verify that the Agent can choose stations from the Dropdown Menu', { tags: ['regression'] }, function () {
        createBookingPage.getArrivalStationDropdown(this.bookingData.dropdowns.departureStation.stationsNames[5])
        createBookingPage.getArrivalStationSelectionDropdown()
            .should('include.text', this.bookingData.dropdowns.departureStation.stationsNames[5])
            .and('be.visible')
    });
})
