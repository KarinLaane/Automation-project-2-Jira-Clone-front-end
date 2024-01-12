import { faker } from "@faker-js/faker";
describe("Issue create", () => {
  beforeEach(() => {
<<<<<<< HEAD
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        //System will already open issue creating modal in beforeEach block
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  const randomTitle = faker.lorem.word();
  const randomDescription = faker.lorem.words(5);

  it("Should create an issue and validate it successfully", () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      //open issue type dropdown and choose Story
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]').trigger("click");

      //Type value to description input field
      cy.get(".ql-editor").type("TEST_DESCRIPTION");

      //Type value to title input field
      //Order of filling in the fields is first description, then title on purpose
      //Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type("TEST_TITLE");

      //Select Lord Gaben from reporter dropdown - This is assignee not reporter
=======
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      // System will already open issue creating modal in beforeEach block  
      cy.visit(url + '/board?modal-issue-create=true');
    });
  });

  it('Should create an issue and validate it successfully', () => {
    // System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => { 
      // Type value to description input field
      cy.get('.ql-editor').type('TEST_DESCRIPTION');
      cy.get('.ql-editor').should('have.text', 'TEST_DESCRIPTION');

      // Type value to title input field
      // Order of filling in the fields is first description, then title on purpose
      // Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type('TEST_TITLE');
      cy.get('input[name="title"]').should('have.value', 'TEST_TITLE');

      // Open issue type dropdown and choose Story
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]')
        .wait(1000)
        .trigger('mouseover')
        .trigger('click');
      cy.get('[data-testid="icon:story"]').should('be.visible');
      
      // Select Lord Gaben from assignee dropdown
>>>>>>> cf41a5ff5899eb382ff9b9bbcceb503d384ff9f4
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();

      // Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

<<<<<<< HEAD
    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");

    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
=======
    // Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    // Reload the page to be able to see recently created issue
    // Assert that successful message has dissappeared after the reload
>>>>>>> cf41a5ff5899eb382ff9b9bbcceb503d384ff9f4
    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");

<<<<<<< HEAD
    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        //Assert that this list contains 5 issues and first element with tag p has specified text
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .contains("TEST_TITLE");
        //Assert that correct avatar and type icon are visible
        cy.get('[data-testid="avatar:Lord Gaben"]').should("be.visible");
        cy.get('[data-testid="icon:story"]').should("be.visible");
      });
  });

  it("Test Case 1: Custom Issue Creation", () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      //open issue type dropdown and choose Bug
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]:visible').eq(0).click();

      //Type value to description input field
      cy.get(".ql-editor").type("My bug description");

      //Type "Bug" to title input field
      cy.get('input[name="title"]').type("Bug");

      //Select Pickle Rick from reporter dropdown
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();

      //Select priority "Highest"
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Highest"]').trigger("click");

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");

    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        //Assert that this list contains 5 issues and first element with tag p has specified text
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .contains("Bug");
      });

    //Assert that correct avatar and type icon are visible
    cy.get('[data-testid="icon:bug"]').should("be.visible");
    cy.get('[data-testid="board-list:backlog"]').contains("Bug").click();
    cy.get('[data-testid="modal:issue-details"]')
      .contains("Bug")
      .within(() => {});
    cy.get('[data-testid="select:reporter"]')
      .contains("Pickle Rick")
      .parent()
      .find('[data-testid="avatar:Pickle Rick"]')
      .should("be.visible");
  });

  it("Test Case 2: Random Data Plugin Issue Creation", () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      //Validate that task is preselected
      cy.get('[data-testid="select:type"]').contains("Task");

      //Type value to description input field
      cy.get(".ql-editor").type(randomDescription);

      //Type value to title input field
      cy.get('input[name="title"]').type(randomTitle);

      //Select Baby Yoda from reporter dropdown
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();

      //Select priority "Highest"
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Low"]').trigger("click");

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");

    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        //Assert that this list contains 5 issues and first element with tag p has specified text
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .contains(randomTitle);
      });
    //Assert that correct avatar and type icon are visible
    cy.get('[data-testid="icon:task"]').should("be.visible");
    cy.get('[data-testid="board-list:backlog"]').contains(randomTitle).click();
    cy.get('[data-testid="modal:issue-details"]')
      .contains(randomTitle)
      .within(() => {});
    //Find Baby Yoda avatar
    cy.get('[data-testid="select:reporter"]')
      .contains("Baby Yoda")
      .parent()
      .find('[data-testid="avatar:Baby Yoda"]')
      .should("be.visible");
  });

  it("Should validate title is required field if missing", () => {
    //System finds modal for creating issue and does next steps inside of it
=======
    // Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
      // Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('TEST_TITLE')
          .siblings()
          .within(() => {
            //Assert that correct avatar and type icon are visible
            cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
            cy.get('[data-testid="icon:story"]').should('be.visible');
          });
    });

    cy.get('[data-testid="board-list:backlog"]')
      .contains('TEST_TITLE')
      .within(() => {
        // Assert that correct avatar and type icon are visible
        cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
        cy.get('[data-testid="icon:story"]').should('be.visible');
      });
  });

  it('Should validate title is required field if missing', () => {
    // System finds modal for creating issue and does next steps inside of it
>>>>>>> cf41a5ff5899eb382ff9b9bbcceb503d384ff9f4
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      // Try to click create issue button without filling any data
      cy.get('button[type="submit"]').click();

<<<<<<< HEAD
      //Assert that correct error message is visible
      cy.get('[data-testid="form-field:title"]').should(
        "contain",
        "This field is required"
      );
    });
  });

  // Bonus assignment: TASK 3 //

  it("Should remove unnecessary spaces on the board view", () => {
    const issueTitle = "Hello    World!"

    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      //Validate that task is preselected
      cy.get('[data-testid="select:type"]').contains("Task");

      cy.get(".ql-editor").type(randomDescription);

      //Type value to title input field
      cy.get('input[name="title"]').type(issueTitle);

      //Select Baby Yoda from reporter dropdown
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();

      //Select priority "Highest"
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Low"]').trigger("click");

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");

    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        //Assert that this list contains 5 issues and first one is issue we created
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .should("contain", issueTitle.trim());
      });
  });
=======
      // Assert that correct error message is visible
      cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });
>>>>>>> cf41a5ff5899eb382ff9b9bbcceb503d384ff9f4
});
