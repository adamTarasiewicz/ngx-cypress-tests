/// <reference types="cypress" />

const { Dropdown } = require("bootstrap");
const { table, time } = require("console");

describe("Authentication tests", () => {
  it("Login form - invalid data provided", () => {
    cy.fixture("example").then((data) => {
      cy.visit("/");
      cy.contains("Auth").click();
      cy.contains("Login").click();
      
      cy.contains('button', ' Log In ').should('be.disabled')

      cy.get('input[name="email"]').as('emailInput');
      cy.get('@emailInput').focus().blur();
      cy.contains('Email is required!').should('be.visible');
      
      cy.get('input[name="password"]').as('passwordInput');
      cy.get('@passwordInput').focus().blur();
      cy.contains('Password is required!').should('be.visible');

      cy.get('@emailInput').type(data.badEmail).focus().blur()
      cy.contains('Email should be the real one!').should('be.visible');
      cy.get('@emailInput').should('have.css', 'border-color', 'rgb(255, 61, 113)');

      cy.get('@passwordInput').type(data.badPassword).focus().blur()
      cy.contains('Password should contain from 4 to 50 characters').should('be.visible');
      cy.get('@emailInput').should('have.css', 'border-color', 'rgb(255, 61, 113)');

      cy.contains('button', ' Log In ').should('be.disabled')
    });
  });

  it("Login form - valid data provided", () => {
    cy.fixture("example").then((data) => {
      cy.visit("/");
      cy.contains("Auth").click();
      cy.contains("Login").click();
      
      cy.contains('button', ' Log In ').should('be.disabled')

      cy.get('input[name="email"]').as('emailInput');
      cy.get('@emailInput').type(data.email)
      cy.get('@emailInput').should('have.css', 'border-color', 'rgb(0, 214, 143)');

      cy.contains('button', ' Log In ').should('be.disabled')

      cy.get('input[name="password"]').as('passwordInput');
      cy.get('@passwordInput').type(data.password)
      cy.get('@passwordInput').should('have.css', 'border-color', 'rgb(0, 214, 143)');

      cy.contains('button', ' Log In ').should('be.enabled').click()

      cy.contains('button', ' Log In ').should('be.disabled')

      cy.contains('nb-alert', 'Hooray!', { timeout: 10000 }).should('be.visible');
      cy.contains('nb-alert', 'Successfully logged in.', { timeout: 10000 }).should('be.visible');
    });
  });

  it("Registration form", () => {
    cy.fixture("example").then((data) => {
      cy.visit("/");
      cy.contains("Auth").click();
      cy.contains("Register").click();
    
    });
  });

  it("Request password form", () => {
    cy.fixture("example").then((data) => {
      cy.visit("/");
      cy.contains("Auth").click();
      cy.contains("Request Password").click();
    
    });
  });

  it("Reset password form", () => {
    cy.fixture("example").then((data) => {
      cy.visit("/");
      cy.contains("Auth").click();
      cy.contains("Reset Password").click();
    
    });
  });
});
