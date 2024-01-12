describe("Issue details editing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  it("Should update type, status, assignees, reporter, priority successfully", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click("bottomRight");
      cy.get('[data-testid="select-option:Story"]')
        .trigger("mouseover")
        .trigger("click");
      cy.get('[data-testid="select:type"]').should("contain", "Story");

      cy.get('[data-testid="select:status"]').click("bottomRight");
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should("have.text", "Done");

      cy.get('[data-testid="select:assignees"]').click("bottomRight");
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click("bottomRight");
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should("contain", "Baby Yoda");
      cy.get('[data-testid="select:assignees"]').should(
        "contain",
        "Lord Gaben"
      );

      cy.get('[data-testid="select:reporter"]').click("bottomRight");
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should(
        "have.text",
        "Pickle Rick"
      );

      cy.get('[data-testid="select:priority"]').click("bottomRight");
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should("have.text", "Medium");
    });
  });

  it("Should update title, description successfully", () => {
    const title = "TEST_TITLE";
    const description = "TEST_DESCRIPTION";

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get(".ql-snow").click().should("not.exist");

      cy.get(".ql-editor").clear().type(description);

      cy.contains("button", "Save").click().should("not.exist");

      cy.get('textarea[placeholder="Short summary"]').should(
        "have.text",
        title
      );
      cy.get(".ql-snow").should("have.text", description);
    });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');

  // Bonus assignment: TASK 1 //
  const expectedLength = 5;
  let priorityArray = [];
  let defaultValue = "";
  let priorityOption = "";

  it.only("Should have five elements in the issue priority dropdown", () => {
    // Get the default value of priority dropdown
    cy.get('[data-testid="select:priority"]')
      .invoke("text")
      .then((selectedText) => {
        // 'selectedText' now contains the text of the selected item in the dropdown
        defaultValue = selectedText.trim();

        // Push the value of the selected option into the priorityArray
        priorityArray.push(defaultValue);

        // Lets also log the default value, although this was not requested in the task
        cy.log(
          `Default value: ${defaultValue}, Array length: ${priorityArray.length}`
        );

        // Click the drowdown to see options
        cy.get('[data-testid="select:priority"]').click();

        // Get all options and loop through them
        cy.get('[data-testid^="select-option:"]')
          .each(($option) => {
            // Get the text value from the current element
            priorityOption = $option.text().trim();

            // Only look values that are not default
            if (priorityOption != defaultValue) {
              // Save the text value into the priorityArray
              priorityArray.push(priorityOption);

              // Print out the added value and length of the array
              cy.log(
                `Added value: ${priorityOption}, Array length: ${priorityArray.length}`
              );
            }
          })
          .then(() => {
            // Assert that the array has the same length as expected
            expect(priorityArray.length).to.equal(expectedLength);
          });
      });
  });

  // Bonus assignment: TASK 2 //

  it.only("Check that the reporter’s name has only characters in it.", () => {
    // Access the reporter name
    cy.get('[data-testid="select:reporter"]')
      .invoke("text")
      .then((reporterName) => {
        // Assert that the reporter's name has only characters using regex
        expect(reporterName).to.match(/^[A-Za-z\s]+$/);
      });
  });
});
