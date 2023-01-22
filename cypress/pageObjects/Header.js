class Header {
    getUserDropDownMenu = () => cy.get('.dropdown.user.user-menu')
    getLanguageIcons = () => cy.get('.user-header .user-lang-selection li')

    clickUserDropDownMenu() {
        this.getUserDropDownMenu().click()
    }

}
export default Header;