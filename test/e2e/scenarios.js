'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//var util = require('util');
describe('Spruce App', function() {
  var ptor
  ptor = protractor.getInstance();


  describe('NewCbtEntry view', function() {
    it('should allow me to login', function() {
      ptor.get('#/get-started');
      //expect(ptor.findElements(protractor.By.input('user.username'))).toBe(1);

      //ptor.findElements(protractor.By.css('body'));
      ptor.findElement(protractor.By.id('login-email')).sendKeys('testrunner@test.com');
      ptor.findElement(protractor.By.id('login-password')).sendKeys('abc');
      ptor.findElement(protractor.By.id('login-button')).click();
      ptor.sleep(2000);

    });
    it('should should have redirected me to dashboard, where I click new entry', function() {
      //ptor.get('#/dashboard');


//      ptor.findElement(protractor.By.id('make-new-entry')).click();
      //expect(ptor.findElement(protractor.By.id('make-new-entry')).isDisplayed()).toBe(true);


    });
    it('Should have redirected to NewCBTEntry Should have correct number of buttons, textareas, and inputs (regression test)', function() {
      ptor.get('#/entries/new');
      ptor.sleep(1000);
      expect(ptor.isElementPresent(protractor.By.tagName('textArea'))).toBe(true);
      //olark inputs too
      ptor.findElements(protractor.By.tagName('textArea')).then(function(el){
        expect(el.length).toBe(8)
      });
      ptor.findElements(protractor.By.tagName('input')).then(function(el){
        expect(el.length).toBe(2)
      });
      ptor.findElements(protractor.By.tagName('button')).then(function(el){
        expect(el.length).toBe(1)
      });
    });

    it('shoul allow me to submit step 1, and move to step 2', function() {
      ptor.findElement(protractor.By.id('situation-textarea')).sendKeys("People avoid sitting next to me on the bus");

      ptor.findElement(protractor.By.id('stage-1-btn')).click();
      expect(ptor.findElement(protractor.By.id('emotion-list')).isDisplayed()).toBe(true);
    });
    it('Should allow me to add emotions', function() {
      ptor.findElement(protractor.By.id('emotion-entry')).sendKeys("ashamed");
      ptor.findElement(protractor.By.id('add-emotion')).click();
      ptor.findElement(protractor.By.id('emotion-entry')).sendKeys("insecure");
      ptor.findElement(protractor.By.id('add-emotion')).click();
      ptor.findElements(protractor.By.className('emotion')).then(function(el){
        expect(el.length).toBe(2)
      });
    });
    it('Should allow me to add emotions', function() {
      ptor.findElement(protractor.By.id('emotion-entry')).sendKeys("ashamed");
      ptor.findElement(protractor.By.id('add-emotion')).click();
      ptor.findElement(protractor.By.id('emotion-entry')).sendKeys("insecure");
      ptor.findElement(protractor.By.id('add-emotion')).click();
      ptor.findElements(protractor.By.className('emotion')).then(function(el){
        expect(el.length).toBe(2)
      });

    });
    it('should allow me to submit step 2, and enter my beliefs in step 3', function() {
      ptor.findElement(protractor.By.id('next-beliefs-btn')).click();

      ptor.findElement(protractor.By.id('beliefs-entry')).sendKeys("I must be so ugly that people don't want to sit next to me");
      ptor.findElement(protractor.By.id('beliefs-entry-btn')).click();
      ptor.findElement(protractor.By.id('beliefs-entry')).sendKeys("I must smell");
      ptor.findElement(protractor.By.id('beliefs-entry-btn')).click();
      ptor.findElements(protractor.By.className('emotion')).then(function(el){
        expect(el.length).toBe(2)
      });

    });
    it('should submit step 3, and show first belief in disputes section', function() {
      ptor.findElement(protractor.By.id('next-step-4')).click();
      ptor.findElement(protractor.By.id('yourBeliefContainer')).then(function(e){
        return e.getText();
      }).then(function(f){
        expect(f).toEqual("Your belief: I must be so ugly that people don't want to sit next to me");
      })
    });
    it('should display next belief in disputes section', function() {
      ptor.findElement(protractor.By.id('next-neg-belief')).click();
      ptor.findElement(protractor.By.id('yourBeliefContainer')).then(function(e){
        return e.getText();
      }).then(function(f){
        expect(f).toEqual("Your belief: I must smell");
      })
    });

  });
});
