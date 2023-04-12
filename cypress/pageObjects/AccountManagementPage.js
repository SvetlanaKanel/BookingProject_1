class AccountManagementPage {
    getAccountManagementHeader = () => cy.get('h1.page-title');

    // Credit Balance
    getBalanceAmountOnAccountManagementPage = () => cy.get('span#agent-balance');
    getBookingDateTime = () => cy.get('#data > tbody > tr.odd > td:nth-of-type(2)');
    getBookingDescription = () => cy.get('#data > tbody > tr.odd > td:nth-of-type(3)');
    getBookingAmount = () => cy.get('#data > tbody > tr.odd > td:nth-of-type(4)');

    /**
     * 
     * @returns price in float format with decimal dot
     */
    getBookingAmountUSFormat() {
        return this.getBookingAmount().then($price => parseFloat(this.changeFormatNum($price.text())))
    }

    /**
     * change number format 99 987,25$  to 99987.25 (extract '$', ' ' and replace ',' to '.' )
     * change number format $99,987.25  to 99987.25 (extract '$', ',', ' ' )
     * @param {} num 
     * @returns float number with decimal dot without any chadacter
     */
    changeFormatNum(num) {
        return num.indexOf(".") != -1 ? num.replace(/[$\s,]+/g,"") : num.replace(/[$\s]+/g,"").replace(",", ".")
    }
}
export default AccountManagementPage;