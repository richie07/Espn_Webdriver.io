const BasePage = require('./BasePage.js')

class HomePage extends BasePage{
    constructor() {
        super();
        this.basePage = new BasePage()
    }

    get icoLogin () { return $('#global-user-trigger') }
   
    async open() {
        this.basePage.visit() 
        await this.waitLoadedPage();    
        //console.log(`Browser>>object ${JSON.stringify(browser)}`)
    }

    async goMenuLogin(){
        this.clickElement(this.icoLogin)
        console.log(`Click >> ${await this.icoLogin.selector}`)    
    }

    async waitIcoLoginToBeDisplayed() {
        await this.waitElementNotPresent(this.icoLogin)
        await this.waitElementClickable(this.icoLogin);
        await expect(this.icoLogin).toBeEnabled()
    }

    /**
     * overwrite specific options to adapt it to page object
     */
        open2 () {
            return this.open('login');
        }

}
module.exports = HomePage;