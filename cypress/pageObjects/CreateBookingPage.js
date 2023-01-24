class CreateBookingPage {

    getMonthBtn = () => cy.get('.calendar-view-wrapper .calendar-view-month');
    getMonthDropdownList = () => cy.get('.calendar-month-wrapper .form-control option');

    //Methods
    clickMonthBtn() {
        this.getMonthBtn().click({ forse: true });
    }

    selectMonthDropdown() {
        this.getMonthDropdownList().select(0);
    }
}
export default CreateBookingPage;