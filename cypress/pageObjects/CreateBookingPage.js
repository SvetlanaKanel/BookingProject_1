export class PassengersDetailsSection {
    //Elements
    getMainPassengerField = () => cy.get('.form-control[name="passenger-name[]"]');


    // Methods
    
}


export class DepartureOnSection {
    //Elements
    getFirstTripCard = () => cy.get('div .vehclass-bus');


    // Methods    
    clickFirstTripCard() {
        this.getFirstTripCard().click()
    };
}


export class DepartureDateSection {
    //Elements
    getButtonCalendarNext = () => cy.get('div .calendar-week-next');


    // Methods    
    clickButtonCalendarNext() {
        this.getButtonCalendarNext().click()
    };
}