describe('Reports Page Test', function() {
    before(()=> {
        cy.login('a','a');
        cy.server();
        cy.route('GET', '/dashboard', '{}');
        cy.route('GET', '/monitors', 'fixture:monitors_response');
        cy.contains('Monitors').click();
    });
    beforeEach(() => {
        cy.server();
        cy.route('GET', '/dashboard', '{}');
        cy.route('GET', '/monitors', 'fixture:monitors_response');
    });

    it('should load the monitors', () => {
        cy.location('pathname').should('include', 'monitors');
    });
    it('should load the monitors table', () => {
        cy.contains('Monitor API Key').should('exist');
        cy.contains('Monitor Name').should('exist');
        cy.contains('PC Name').should('exist');
    });

    it('should load the monitors table\'s data', () => {
        cy.contains('a').should('exist');
        cy.contains('2ec5c27b-058a-420b-ae29-cd07a749179a').should('exist');
    });

    it('should load the display the delete button', () => {
        cy.contains('Delete').should('not.exist');
        cy.get('#select-all').click();
        cy.contains('Delete').should('exist');
        cy.get('#select-all').click();
        cy.contains('Delete').should('not.exist');
    });

    it('should delete when delete button is pressed', () => {
        cy.server();
        cy.route('POST', '/delete-monitor', {});
        cy.route('GET', '/monitors', []);
        cy.contains('Delete').should('not.exist');
        cy.get('#select-all').click();
        cy.contains('Delete').should('exist');
        cy.contains('Delete').click();
        cy.contains('2ec5c27b-058a-420b-ae29-cd07a749179a').should('not.exist');
    });
});