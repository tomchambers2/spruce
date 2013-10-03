'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Spruce App', function() {

  beforeEach(function() {
    browser().navigateTo('index.html#/get-started');
    input('user.username').enter('testrunner@test.com');
    input('user.password').enter('abc');
    element('#login-button').click();
    sleep(2);
  });
  describe('NewCbtEntry view', function() {
    it('step 1 should have one textarea, and one button', function() {
      browser().navigateTo('index.html#/entries/new');
      expect(element('h1.nav-title').count()).toBe(1);
      expect(element('textarea').count()).toBe(1);
      console.log(element('button'))
      expect(element('button').count()).toBe(1);
    });
    it('shoul allow me to submit step 1', function() {
      browser().navigateTo('index.html#/entries/new');
      expect(element('h1.nav-title').count()).toBe(1);
      input('cbtEntry.concern').enter("People avoid sitting next to me on the bus");
      element('button').click();
      expect(browser().window().search()).toEqual('1');
    });

  });
});
