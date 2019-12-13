describe('Reports Page Test', function() {
    before(()=> {
        cy.login('a','a');
        cy.server();
        cy.route('GET', '/dashboard', '{}}');
        cy.route('GET', '/reports', 'fixture:reports_response');
        cy.contains('Reports').click();
    });

    it('should load the reports', () => {
        cy.location('pathname').should('include', 'reports');
    });
    it('should load the reports table', () => {
        cy.location('pathname').should('include', 'reports');
        cy.contains('Monitor').should('exist');
        cy.contains('Report Date').should('exist');
        cy.contains('PC Name').should('exist');
    });
    it('should load the reports table\'s data', () => {
        cy.location('pathname').should('include', 'reports');
        cy.contains('a').should('exist');
        cy.contains('2019-11-30T14:21:58.438713').should('exist');
    });
    it('should navigate to the report page', () => {
        cy.contains('2019-11-30T14:21:58.438713').click();
        cy.location('pathname').should('include', 'report/5dd831719f1397e47b93498e');
    });


});