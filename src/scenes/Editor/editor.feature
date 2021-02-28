Feature Editor

  Scenario Starting where I left off
    Given I am editing an entry
    When I reload or I close and re-open the page
    And I open any page
    Then I will be redirected to the Editor
    And I will see the editor with the same content as before