/// <reference types="Cypress" />

<<<<<<< HEAD:cypress/e2e/testUiAndFunction/startPage/loginPopupSection/us_01.06_LoginByEmailTub.cy.js
import CreateBookingPage from "../../../../pageObjects/CreateBookingPage";
import { LoginPopup } from "../../../../pageObjects/StartPage";
=======
import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
>>>>>>> 233a4dacc8e2b5e3b6c23b95f067e46a73777f3c:cypress/e2e/testUiAndFunction/startPage/us_01.06_LoginByEmailTub.cy.js

const createBookingPage = new CreateBookingPage(); 
const loginPopup = new LoginPopup();

describe('US_01.06 | Login by email tub functionality', () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage
        });
        cy.fixture('startPage/buttons').then(button => {
            this.button = button
        });
        cy.visit('/');    
    });

    it('AT_01.06.01 | Verify Sign In Button redirect to the Create Booking Page', function () {
        cy.login(AGENT.email, AGENT.password);
        createBookingPage.getCreateBookingHeader().should('include.text', this.createBookingPage.headers.mainHeaderPage)
    });
<<<<<<< HEAD:cypress/e2e/testUiAndFunction/startPage/loginPopupSection/us_01.06_LoginByEmailTub.cy.js

    it('AT_01.06.02 | Color of Sign In Button', function () {
        cy.login(AGENT.email, AGENT.password);
        loginPopup.getSignInButton().should('have.css','color', this.button.signInButton.color)
    });
});
=======
});
>>>>>>> 233a4dacc8e2b5e3b6c23b95f067e46a73777f3c:cypress/e2e/testUiAndFunction/startPage/us_01.06_LoginByEmailTub.cy.js
