const fs = require('fs');

module.exports= {

    waitThenClick: async function (element){       
        await element.waitForExist()
        await element.waitForDisplayed()       
        await element.isClickable()
        await element.click();  
    },
    readJsonFile: async function (path){          
        const fileExists = fs.existsSync(path);
        console.log(fileExists ? 'El archivo existe' : 'El archivo no existe')
        const datos = fs.readFileSync("test/data/dataUser.json");
        // Convierte el archivo JSON en un objeto JavaScript
        const objetoDatos = JSON.parse(datos);
        return objetoDatos;
    }
    
}