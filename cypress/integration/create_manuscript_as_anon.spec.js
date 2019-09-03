describe('can create Manuscript as an Anonymous user', () => {
    it('creates a manuscript', () => {
        const title = 'Test Manuscript Title';
        const content = 'Test Manuscript Content';
        cy.visit('http://localhost:3000/manuscripts/new');
        cy.get('[data-test="createNewManuscriptTitle"]').type(title)
        cy.get('[data-test="createNewManuscriptContent"]').type(content)
        cy.get('[data-test="createNewManuscriptButton"]').click()
        cy.contains(title)
        cy.contains(content)
    })
})