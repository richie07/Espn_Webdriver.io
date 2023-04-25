//const allureReporter = require('@wdio/allure-reporter').default

const HomePage = require("../pageObjects/HomePage.js");
const menuPage = require("../pageObjects/MenuPage.js");
const loginIframe = require("../pageObjects/LoginIframe.js");
const user = require("../data/User_BD");


describe("Test Login Espn", ()=> {
  //this.retries(1)  
  //allureReporter.addFeature("Página de inicio de sesión - Validar inicio de sesión");
  //allureReporter.addSuite('Suite');
  
  let homePage = new HomePage();
  before(async() => {
    //allureReporter.addStory('storyName')
    await homePage.writeJsonFileFromBD(user);
    await homePage.open(); 
  })

  it("1 Validate create account and log out", async () => {
    //allureReporter.addSubSuite('sdf')
    //allureReporter.addFeature("Test name: My new test name");
    //allureReporter.addSeverity("critical");
    await homePage.goMenuLogin();
    await menuPage.goLoginIframe();
    await loginIframe.goSignUp();
    await loginIframe.createAccountAndReturnHome();
    await loginIframe.validateLoadingNotVisible();
    await homePage.waitIcoLoginToBeDisplayed();
    //await browser.debug("Stop");
    await homePage.goMenuLogin();
    await menuPage.verifyNameExists()
    await menuPage.doLogout();
    await homePage.waitIcoLoginToBeDisplayed();
    await homePage.goMenuLogin();
    await menuPage.verifyNameNotExists()

  });

  it("Verify login in page", async () => {
    //allureReporter.addSubSuite('sdf')
    //allureReporter.addFeature("Test name: My new test name");
    //allureReporter.addSeverity("critical");
    await homePage.goMenuLogin();
    await menuPage.goLoginIframe();
    await loginIframe.doLogin()
    await loginIframe.validateLoadingNotVisible()
    //await homePage._waitIcoLoginToBeDisplayed();
    await homePage.goMenuLogin();
    await menuPage.verifyNameExists()
    await menuPage.doLogout();

  });
  
  
});
