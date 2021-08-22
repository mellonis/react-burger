describe('burger constructor functional tests', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json',
    });
    cy.get('[data-test-id="burger-constructor"]').as('constructor');
    cy.get('[data-test-id="burger-ingredient"]').as('ingredient');
    cy.get('[data-test-id="total-wrapper"]').as('totalWrapper');
  });

  it('has burger ingredients container', () => {
    cy.get('[data-test-id="burger-ingredients"]').should('have.length', 1);
  });

  it('has burger ingredients', () => {
    cy.get('@ingredient').should('have.length.above', 0);
  });

  it('has burger constructor', () => {
    cy.get('@constructor').should('have.length', 1);
  });

  it('can drag and drop a bun', () => {
    cy.get('@ingredient').eq(0).as('first');
    cy.get('[data-test-id="burger-constructor-ingredient"]').should(
      'have.length',
      0
    );
    cy.get('@first').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@first').find('p').should('have.text', 2);
    cy.get('@totalWrapper').should('contain.text', '2510');
    cy.get('[data-test-id="burger-constructor-ingredient"]').should(
      'have.length',
      2
    );
  });

  it('can drag and drop another bun', () => {
    cy.get('@ingredient').eq(0).as('first');
    cy.get('@ingredient').eq(1).as('second');
    cy.get('[data-test-id="burger-constructor-ingredient"]').should(
      'have.length',
      0
    );
    cy.get('@first').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@first').find('p').should('have.text', 2);
    cy.get('@totalWrapper').should('contain.text', '2510');
    cy.get('[data-test-id="burger-constructor-ingredient"]').should(
      'have.length',
      2
    );
    cy.get('@second').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@first').find('p').should('not.exist');
    cy.get('@second').find('p').should('have.text', 2);
    cy.get('@totalWrapper').should('contain.text', '1976');
    cy.get('[data-test-id="burger-constructor-ingredient"]').should(
      'have.length',
      2
    );
  });

  it('can add more ingredients', () => {
    cy.get('@ingredient').eq(0).as('first');
    cy.get('@ingredient').eq(2).as('third');
    cy.get('@ingredient').eq(8).as('ninth');
    cy.get('[data-test-id="burger-constructor-ingredient"]').should(
      'have.length',
      0
    );
    cy.get('@first').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@first').find('p').should('have.text', 2);
    cy.get('@totalWrapper').should('contain.text', '2510');
    cy.get('[data-test-id="burger-constructor-ingredient"]').should(
      'have.length',
      2
    );
    cy.get('@third').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@third').find('p').should('have.text', 1);
    cy.get('@totalWrapper').should('contain.text', '2600');
    cy.get('[data-test-id="burger-constructor-ingredient"]').should(
      'have.length',
      3
    );
    cy.get('@ninth').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@ninth').find('p').should('have.text', 1);
    cy.get('@totalWrapper').should('contain.text', '5600');
    cy.get('[data-test-id="burger-constructor-ingredient"]').should(
      'have.length',
      4
    );
  });

  it('can remove ingredients', () => {
    cy.get('@ingredient').eq(0).as('first');
    cy.get('@ingredient').eq(2).as('third');
    cy.get('[data-test-id="burger-constructor-ingredient"]').should(
      'have.length',
      0
    );
    cy.get('@first').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@first').find('p').should('have.text', 2);
    cy.get('@totalWrapper').should('contain.text', '2510');
    cy.get('[data-test-id="burger-constructor-ingredient"]').should(
      'have.length',
      2
    );
    cy.get('@third').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@third').find('p').should('have.text', 1);
    cy.get('@totalWrapper').should('contain.text', '2600');
    cy.get('[data-test-id="burger-constructor-ingredient"]').should(
      'have.length',
      3
    );
    cy.get('[data-test-id="burger-constructor-ingredient"]')
      .eq(1)
      .find('.constructor-element__action')
      .click();
    cy.get('@totalWrapper').should('contain.text', '2510');
    cy.get('[data-test-id="burger-constructor-ingredient"]').should(
      'have.length',
      2
    );
  });

  it('can reorder ingredients in the constructor', () => {
    cy.get('@ingredient').eq(0).as('first');
    cy.get('@ingredient').eq(2).as('third');
    cy.get('@ingredient').eq(8).as('ninth');
    cy.get('@first').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@third').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@ninth').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('[data-test-id="burger-constructor-ingredient"]').should(
      'have.length',
      4
    );
    cy.get('[data-test-id="burger-constructor-ingredient"]')
      .eq(1)
      .should('contain.text', 'Spicy');
    cy.get('[data-test-id="burger-constructor-ingredient"]')
      .eq(2)
      .should('contain.text', 'Говяжий');
    cy.get('[data-test-id="burger-constructor-ingredient"]')
      .eq(1)
      .find('div[draggable]')
      .trigger('dragstart');
    cy.get('[data-test-id="burger-constructor-ingredient"]')
      .eq(2)
      .trigger('drop', { force: true });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200).should(() => {
      const $ingredients = Cypress.$(
        '[data-test-id="burger-constructor-ingredient"]'
      );
      cy.wrap($ingredients).eq(1).should('contain.text', 'Говяжий');
      cy.wrap($ingredients).eq(2).should('contain.text', 'Spicy');
    });
  });
});
