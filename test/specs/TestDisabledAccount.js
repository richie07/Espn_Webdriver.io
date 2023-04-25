//const allureReporter = require('@wdio/allure-reporter').default

const HomePage = require("../pageObjects/HomePage.js");
const menuPage = require("../pageObjects/MenuPage.js");
const loginIframe = require("../pageObjects/LoginIframe.js");
const user = require("../data/User_BD.js");

let homePage = new HomePage();
describe("Test disabled account", ()=> {
  //this.retries(1)  
  //allureReporter.addFeature("Página de inicio de sesión - Validar inicio de sesión");
  //allureReporter.addSuite('Suite');
  
  before(async() => {
    //allureReporter.addStory('storyName')
    await homePage.writeJsonFileFromBD(user);
    await homePage.open();
  })

  it.only("Verify account disable", async () => {
    //allureReporter.addSubSuite('sdf')
    //allureReporter.addFeature("Test name: My new test name");
    //allureReporter.addSeverity("critical");
    await homePage.goMenuLogin();
    await menuPage.goLoginIframe();
    await loginIframe.goSignUp();
    await loginIframe.createAccountAndReturnHome();
    await loginIframe.validateLoadingNotVisible();
    await homePage.waitIcoLoginToBeDisplayed();
    await homePage.goMenuLogin();
    await menuPage.goProfile()
    await loginIframe.deleteAccount()

  });
  
  
});
