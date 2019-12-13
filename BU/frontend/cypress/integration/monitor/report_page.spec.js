describe('Dashboard Page Test', function() {
    before(()=> {
        cy.loadReport();
    });

    it('should load the report page', () => {
        cy.location('pathname').should('include', 'report/5dd831719f1397e47b93498e');
    });

    it('should load load all the cards', () => {

        cy.contains('cpu').should('exist');
        cy.contains('Memory').should('exist');
        cy.contains('Disk').should('exist');
        cy.contains('Network').should('exist');
        cy.contains('Users').should('exist');
        cy.contains('Fans').should('exist');
        cy.contains('Battery').should('exist');
        cy.contains('Operating System').should('exist');
        cy.contains('Temperatures').should('exist');
    });


});