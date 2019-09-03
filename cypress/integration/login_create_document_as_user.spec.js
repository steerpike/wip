describe('can create Manuscript as an Anonymous user', () => {
    it('creates a manuscript', () => {
        const title = 'Test Manuscript Title';
        const content = 'Test Manuscript Content';
        cy.visit('http://localhost:3000/login');
        cy.get('[data-test="username"]').type('test')
        cy.get('[data-test="password"]').type('test')
        cy.get('[data-test="loginButton"]').click()
        cy.get('[data-test="logoutButton"]').contains('Logout test')
        cy.get('[data-test="manuscriptsLink"]').click()
        cy.get('[data-test="newManuscriptsLink"]').click()
        cy.get('[data-test="createNewManuscriptTitle"]').type(title)
        cy.get('[data-test="createNewManuscriptContent"]').type(content)
        cy.get('[data-test="createNewManuscriptButton"]').click()
        cy.contains(title)
        cy.contains(content)
        cy.get('[data-test="createNewDocumentButton"]').click()
        cy.contains("Chapter 1")
    })
})