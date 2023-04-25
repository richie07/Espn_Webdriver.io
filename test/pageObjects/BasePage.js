const fs = require('fs');
class BasePage{

    /**
     * Go home page
     * @memberof BasePage
     */
    async visit(){
        await browser.url(browser.options.baseUrl); 
    }

        /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`https://the-internet.herokuapp.com/${path}`)
    }

    /**
     * Wait for page to be loaded
     *
     * @memberof BasePage
     */
    async waitLoadedPage(){
        await browser.waitUntil(async () => {
            const readyState = await browser.execute(() => document.readyState);
            return readyState === 'complete';
        }, { timeout: 30000 });
    }

    /**
     *Send text to element
     *
     * @param {*} element
     * @param {*} text
     */
    async sendElementText(element, text) {
        this.waitElementEnabled(element)
        await element.setValue(text);
    }

    /**
     *Wait to click on element
     *
     * @param {*} element
     * @memberof BasePage
     */
    async waitElementClickable(element) {
        await element.waitForClickable()
    }

    /**
     *Click on element
     *
     * @param {*} element
     * @memberof BasePage
     */
    async clickElement(element) {
        await this.waitElementClickable(element)
        await element.click();
    }

    /**
     *Wait for element to be visible
     *
     * @param {*} element
     * @memberof BasePage
     */
    async waitElementVisibility(element) {
        await element.waitForDisplayed();
    }

    async waitElementEnabled(element) {
        await element.waitForEnabled();
    }

    /**
     *Change to Iframe
     *
     * @param {*} iframe
     * @memberof BasePage
     */
    async changeToIframe(iframe) {
        await this.waitElementPresent(iframe);
        await browser.switchToFrame(await iframe);
    }

    /**
     *Change to Parent Iframe
     *
     * @memberof BasePage
     */
     async changeToParentIframe() {
        await browser.switchToParentFrame()
    }

    /**
     *Wait for element no exist
     *
     * @param {*} element
     * @memberof BasePage
     */
    async waitElementNotPresent(element) {
        await element.waitForExist({reverse: true});
    }

      /**
     *Wait for element exist
     *
     * @param {*} element
     * @memberof BasePage
     */
     async waitElementPresent(element) {
        await element.waitForExist();
    }

    async doElementScroll(element) {
        await this.waitElementEnabled(element)
        await element.scrollIntoView();
    }

    /**
     *Write Json from Class BD_user
     *
     * @param {*} user
     * @memberof BasePage
     */
     async writeJsonFileFromBD(user){
        let filePath = __dirname + '/../data/dataUser.json'
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.log('The file does not exist.');
            } else {
                console.log('The file exists!');
                // Leer archivo JSON
                let data = JSON.parse(fs.readFileSync(filePath))
                // Reemplazar valores en el archivo JSON
                data.users[0].firstName = user.getFirstName();
                data.users[0].lastName = user.getLastName();
                data.users[0].password = user.getPassword();
                data.users[0].email = user.getEmail();
                // Escribir archivo JSON
                fs.writeFileSync(filePath, JSON.stringify(data));
            }
        });        
    }

    /**
     *Read Json file from path
     *
     * @param {*} path
     * @memberof BasePage
     */
    async readJsonFile(path){          
        const fileExists = fs.existsSync(path);
        console.log(fileExists ? 'El archivo existe' : 'El archivo no existe')
        const datos = fs.readFileSync("test/data/dataUser.json");
        // Convierte el archivo JSON en un objeto JavaScript
        const objetoDatos = JSON.parse(datos);
        return objetoDatos;
    }

}
module.exports = BasePage;