const BasePage = require("./BasePage")
class LoginIframe extends BasePage {
    constructor() {
        super();
        this.basePage = new BasePage()
    }

    get iframe () { return $('#oneid-iframe')}
    get btnSignUp () { return $('#BtnCreateAccount') }
    get txtName () { return $("#InputFirstName") }
    get txtLastName () { return $("#InputLastName") }
    get txtEmail () { return $("#InputEmail") }
    get txtPassword () { return $("#password-new") }
    get btnSignUpAccount () { return $("#BtnSubmit") }
    get frmRegistro () { return $(".form-section.registration")}
    //loading
    get loading () { return $('.state-success') } //.loading-container
    //login
    get txtUserName () { return $("#InputLoginValue") }
    get txtUserPass () { return $("#InputPassword") }
    get btnLogIn () { return $("#BtnSet-wrapper #BtnSubmit") }
    //delete
    get btnDeleteAccount () { return $("#AccountDeleteLink")}
    get frmUpdate () { return $("form.update-profile")}
    get btnConfirmDeleteAccount () { return $("#BtnSubmit")}
    get lblTitle () { return $("#Title > span")}
  
    async goSignUp() {
        await this.changeToIframe(this.iframe)
        //await browser.switchToFrame(await this.iframe);
        await this.clickElement(this.btnSignUp)
    }

    async createAccountAndReturnHome() {
        const data = await this.readJsonFile("test/data/dataUser.json")
        await this.sendElementText(this.txtName, data.users[0].firstName)
        await this.sendElementText(this.txtLastName, data.users[0].lastName)
        await this.sendElementText(this.txtEmail, data.users[0].email)
        await this.sendElementText(this.txtPassword, data.users[0].password)
        await this.doElementScroll(this.btnSignUpAccount);
        await this.clickElement(this.btnSignUpAccount)
        await this.changeToParentIframe()    
        
    }

    async validateLoadingNotVisible() {
        await this.waitElementNotPresent(this.loading)
        await expect(this.loading).not.toBePresent()

    }

    async doLogin() {
        const data = await this.readJsonFile("test/data/dataUser.json")
        await this.changeToIframe(this.iframe)
        await this.sendElementText(this.txtUserName,data.users[0].email)
        await this.sendElementText(this.txtUserPass,data.users[0].password)
        await this.clickElement(this.btnLogIn)
        await this.changeToParentIframe()
    }

    async deleteAccount(){
        await this.changeToIframe(this.iframe)
        await this.doElementScroll(this.btnDeleteAccount)
        await this.clickElement(this.btnDeleteAccount)
        await this.waitElementNotPresent(this.frmUpdate)
        await this.clickElement(this.btnConfirmDeleteAccount)   
    }

    async verifyDeleteAccount() {
        await this.waitElementVisibility(this.lblTitle)
        await expect(this.lblTitle).toHaveTextContaining("Your account has been deleted.")
    }

}
module.exports = new LoginIframe();