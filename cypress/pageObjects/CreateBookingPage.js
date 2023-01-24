class CreateBookingPage {
    //Elements
    getMainPassengerNameField = () => cy.get('.form-control[name="passenger-name[]"]');
    getCalendarNextButton = () => cy.get('div .calendar-week-next');
    getFirstTripCard = () => cy.get('div .trip:first-child');
    getCreateBookingHeader = () => cy.get('div h1')
    getCalendarDaySelectionWrapper = () => cy.get('.col-lg-12.calendar-day-selection-wrapper .day-wrapper');
    getLabelDepartureOnDate = () => cy.get('#label-departure-on #trips-selected-date');
    
    // Methods
    clickCalendarNextButton() {
        this.getCalendarNextButton().click()
    };
};


export class DepartureOnSection {
    //Elements
    getFirstTripCard = () => cy.get('div .trip:first-child');
   


    clickFirstTripCard() {
        this.getFirstTripCard().click()
    };

    typeIntoMainPassengerNameField(name) {
        this.getMainPassengerNameField().type(name)
    }

}
export default CreateBookingPage;