describe('Alerts Page Test', function() {
    before(()=> {
        cy.login('a','a');
        cy.server();
        cy.route('GET', '/dashboard', '{}');
        cy.route('GET', '/alerts', 'fixture:alerts_response');
        cy.contains('Alerts').click();
    });
    beforeEach(() => {
        cy.server();
        cy.route('GET', '/dashboard', '{}');
        cy.route('GET', '/alerts', 'fixture:alerts_response');
    });

    it('should load the alerts', () => {
        cy.location('pathname').should('include', 'alerts');
    });
    it('should load the alerts table', () => {
        cy.contains('Alert').should('exist');
        cy.contains('Report Date').should('exist');
        cy.contains('PC Name').should('exist');
    });

    it('should load the alerts table\'s data', () => {
        cy.contains('a').should('exist');
        cy.contains('2019-11-30T14:21:58.446Z').should('exist');
    });

    it('should display the delete button', () => {
        cy.contains('Delete').should('not.exist');
        cy.get('#select-all').click();
        cy.contains('Delete').should('exist');
        cy.get('#select-all').click();
        cy.contains('Delete').should('not.exist');
    });

    it('should delete when delete button is pressed', () => {
        cy.server();
        cy.route('POST', '/delete-alerts', {});
        cy.route('GET', '/alerts', []);
        cy.contains('Delete').should('not.exist');
        cy.get('#select-all').click();
        cy.contains('Delete').should('exist');
        cy.contains('Delete').click();
        cy.contains('Disk Space Is Running Out. Disk Load: 86.5%').should('not.exist');
    });
});