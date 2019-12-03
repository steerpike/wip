//Arrive at Homepage
describe('complete the user journey as Anonymous', () => {
    it('displays the homepage dashboard', () => {
        cy.visit('http://localhost:3000');
        cy.get("h1").should(($h1) => {
            expect($h1).to.contain('Dashboard')
        })
        const manuscript = {
            title: 'Test Manuscript Title',
            content:'Test Manuscript Content'
        }
        const doc = {
            title: 'Test Document Title',
            content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor '+
            'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '+
            'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure '+
            'dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '+
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit '+
            'anim id est laborum.'
        }
        //cy.contains('Homepage Dashboard')
        //Click on Menu
        cy.get('[data-test=menuButton]').click()
        //Create a Manuscript
        cy.get('[data-test=manuscriptsLink]').click()
        cy.url().should('include', 'manuscripts') 
        cy.get('[data-test=createNewManuscriptsLink]').click()
        cy.url().should('include', 'manuscripts/new')
        cy.get('[data-test="createNewManuscriptTitle"]').type(manuscript.title)
        cy.get('[data-test="createNewManuscriptContent"]').type(manuscript.content)
        cy.get('[data-test="createNewManuscriptButton"]').click() 
        cy.url().should('include', 'manuscripts') 
        cy.contains(manuscript.title)
        cy.contains(manuscript.content)
        //Create a Document
        cy.get('[data-test="createNewDocumentButton"]').click()
        cy.contains("Chapter 1")
        //Navigate to Document
        cy.get('a').contains('Chapter 1').click()
        cy.url().should('include', 'documents') 
        //Write some content
        cy.get('[data-test="documentTitle"]').clear().type(doc.title)
        cy.get('.ql-editor').type(doc.content)
        //Start a sprint
        
        //Write some content

        //Visit Dashboard - validate Session and Sprint
    })
})



