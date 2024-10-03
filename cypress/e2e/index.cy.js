describe('index page', () => {

  beforeEach( () => {
    cy.visit('http://localhost:3000');
  });

  it('renders the default elements on the screen', () => {
    cy.get('[data-testid="fake-person-data-generator-title"]')
      .should("exist")
      .should('have.text', 'Fake Personal Data Generator');
  });

  it("renders the options on the screen", () => {
    cy.get('[data-testid="check-generate-full-person"]').should('exist');
    cy.get('[data-testid="input-number-of-people-to-generate"]').should('exist');
    cy.get('[data-testid="check-generate-partial-person"]').should('exist');
    cy.get('[data-testid="drop-down-partial-options"]').should('exist');
    cy.get('[data-testid="drop-down-option-cpr"]').should('exist');
    cy.get('[data-testid="drop-down-option-name-gender"]').should('exist');
    cy.get('[data-testid="drop-down-option-name-gender-dob"]').should('exist');
    cy.get('[data-testid="drop-down-option-cpr-name-gender"]').should('exist');
    cy.get('[data-testid="drop-down-option-cpr-name-gender-dob"]').should('exist');
    cy.get('[data-testid="drop-down-option-address"]').should('exist');
    cy.get('[data-testid="drop-down-option-phone"]').should('exist');
    cy.get('[data-testid="generate-data-submit-button"]').should('exist');
  });

  it("should return one person", () => {
    cy.get('[data-testid="check-generate-full-person"]').check();
    cy.get('[data-testid="input-number-of-people-to-generate"]').clear().type(1);
    cy.get('[data-testid="generate-data-submit-button"]').click();
    cy.get('[data-testid="generated-people-output"]').children().should('have.length', 1);
    cy.get('.cprValue').should('be.visible').invoke('text').should('match', /^\d{10}$/);
    cy.get('.firstNameValue').should('be.visible').invoke('text').should('match', /^\D+$/);
    cy.get('.lastNameValue').should('be.visible').invoke('text').should('match', /^\D+$/);
    cy.get('.genderValue').should('be.visible').invoke('text').should('match', /^male$|^female$/);
    cy.get('.dobValue').should('be.visible').invoke('text').should('match', /^\d{4}-\d{2}-\d{2}$/);
    cy.get('.streetValue').should('be.visible').invoke('text').should('match', /\w{1,}/);
    cy.get('.townValue').should('be.visible').invoke('text').should('match', /\w{1,}/);
    cy.get('.phoneNumberValue').should('be.visible').invoke('text').should('match', /^\d{8}$/);
  });

  it("should return multiple people", () => {
    cy.get('[data-testid="check-generate-full-person"]').check();
    cy.get('[data-testid="input-number-of-people-to-generate"]').clear().type(5);
    cy.get('[data-testid="generate-data-submit-button"]').click();
    cy.get('[data-testid="generated-people-output"]').children().should('have.length', 5);
    cy.get('.cprValue').should('be.visible').should('have.length', 5);
    cy.get('.firstNameValue').should('be.visible').should('have.length', 5);
    cy.get('.lastNameValue').should('be.visible').should('have.length', 5);
    cy.get('.genderValue').should('be.visible').should('have.length', 5);
    cy.get('.dobValue').should('be.visible').should('have.length', 5);
    cy.get('.streetValue').should('be.visible').should('have.length', 5);
    cy.get('.townValue').should('be.visible').should('have.length', 5);
    cy.get('.phoneNumberValue').should('be.visible').should('have.length', 5);
  });

  it("should return partial person cpr data", () => {
    cy.get('[data-testid="check-generate-partial-person"]').check();
    cy.get('[data-testid="check-generate-full-person"]').should('not.be.checked');
    cy
      .get('[data-testid="drop-down-option-cpr"]')
      .invoke('attr', 'value')
      .then(value => {
        cy
          .get('[data-testid="drop-down-partial-options"]')
          .select(value);
      });
    cy.get('[data-testid="generate-data-submit-button"]').click();

    cy.get('[data-testid="generated-people-output"]').children().should('have.length', 1);
    cy.get('.cprValue').should('be.visible').invoke('text').should('match', /^\d{10}$/);
    cy.get('.firstNameValue').should('not.be.visible');
    cy.get('.lastNameValue').should('not.be.visible');
    cy.get('.genderValue').should('not.be.visible');
    cy.get('.dobValue').should('not.be.visible');
    cy.get('.streetValue').should('not.be.visible');
    cy.get('.townValue').should('not.be.visible');
    cy.get('.phoneNumberValue').should('not.be.visible');

  });

  it("should return partial person name and gender data", () => {
    cy.get('[data-testid="check-generate-partial-person"]').check();
    cy.get('[data-testid="check-generate-full-person"]').should('not.be.checked');
    cy
      .get('[data-testid="drop-down-option-name-gender"]')
      .invoke('attr', 'value')
      .then(value => {
        cy
          .get('[data-testid="drop-down-partial-options"]')
          .select(value);
      });
    cy.get('[data-testid="generate-data-submit-button"]').click();

    cy.get('[data-testid="generated-people-output"]').children().should('have.length', 1);
    cy.get('.cprValue').should('not.be.visible');
    cy.get('.firstNameValue').should('be.visible').invoke('text').should('match', /^\D+$/);
    cy.get('.lastNameValue').should('be.visible').invoke('text').should('match', /^\D+$/);
    cy.get('.genderValue').should('be.visible').invoke('text').should('match', /^male$|^female$/);
    cy.get('.dobValue').should('not.be.visible');
    cy.get('.streetValue').should('not.be.visible');
    cy.get('.townValue').should('not.be.visible');
    cy.get('.phoneNumberValue').should('not.be.visible');

  });

  it("should return partial person name, gender and birthdate data", () => {
    cy.get('[data-testid="check-generate-partial-person"]').check();
    cy.get('[data-testid="check-generate-full-person"]').should('not.be.checked');
    cy
      .get('[data-testid="drop-down-option-name-gender-dob"]')
      .invoke('attr', 'value')
      .then(value => {
        cy
          .get('[data-testid="drop-down-partial-options"]')
          .select(value);
      });
    cy.get('[data-testid="generate-data-submit-button"]').click();

    cy.get('[data-testid="generated-people-output"]').children().should('have.length', 1);
    cy.get('.cprValue').should('not.be.visible');
    cy.get('.firstNameValue').should('be.visible').invoke('text').should('match', /^\D+$/);
    cy.get('.lastNameValue').should('be.visible').invoke('text').should('match', /^\D+$/);
    cy.get('.genderValue').should('be.visible').invoke('text').should('match', /^male$|^female$/);
    cy.get('.dobValue').should('be.visible').invoke('text').should('match', /^\d{4}-\d{2}-\d{2}$/);
    cy.get('.streetValue').should('not.be.visible');
    cy.get('.townValue').should('not.be.visible');
    cy.get('.phoneNumberValue').should('not.be.visible');

  });

  it("should return partial person cpr, name and gender data", () => {
    cy.get('[data-testid="check-generate-partial-person"]').check();
    cy.get('[data-testid="check-generate-full-person"]').should('not.be.checked');
    cy
      .get('[data-testid="drop-down-option-cpr-name-gender"]')
      .invoke('attr', 'value')
      .then(value => {
        cy
          .get('[data-testid="drop-down-partial-options"]')
          .select(value);
      });
    cy.get('[data-testid="generate-data-submit-button"]').click();

    cy.get('[data-testid="generated-people-output"]').children().should('have.length', 1);
    cy.get('.cprValue').should('be.visible').invoke('text').should('match', /^\d{10}$/);
    cy.get('.firstNameValue').should('be.visible').invoke('text').should('match', /^\D+$/);
    cy.get('.lastNameValue').should('be.visible').invoke('text').should('match', /^\D+$/);
    cy.get('.genderValue').should('be.visible').invoke('text').should('match', /^male$|^female$/);
    cy.get('.dobValue').should('not.be.visible');
    cy.get('.streetValue').should('not.be.visible');
    cy.get('.townValue').should('not.be.visible');
    cy.get('.phoneNumberValue').should('not.be.visible');

  });

  it("should return partial person cpr, name, gender and birthdate data", () => {
    cy.get('[data-testid="check-generate-partial-person"]').check();
    cy.get('[data-testid="check-generate-full-person"]').should('not.be.checked');
    cy
      .get('[data-testid="drop-down-option-cpr-name-gender-dob"]')
      .invoke('attr', 'value')
      .then(value => {
        cy
          .get('[data-testid="drop-down-partial-options"]')
          .select(value);
      });
    cy.get('[data-testid="generate-data-submit-button"]').click();

    cy.get('[data-testid="generated-people-output"]').children().should('have.length', 1);
    cy.get('.cprValue').should('be.visible').invoke('text').should('match', /^\d{10}$/);
    cy.get('.firstNameValue').should('be.visible').invoke('text').should('match', /^\D+$/);
    cy.get('.lastNameValue').should('be.visible').invoke('text').should('match', /^\D+$/);
    cy.get('.genderValue').should('be.visible').invoke('text').should('match', /^male$|^female$/);
    cy.get('.dobValue').should('be.visible').invoke('text').should('match', /^\d{4}-\d{2}-\d{2}$/);
    cy.get('.streetValue').should('not.be.visible');
    cy.get('.townValue').should('not.be.visible');
    cy.get('.phoneNumberValue').should('not.be.visible');

  });

  it("should return partial person address data", () => {
    cy.get('[data-testid="check-generate-partial-person"]').check();
    cy.get('[data-testid="check-generate-full-person"]').should('not.be.checked');
    cy
      .get('[data-testid="drop-down-option-address"]')
      .invoke('attr', 'value')
      .then(value => {
        cy
          .get('[data-testid="drop-down-partial-options"]')
          .select(value);
      });
    cy.get('[data-testid="generate-data-submit-button"]').click();

    cy.get('[data-testid="generated-people-output"]').children().should('have.length', 1);
    cy.get('.cprValue').should('not.be.visible');
    cy.get('.firstNameValue').should('not.be.visible');
    cy.get('.lastNameValue').should('not.be.visible');
    cy.get('.genderValue').should('not.be.visible');
    cy.get('.dobValue').should('not.be.visible');
    cy.get('.streetValue').should('be.visible').invoke('text').should('match', /\w{1,}/);
    cy.get('.townValue').should('be.visible').invoke('text').should('match', /\w{1,}/);
    cy.get('.phoneNumberValue').should('not.be.visible');

  });

  it("should return partial person phone number data", () => {
    cy.get('[data-testid="check-generate-partial-person"]').check();
    cy.get('[data-testid="check-generate-full-person"]').should('not.be.checked');
    cy
      .get('[data-testid="drop-down-option-phone"]')
      .invoke('attr', 'value')
      .then(value => {
        cy
          .get('[data-testid="drop-down-partial-options"]')
          .select(value);
      });
    cy.get('[data-testid="generate-data-submit-button"]').click();

    cy.get('[data-testid="generated-people-output"]').children().should('have.length', 1);
    cy.get('.cprValue').should('not.be.visible');
    cy.get('.firstNameValue').should('not.be.visible');
    cy.get('.lastNameValue').should('not.be.visible');
    cy.get('.genderValue').should('not.be.visible');
    cy.get('.dobValue').should('not.be.visible');
    cy.get('.streetValue').should('not.be.visible');
    cy.get('.townValue').should('not.be.visible');
    cy.get('.phoneNumberValue').should('be.visible').invoke('text').should('match', /^\d{8}$/);

  });
});