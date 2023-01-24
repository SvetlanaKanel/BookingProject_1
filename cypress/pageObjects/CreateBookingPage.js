export class PassengersDetailsSection {
    //Elements
    getMainPassengerField = () => cy.get('.form-control[name="passenger-name[]"]');


    // Methods
    
};


export class DepartureDateSection {
    //Elements
   getCalendarNextButton = () => cy.get('div .calendar-week-next');
   getCalendarDaySelectionWrapper = () => cy.get('.col-lg-12.calendar-day-selection-wrapper .day-wrapper');

    // Methods
    clickCalendarNextButton() {
        this.getCalendarNextButton().click()
    };
};

export class DepartureOnSection {
    //Elements
   getFirstTripCard = () => cy.get('div .trip:first-child');
   getLabelDepartureOnDate = () => cy.get('#label-departure-on #trips-selected-date');

    // Methods
    clickFirstTripCard() {
        this.getFirstTripCard().click()
    };
};