describe('visiting the homepage dashboard', () => {
    it('displays the homepage dashboard', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Homepage Dashboard')
    })
})


