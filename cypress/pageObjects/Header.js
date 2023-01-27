class Header {
//Elements

    getBurgerMenu = () => cy.get('.navbar > [href="#"]');
    getUserDropDownMenu = () => cy.get('.dropdown.user.user-menu');
    getLanguageIcons = () => cy.get('.user-header .user-lang-selection li');
    getLogoImg = () => cy.get('.logo-mini > img');
    getCloseBtn = () => cy.get('div[style="padding: 15px;"] .close');
    getContactUsIcon = () => cy.get('.sidebar-menu > :nth-child(4) > a');
    getFlagIconEn = () => cy.get('a[href="/lang?l=en"');
    getEnvelopeIcon = () => cy.get('[href="/helpdesk"]');
    getFlagIconFr = () => cy.get('a[href="/lang?l=fr"]');
    getFlagIconDe = () => cy.get('a[href="/lang?l=de"]');
    getFlagIconEs = () => cy.get('a[href="/lang?l=es"]');
    getFlagIconRu = () => cy.get('a[href="/lang?l=ru"]');
    getFlagIconCn = () => cy.get('a[href="/lang?l=cn"]');
    getFlagIconVi = () => cy.get('a[href="/lang?l=vi"]');
    getFlagIconEn = () => cy.get('a[href="/lang?l=en"]');
    getEnvelopeIcon = () => cy.get('[href="/helpdesk"]'); 
    getFlagIconTh = () => cy.get('a[href="/lang?l=th"]');
    

// methods
    clickBurgerMenu() {
        this.getBurgerMenu().click();
    }

    clickUserDropDownMenu() {
        this.getUserDropDownMenu().click();
    }

    clickLogoImg() {
        this.getLogoImg().click();
    }
    
    clickCloseBtn() {
        this.getCloseBtn().click();
    }
     clickContactUsIcon() {
        this.getContactUsIcon().click();
    }

    clickFlagIconTh() {
        this.getFlagIconTh().click();
    }

    clickFlagIconEn() {
        this.getFlagIconEn().click();
    }
}
export default Header;
