import { faker } from "@faker-js/faker";
describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');

  it("Should create a comment successfully", () => {
    const comment = "TEST_COMMENT";

    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();
      cy.get('textarea[placeholder="Add a comment..."]').type(comment);
      cy.contains("button", "Save").click().should("not.exist");
      cy.contains("Add a comment...").should("exist");
      cy.get('[data-testid="issue-comment"]').should("contain", comment);
    });
  });

  it("Should edit a comment successfully", () => {
    const previousComment = "An old silent pond...";
    const comment = "TEST_COMMENT_EDITED";

    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]')
        .first()
        .contains("Edit")
        .click()
        .should("not.exist");

      cy.get('textarea[placeholder="Add a comment..."]')
        .should("contain", previousComment)
        .clear()
        .type(comment);

      cy.contains("button", "Save").click().should("not.exist");

      cy.get('[data-testid="issue-comment"]')
        .should("contain", "Edit")
        .and("contain", comment);
    });
  });

  it("Should delete a comment successfully", () => {
    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .contains("Delete")
      .click();

    cy.get('[data-testid="modal:confirm"]')
      .contains("button", "Delete comment")
      .click()
      .should("not.exist");

    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .should("not.exist");
  });

  //ASSIGNMENT 1: MODIFY TESTS FOR COVERING COMMENTS FUNCTIONALITY: ADD/UPDATE/DELETE
  it("Should add, edit and delete a comment successfully", () => {
    const randomText = faker.lorem.words();
    const comment = randomText;
    const previousComment = randomText;
    const editedComment = "edited comment";

    getIssueDetailsModal().within(() => {
      //Add comment
      cy.contains("Add a comment...").click();
      cy.get('textarea[placeholder="Add a comment..."]').type(comment);
      cy.contains("button", "Save").click().should("not.exist");

      //Assert that the comment has been added and is visible.
      cy.get('[data-testid="issue-comment"]').should("contain", comment);

      //Edit comment
      cy.get('[data-testid="issue-comment"]')
        .first()
        .contains("Edit")
        .click()
        .should("not.exist");
      cy.get('textarea[placeholder="Add a comment..."]')
        .should("contain", previousComment)
        .clear()
        .type(editedComment);
      cy.contains("button", "Save").click().should("not.exist");

      //Assert that the updated comment is visible.
      cy.get('[data-testid="issue-comment"]')
        .should("contain", "Edit")
        .and("contain", editedComment);
    });

    //Remove comment
    cy.get('[data-testid="issue-comment"]')
      .first()
      .should("contain", editedComment)
      .contains("Delete")
      .click();
    cy.get('[data-testid="modal:confirm"]')
      .should("be.visible")
      .should("contain", "Are you sure you want to delete this comment?");
    cy.contains("Delete comment").click();

    //Assert that the comment is removed
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get('[data-testid="issue-comment"]')
      .contains(editedComment)
      .should("not.exist");
  });
});
