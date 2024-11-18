/// <reference types="cypress" />

const { Dropdown } = require("bootstrap");
const { table } = require("console");

describe("Authentication tests", () => {
  it.only("Positive path of filling inline form", () => {
    cy.fixture("example").then((data) => {
      cy.visit("/");
      cy.contains("Auth").click();
      cy.contains("Login").click();
      
      cy.contains('button', ' Log In ').should('be.disabled')
      
    });
  });

  it("Positive path of filling inline form", () => {
    cy.fixture("example").then((data) => {
      cy.visit("/");
      cy.contains("Auth").click();
      cy.contains("Register").click();
    
    });
  });

  it("Positive path of filling inline form", () => {
    cy.fixture("example").then((data) => {
      cy.visit("/");
      cy.contains("Auth").click();
      cy.contains("Request Password").click();
    
    });
  });

  it("Positive path of filling inline form", () => {
    cy.fixture("example").then((data) => {
      cy.visit("/");
      cy.contains("Auth").click();
      cy.contains("Reset Password").click();
    
    });
  });
});
