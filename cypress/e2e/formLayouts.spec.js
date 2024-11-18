/// <reference types="cypress" />

const { Dropdown } = require("bootstrap");
const { table } = require("console");

describe("User Interface tests", () => {
  it("Positive path of filling inline form", () => {
    cy.fixture("example").then((data) => {
      cy.visit("/");
      cy.contains("Forms").click();
      cy.contains("Form Layouts").click();

      cy.get(".inline-form-card")
        .find('input[placeholder="Jane Doe"]')
        .type(data.name)
        .should('have.value', data.name);

      cy.get(".inline-form-card")
        .find('input[placeholder="Email"]')
        .type(data.email)
        .should('have.value', data.email);

      cy.get(".custom-checkbox").eq(0).click();

      cy.url().then((initialUrl) => {
        cy.contains("button", "Submit").click();
        cy.url().should("eq", initialUrl);
      });
    });
  });

  it("Positive path of filling grid form", () => {
    cy.fixture("example").then((data) => {
      cy.visit("/");
      cy.contains("Forms").click();
      cy.contains("Form Layouts").click();

      cy.get(".col-md-6")
        .eq(0)
        .find('[data-cy="imputEmail1"]')
        .type(data.email)
        .should('have.value', data.email);
      
      cy.get(".col-md-6")
        .eq(0)
        .find('#inputPassword2')
        .type(data.password)
        .should('have.value', data.password);

      cy.contains('span.text', 'Option 2')
        .click()
        .parent() 
        .find('input[type="radio"]')
        .should('be.checked'); 

      cy.contains("button", "Sign in").eq(0).click(); 
      });
    });

  it("Datepicker test", () => {
    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleDateString("en-US", { month: "short" });
      let futureYear = date.getFullYear();
      let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;
      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (
            !dateAttribute.includes(futureMonth) ||
            !dateAttribute.includes(futureYear)
          ) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get(".day-cell")
              .not(".bounding-month")
              .contains(futureDay)
              .click();
          }
        });
      return dateToAssert;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        const dateToAssert = selectDayFromCurrent(200);
        cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
        cy.wrap(input).should("have.value", dateToAssert);
      });
  });

  it("Changing themes - lists and dropdowns", () => {
    cy.visit("/");

    //1
    cy.get("nav").find("nb-select").click();
    cy.get(".options-list").contains("Dark").click();
    cy.get("nb-select").should("contain", "Dark");

    //2
    cy.get("nav nb-select").then((dropDown) => {
      cy.wrap(dropDown).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim();
        cy.wrap(listItem).click();
        cy.wrap(dropDown).should("contain", itemText);
        if (index < 3) {
          cy.wrap(dropDown).click();
        }
      });
    });
  });

  it.only("Web tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("35");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "35");
      });

    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("John");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Smith");
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });

    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableColumns) => {
        cy.wrap(tableColumns).eq(2).should("contain", "John");
        cy.wrap(tableColumns).eq(3).should("contain", "Smith");
      });

    const age = [20, 30, 40, 200];

    cy.wrap(age).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500);
      cy.get("tbody tr").each((tableRow) => {
        if (age == 200) {
          cy.wrap(tableRow).should("contain", "No data found");
        } else {
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        }
      });
    });
  });

  it("Tooltips", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    // tooltip
    cy.contains("nb-card", "Colored Tooltips").contains("Default").click();
    cy.get("nb-tooltip").should("contain", "This is a tooltip");
  });

  it("Dialog box", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // dialog box
    //cy.get('tbody tr').first().find('.nb-trash').click()

    const stub = cy.stub();
    cy.on("window:confirm", stub);
    cy.get("tbody tr")
      .first()
      .find(".nb-trash")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "Are you sure you want to delete?"
        );
      });
  });
});
