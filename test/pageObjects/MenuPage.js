const BasePage = require("./BasePage.js")
class MenuPage extends BasePage{
    constructor() {
      super();
      this.basePage = new BasePage()
    }

    get btnLogin () { return $("div.global-user:first-of-type a[data-affiliatename='espn']") }
    get lblUser () { return $("#global-user-trigger + div li.display-user > span")}
    get btnLogOut () { return $('#global-header  ul.account-management a.small') }
    get btnProfile () { return $("#global-header a[tref$='/members/v3_1/modifyAccount']")}
    
    /**
     * @memberof MenuPage
     */
    async goLoginIframe(){
      await this.clickElement(this.btnLogin)
    }

    async verifyNameExists(){
      //await this.waitElementNotPresent(this.lblUser)
      //await this.lblUser.waitForExist();
      await this.waitElementVisibility(this.lblUser)
      //await this.lblUser.waitForDisplayed();
      const data = await this.readJsonFile("test/data/dataUser.json")
      await expect(this.lblUser).toHaveTextContaining(data.users[0].firstName);
    }

    async verifyNameNotExists(){
      await this.waitElementNotPresent(this.lblUser);

      // await this.lblUser.waitForExist({reverse: true, timeout: 5000 });
      await expect(this.lblUser).not.toBePresent()

    }

    async doLogout(){
      await this.clickElement(this.btnLogOut);
      //await this.basePage.waitThenClick(this.btnLogOut)    
    }
    
    async goProfile(){
      //await this.basePage.waitThenClick(this.btnProfile)
      await this.clickElement(this.btnProfile)
    }


}
module.exports = new MenuPage();