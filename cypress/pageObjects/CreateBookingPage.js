class CreateBookingPage {
    //Elements
    getMainPassengerNameField = () => cy.get('.form-control[name="passenger-name[]"]');
    getMainPassengerPhoneField = () => cy.get('.iti #passenger-phone');
    getCalendarNextButton = () => cy.get('div .calendar-week-next');
    getFirstTripCard = () => cy.get('div .trip:first-child');
    getCreateBookingHeader = () => cy.get('div h1');
    getCalendarDaySelectionWrapper = () => cy.get('.col-lg-12.calendar-day-selection-wrapper .day-wrapper');
    getLabelDepartureOnDate = () => cy.get('#label-departure-on #trips-selected-date');
    getLabelCalendarWeek = () => cy.get('.calendar-week-selection-wrapper #calendar-week');
    
    // Methods
    clickCalendarNextButton() {
        this.getCalendarNextButton().click()
    };

    clickFirstTripCard() {
        this.getFirstTripCard().click()
    };

    typeIntoMainPassengerNameField(name) {
        this.getMainPassengerNameField().type(name)
    };

    typeIntoMainPassengerPhoneField(phone) {
        this.getMainPassengerPhoneField().type(phone)
    };

}
export default CreateBookingPage;