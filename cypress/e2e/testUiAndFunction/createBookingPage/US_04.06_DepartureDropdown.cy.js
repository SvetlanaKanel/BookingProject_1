/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

const AGENT = Cypress.env('agent');

describe('US_04.06 | Departure dropdown UI and functionality', { tags: ['smoke'] }, () => {   

    beforeEach(function () {
        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData;
        });
        
        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });    
    });

    before(() => {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');       
    });

    it('AT_04.06.01 | Verify that the Departure station dropdown menu displays required list of stations', function () {
        createBookingPage.clickDepartureStationDropdown()

        createBookingPage.getListDepartureStation()
            .should('have.length', this.bookingData.dropdowns.departureStation.stationsNumber)            
        createBookingPage.getListDepartureStation().each(($el, i) => {
            cy.wrap($el).should('be.visible')
            expect($el.text()).to.be.equal(this.bookingData.dropdowns.departureStation.stationsNames[i])
        })
    });

    it('AT_04.06.02 | Verify that the Agent can choose stations from the Dropdown Menu', { tags: ['regression'] }, function () {
        createBookingPage.selectNeedDepartureStation(this.bookingData.dropdowns.departureStation.stationsNames[6])

        createBookingPage.getDepartureStationDropdown()
            .should('have.text', this.bookingData.dropdowns.departureStation.stationsNames[6])
            .and('be.visible')
    });

    it('AT_04.06.03 | Verify that the background of the selected item in the Dropdown Menu has gray color (#DDDDDD)', function() {
        createBookingPage.selectNeedDepartureStation(this.bookingData.dropdowns.departureStation.stationsNames[3])

        createBookingPage.hoverNeedDepartureStation(this.bookingData.dropdowns.departureStation.stationsNames[1])
        createBookingPage.getListDepartureStation().each($el => {
            if($el.text() == this.bookingData.dropdowns.departureStation.stationsNames[3]){ 
                              
                expect($el).to.have.css('background-color', this.colors.greyDropdownBack)
            }
        })

    });

    it.skip('AT_04.06.04 | Verify that the background of the newly selected item changes color to green(#00A65A) when the item is selected', function() {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/'); 
        createBookingPage.hoverNeedDepartureStation(this.bookingData.dropdowns.departureStation.stationsNames[4])

        createBookingPage.getListDepartureStation().each($el => {
            if($el.text() == this.bookingData.dropdowns.departureStation.stationsNames[4]) {

                expect($el).to.have.css('background-color', this.colors.greenBookingPage)
            }
        })
    });

    it('AT_04.06.05 | Verify that the selection Arrow is clickable and turns up (drop-down menu opened) and down (drop-down menu closed) when clicking on it', { tags: ['regression'] }, function () {
        createBookingPage.getLabelDepartureStation().click();
        createBookingPage.clickDepartureStationSelectionArrow();

        createBookingPage.getListDepartureStation().should('exist');
        createBookingPage.getDepartureStationDrpdwnComboBox().should('have.attr', 'aria-expanded', 'true');

        createBookingPage.clickDepartureStationSelectionArrow();

        createBookingPage.getListDepartureStation().should('not.exist');
        createBookingPage.getDepartureStationDrpdwnComboBox().should('have.attr', 'aria-expanded', 'false'); 
    });
});
