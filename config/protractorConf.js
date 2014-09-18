exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar:'../selenium/selenium-server-standalone-2.35.0.jar',
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },
  rootElement: 'html',
  //baseUrl: '',
  baseUrl: 'http://localhost:8000/index.html#/',
  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['../test/e2e/scenarios.js'],


  // Options to be passed to Jasmine-node.
  // jasmineNodeOpts: {
  //   showColors: true,
  //   specs: ['/test/e2e/scenarios.js']
  // }
};
