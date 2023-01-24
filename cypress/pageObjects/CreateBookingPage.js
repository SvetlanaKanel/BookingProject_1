class CreateBookingPage {
    //Elements
    getMainPassengerField = () => cy.get('.form-control[name="passenger-name[]"]');
    getCalendarNextButton = () => cy.get('div .calendar-week-next');
    getFirstTripCard = () => cy.get('div .trip:first-child');
    getCreateBookingHeader = () => cy.get('div h1')
    
    // Methods
    clickCalendarNextButton() {
        this.getCalendarNextButton().click()
    };

    clickFirstTripCard() {
        this.getFirstTripCard().click()
    };

}
export default CreateBookingPage;