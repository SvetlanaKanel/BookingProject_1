/// <reference types="Cypress" />

const isEqualHeaders = (selector, expectedTableHeaders) => {
    cy.get(selector).then(($tr) => {
        const actualTableHeaders = $tr.toArray()[0].innerText.split('\t')
        expect(actualTableHeaders).to.deep.eq(expectedTableHeaders)
    })
}

describe('US_05.12 | Columns are filtered by selected criteria', () => {
    const AGENT = Cypress.env('agent');

    before(() => {
        cy.visit('/')
        cy.login(AGENT.email, AGENT.password)
        cy.wait(5000)
        cy.get('a[href="/orders/"] i').click();
    });

    beforeEach(function () {
        cy.fixture('bookingsListPage').then(bookingsListPage => {
            this.bookingsListPage = bookingsListPage;
        })
    });

    context('AT_05.12.03 | Default columns (booking list) are displayed', () => {
        it('AT_05.12.03 | Verify that default columns (booking list) are displayed', function () {
            const expectedResult = this.bookingsListPage.columns.default;
            isEqualHeaders('.table thead tr', expectedResult)
        })
    })

    context('AT_05.12.03 | Columns (booking list) are filtered by selected criteria', () => {
        beforeEach(() => {
            cy.get('.table-columns-settings-link').click();
            cy.get('input[type="checkbox"]').uncheck()
        });

        it('Verify filtering by ID', function () {
            cy.get('input[type="checkbox"]').check(['id'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.id;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Booking date', function () {
            cy.get('input[type="checkbox"]').check(['createdon'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.bookingDate;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Route', function () {
            cy.get('input[type="checkbox"]').check(['route'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.route;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Departure date', function () {
            cy.get('input[type="checkbox"]').check(['godate'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.departureDate;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Departure time', function () {
            cy.get('input[type="checkbox"]').check(['gotime'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.departureTime;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Vehicle', function () {
            cy.get('input[type="checkbox"]').check(['class'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.vehicle;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Channel / Agent', function () {
            cy.get('input[type="checkbox"]').check(['agent'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.channelAgent;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Seats', function () {
            cy.get('input[type="checkbox"]').check(['seats'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.seats;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Numbers', function () {
            cy.get('input[type="checkbox"]').check(['seatnums'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.numbers;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Contact', function () {
            cy.get('input[type="checkbox"]').check(['customer'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.contact;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Price/USD', function () {
            cy.get('input[type="checkbox"]').check(['total'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.priceUsd;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Status', function () {
            cy.get('input[type="checkbox"]').check(['status'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.status;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Expire', function () {
            cy.get('input[type="checkbox"]').check(['expire'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.expire;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Notes', function () {
            cy.get('input[type="checkbox"]').check(['notes'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.notes;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by ID + Notes', function () {
            cy.get('input[type="checkbox"]').check(['id', 'notes'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.idNotes;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Seats + Status', function () {
            cy.get('input[type="checkbox"]').check(['seats', 'status'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.seatsStatus;
            isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Route + Vehicle', function () {
            cy.get('input[type="checkbox"]').check(['route', 'class'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = this.bookingsListPage.columns.routeVehicle;
            isEqualHeaders('.table thead tr', expectedResult);
        });
    })
})
