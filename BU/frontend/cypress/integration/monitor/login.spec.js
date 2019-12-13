describe('Login Page Test', function() {
    beforeEach(()=> {
        cy.visit('http://localhost:3000/login')
        cy.clearCookies();
    });

    it('should present error when failed to login', () => {
        cy.location('pathname').should('include', 'login');
        cy.server();
        cy.route('/login', {accountID:'yes'});
        cy.route('/dashboard', {});

        cy.get('#username').type('a', {force: true});
        cy.get('#password').type('a', {force: true});
        cy.contains('Sign In').click();
        cy.location('pathname').should('include', 'dashboard');
    });
    it('should store login login cookies when asked', () => {
        cy.location('pathname').should('include', 'login');
        cy.getCookies().should('be.empty')
        cy.server();
        cy.route('/login', {accountID:'yes'});
        cy.route('/dashboard', {});
        cy.route('/alerts', {});

        cy.get('#username').type('a', {force: true});
        cy.get('#password').type('a', {force: true});
        cy.get('#remember').click();

        cy.contains('Sign In').click();
        cy.location('pathname').should('include', 'dashboard');
        cy.getCookie('login').should('not.be.empty');
    });

    it('should not store login cookies when asked', () => {
        cy.location('pathname').should('include', 'login');
        cy.getCookies().should('be.empty')
        cy.server();
        cy.route('/login', {accountID:'yes'});
        cy.route('/dashboard', {});
        cy.route('/alerts', {});

        cy.get('#username').type('a', {force: true});
        cy.get('#password').type('a', {force: true});

        cy.contains('Sign In').click();
        cy.location('pathname').should('include', 'dashboard');
        cy.getCookie('login').should('not.exist');
    });

    it('should remove cookies when logout', () => {
        cy.location('pathname').should('include', 'login');
        cy.getCookies().should('be.empty')
        cy.server();
        cy.route('/login', {accountID:'yes'});
        cy.route('/dashboard', {});
        cy.route('/alerts', {});

        cy.get('#username').type('a', {force: true});
        cy.get('#password').type('a', {force: true});
        cy.get('#remember').click();

        cy.contains('Sign In').click();
        cy.location('pathname').should('include', 'dashboard');
        cy.getCookie('login').should('not.be.empty');
        cy.contains('Logout').click();
        cy.location('pathname').should('include', 'login');
        cy.getCookie('login').should('not.exist');

    });

});