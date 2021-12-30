const fs = require('fs')
const pdfparse = require('pdf-parse')
const ObjectsToCsv = require('objects-to-csv')
const AdmZip = require("adm-zip");

const pdffile = fs.readFileSync('arquivo.pdf')


/* Acessando PDF e coletando os dados */

pdfparse(pdffile).then(function (data) {
  let text
  text = JSON.stringify(data.text)



  /* Tabela 30 = 210140 - 210274 */

  let tabela30 = text.substring(210205, 210275)
  let array = tabela30.split('\\n')
  const aux = []
  for (let i in array) {
    aux[i] = { codigo: array[i].charAt(0), Descricao: array[i].substring(2) }

  }

  /* Tabela 31 = 211346 - 219386 */


  let tabela31 = text.substring(211415, 219384)

  let array2 = tabela31.split('\\n')
  const aux2 = []
  for (let i in array2) {
    if (i >= 0 && i <= 8) {
      aux2[i] = { codigo: array2[i].charAt(0), Descricao: array2[i].substring(2) }
    }

    else if (i >= 9 && i <= 98) {
      aux2[i] = { codigo: array2[i].substring(0, 1), Descricao: array2[i].substring(3) }
    }

    else if (i >= 99 && i <= array2.length) {
      aux2[i] = { codigo: array2[i].substring(0, 2), Descricao: array2[i].substring(4) }
    }
  }


  /* A tabela 32 não está sendo reconhecida pelo nodeJS */


  /* Salvando em csv e zipando as tabelas */

  (async () => {
    const csv = new ObjectsToCsv(aux);

    await csv.toDisk('./tabela30.csv');

    console.log(await csv.toString());
  })();

  (async () => {
    const csv = new ObjectsToCsv(aux2);

    await csv.toDisk('./tabela31.csv');

    console.log(await csv.toString());


    let zip = new AdmZip();

    zip.addLocalFile("tabela30.csv");
    zip.addLocalFile("tabela31.csv");
    zip.writeZip("Teste_Lucas_Pereira.zip");

    fs.unlinkSync('./tabela30.csv')
    fs.unlinkSync('./tabela31.csv')
  })();


})
