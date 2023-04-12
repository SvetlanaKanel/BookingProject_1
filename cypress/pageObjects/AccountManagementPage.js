class AccountManagementPage {
    getAccountManagementHeader = () => cy.get('h1.page-title');

    // Credit Balance
    getBalanceAmountOnAccountManagementPage = () => cy.get('span#agent-balance');
    getBookingDateTime = () => cy.get('#data > tbody > tr.odd > td:nth-of-type(2)');
    getBookingDescription = () => cy.get('#data > tbody > tr.odd > td:nth-of-type(3)');
    getBookingAmount = () => cy.get('#data > tbody > tr.odd > td:nth-of-type(4)');

}
export default AccountManagementPage;