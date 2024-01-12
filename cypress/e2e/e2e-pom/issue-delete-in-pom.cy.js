/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe("Issue delete", () => {
  // issue title, that we are testing with, saved into variable
  const issueTitle = "This is an issue of type: Task.";

  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        // open issue detail modal with title from line 16
        cy.contains(issueTitle).click();
      });
  });

  it("Should delete issue successfully", () => {
    // Delete the issue by clicking the delete button and confirming the deletion
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();

    // Assert that the issue is deleted and no longer displayed on the Jira board
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);
  });

  it("Should cancel deletion process successfully", () => {
    // Click the Delete Issue button
    IssueModal.clickDeleteButton();

    // Click the Cancel button
    IssueModal.cancelDeletion();

    // Assert that the deletion confirmation dialogue is not visible
    IssueModal.closeDetailModal();

    // Assert that the issue is not deleted and is still displayed on the Jira board
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);
  });
});
