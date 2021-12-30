const fs = require('fs')
const pdfparse = require('pdf-parse')
const ObjectsToCsv = require('objects-to-csv')
const AdmZip = require("adm-zip");

const pdffile = fs.readFileSync('arquivo.pdf')



pdfparse(pdffile).then(function (data) {
    let text
    text = JSON.stringify(data.text)

    console.log(text.length)
    

    /* Tabela 30 = 210140 - 210274 */

    let tabela30 = text.substring(210205,210275)
    let array = tabela30.split('\\n')
    console.log(array)                              

    const aux = [
        {codigo: array[0].charAt(0), Descricao: array[0].substring(2)},
        {codigo: array[1].charAt(0), Descricao: array[1].substring(2)},
        {codigo: array[2].charAt(0), Descricao: array[2].substring(2)},
        {codigo: array[3].charAt(0), Descricao: array[3].substring(2)},
        {codigo: array[4].charAt(0), Descricao: array[4].substring(2)},
      ];


      (async () => {
        const csv = new ObjectsToCsv(aux);
       
        await csv.toDisk('./tabela30.csv');
       
        console.log(await csv.toString());
      })();


      let zip = new AdmZip();

zip.addLocalFile("tabela30.csv");
zip.writeZip("Teste_Lucas_Pereira.zip");


    /* 
    Tabela 31 = 211346 - 219386

    let tabela31 = text.substring(211346,219385) 

    console.log(tabela31)
*/
    
})
