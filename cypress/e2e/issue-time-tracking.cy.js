import { faker } from "@faker-js/faker";
describe("AUTOMATION TESTS FOR TIME TRACKING FUNCTIONALITY", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
  const issueName = "This is an issue of type: Task.";
  const getTrackingModal = () => cy.get('[data-testid="modal:tracking"]');
  const getIconStopwatch = () => cy.get('[data-testid="icon:stopwatch"]');
  const getBacklogList = () => cy.get('[data-testid="board-list:backlog"]');
  const getInputNumberHours = () => cy.get('[placeholder="Number"]');
  const getIconClose = () => cy.get('[data-testid="icon:close"]');

  it("Should add, update and remove estimation", () => {
    //Clear the estimated time of existing ticket (original estimate, time spent)
    getInputNumberHours().eq(0).click().clear();
    getIconStopwatch().click();
    getTrackingModal().contains("Time tracking").click();
    getInputNumberHours().eq(1).click().clear();
    getTrackingModal().contains("Done").click();

    //Add estimation
    getIssueDetailsModal().contains("No time logged");
    getInputNumberHours().eq(0).click().type(10);
    //System needs a bit of time to save the data (without "wait" command it closes the window too quickly and entered data is not saved
    cy.wait(2000);
    getIconClose().eq(0).click();

    //Reopen the same issue to check that original estimation is saved
    getBacklogList().contains(issueName).click();
    cy.contains("10h estimated").should("be.visible");

    //Update estimation
    getInputNumberHours().eq(0).clear().click().type(20);
    cy.wait(2000);
    getIconClose().eq(0).click();

    //Reopen the same issue to check that original estimation is saved
    getBacklogList().contains(issueName).click();
    cy.contains("20h estimated").should("be.visible");

    //Removing previously added estimation
    getInputNumberHours().eq(0).click().clear();
    cy.wait(2000);
    getIconClose().eq(0).click();

    //Reopen issue and assert that estimated value is removed
    getBacklogList().contains(issueName).click();
    cy.contains("20h estimated").should("not.exist");
  });

  it("Should log and remove logged time", () => {
    //Clear the estimated time of existing ticket (original estimate, time spent)
    getInputNumberHours().eq(0).click().clear();
    getIconStopwatch().click();
    getTrackingModal().contains("Time tracking").click();
    getInputNumberHours().eq(1).click().clear();
    getTrackingModal().contains("Done").click();

    //Log time
    getIssueDetailsModal().contains("No time logged");
    getIconStopwatch().click();
    getTrackingModal().contains("Time tracking").click();
    getInputNumberHours().eq(1).click().type(2);
    getInputNumberHours().eq(2).click().type(5);
    getTrackingModal().contains("Done").click();

    //Assert that logged time is visible
    getIssueDetailsModal().contains("2h logged");
    getIssueDetailsModal().contains("5h remaining");
    getIssueDetailsModal().contains("No time logged").should("not.exist");

    //Remove logged time
    getIconStopwatch().click();
    getTrackingModal().contains("Time tracking").click();
    getInputNumberHours().eq(1).click().clear();
    getInputNumberHours().eq(2).click().clear();
    getTrackingModal().contains("Done").click();

    //Assert that logged value is removed
    getIssueDetailsModal().contains("2h logged").should("not.exist");
    getIssueDetailsModal().contains("No time logged");
  });
});
