export default class LeftMenuPanel {
    elements = {
        getMainElements: () => cy.get('.main-sidebar i'),
        getMainElementsNames: () => cy.get('.main-sidebar span')
    }

    getBookingIkonLink = () => cy.get('[href="/booking/"]');
    getBookingNameLink = () => cy.get('[href="/booking/"] span');
    getBookingManagementIkonLink = () => cy.get('[href="/orders/"]');
    getBookingManagementNameLink = () => cy.get('[href="/orders/"] span');
    getAccountManagementIkonLink = () => cy.get('[href="/account/"]');
    getAccountManagementNameLink = () => cy.get('[href="/account/"] span');
    getContactUsIkonLink = () => cy.get('[href="/helpdesk/"]');
    getContactUsNameLink = () => cy.get('[href="/helpdesk/"] span');    

    //Methods  

}