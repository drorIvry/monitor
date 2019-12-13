describe('Dashboard Page Test', function() {
    before(()=> {
        cy.login('a','a');
        cy.server();
        cy.route('GET', '/dashboard', 'fixture:dashboard_response');
    });

    it('should load the dashboard', () => {
        cy.location('pathname').should('include', 'dashboard');
    });

    it('should render the dashboard', () => {
        cy.server();
        cy.route('/alerts', {});
        cy.route('GET', '/dashboard', 'fixture:dashboard_response');
        cy.location('pathname').should('include', 'dashboard');
        cy.contains('Memory').should('exist');
        cy.contains('Disk').should('exist');
        cy.contains('CPU').should('exist');
    });


    it('should render the dashboards graphs', () => {
        cy.server();
        cy.route('/alerts', {});
        cy.route('GET', '/dashboard', 'fixture:dashboard_response');
        cy.location('pathname').should('include', 'dashboard');
        cy.get('.recharts-surface').should('exist');
        cy.get('.recharts-cartesian-grid').should('exist');
    });

});