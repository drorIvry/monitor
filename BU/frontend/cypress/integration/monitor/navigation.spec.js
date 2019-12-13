describe('Dashboard Page Test', function() {

    before(()=> {
        cy.login('a','a');
        cy.server();
    });

    it('should navigate to dashboard', () => {
        cy.contains('Dashboard').click();
        cy.location('pathname').should('include', 'dashboard');
    });

    it('should navigate to reports', () => {
        cy.contains('Reports').click();
        cy.location('pathname').should('include', 'reports');
    });

    it('should navigate to monitors', () => {
        cy.contains('Monitors').click();
        cy.location('pathname').should('include', 'monitors');
    });

    it('should navigate to alerts', () => {
        cy.contains('Alerts').click();
        cy.location('pathname').should('include', 'alerts');
    });

    it('should navigate to login', () => {
        cy.contains('Logout').click();
        cy.location('pathname').should('include', 'login');
    });
});