/// <reference types="Cypress" />

Cypress.Commands.add('isEqualHeaders', (selector, expectedTableHeaders) => {
    cy.get(selector).then(($tr) => {
        const actualTableHeaders = $tr.toArray()[0].innerText.split('\t')
        expect(actualTableHeaders).to.deep.eq(expectedTableHeaders)
    })
})

describe('US_05.12 | Columns are filtered by selected criteria', () => {

    context('AT_05.12.03 | Columns (booking list) are filtered by selected criteria', () => {
        const AGENT = Cypress.env('agent');

        before(() => {
            cy.visit('/')
            cy.login(AGENT.email, AGENT.password)
            cy.get('a[href="/orders/"] i').click();
        });

        it('Verify defaults columns', () => {
            const expectedResult = ['#', 'ID', 'Booking date', 'Route', 'Departure date', 'Departure time', 'Vehicle', 'Seats', 'Contact', 'Price, USD',
                'Status', 'Expire'];

            cy.isEqualHeaders('.table thead tr', expectedResult)
        })

        it('Verify filtering by ID', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['id'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'ID'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Booking date', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['createdon'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Booking date'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Route', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['route'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Route'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Departure date', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['godate'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Departure date'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Departure time', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['gotime'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Departure time'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Vehicle', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['class'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Vehicle'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Channel / Agent', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['agent'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Channel / Agent'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Seats', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['seats'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Seats'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Numbers', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['seatnums'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Numbers'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Contact', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['customer'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Contact'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Price/USD', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['total'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Price, USD'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Status', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['status'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Status'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Expire', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['expire'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Expire'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Notes', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['notes'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Notes'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by ID + Notes', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['id', 'notes'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'ID', 'Notes'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Seats + Status', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['seats', 'status'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Seats', 'Status'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

        it('Verify filtering by Route + Vehicle', () => {
            cy.get('.table-columns-settings-link').click();

            cy.get('input[type="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').check(['route', 'class'])
            cy.get('.popup-table-columns-settings .btn-success').click();

            const expectedResult = ['#', 'Route', 'Vehicle'];

            cy.isEqualHeaders('.table thead tr', expectedResult);
        });

    })

})