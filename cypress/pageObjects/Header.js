export default class Header {
    
    getBurgerMenu = ()=> cy.get('.navbar > [href="#"]');
    
// methods
    clickBurgerMenu() {
        this.getBurgerMenu().click();
    }
}