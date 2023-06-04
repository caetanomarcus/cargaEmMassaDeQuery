var fs = require('fs');
var emails = require('./emails')
const bfj = require('bfj');




let html =  `
INSERT INTO [dbo].[Notifications] ([To], [From], [Origin], [Message], [IsHtml], [Created], [Status], [Subject], [DataToSend])
VALUES ($To, $From, $Origin)
` ;

const generateQuerys = (data2) => {

    const queryPerText = 1000

    const totalTxt = Math.ceil(data2.length/queryPerText);

    const totalTxtArray = new Array(totalTxt).fill(1).map((item, index) => index*queryPerText);

    console.log("total txt array", totalTxtArray)

    for (let x = 0; x < totalTxtArray.length; x++){
        let totalQuery = ''
        for (let i = 0; i < data2.slice(totalTxtArray[x], (totalTxtArray[x] + (queryPerText + (x ===0 ? 1 : 0)))).length; i++) {
            let query = html
            query = query.replace('[ID]', data2.slice(totalTxtArray[x], (totalTxtArray[x] + (queryPerText + (x ===0 ? 1 : 0))))[i].Id);
            
            query = decodeURI(query.replace("[EMAIL]", data2.slice(totalTxtArray[x], (totalTxtArray[x] + (queryPerText + (x ===0 ? 1 : 0))))[i].Message).replace("indicado", "indicado(a)"));
         

            totalQuery = totalQuery + "\n" + "\n" + query

        }

        console.log("lenght total de cada bagulho " + x , data2.slice(totalTxtArray[x], (totalTxtArray[x] + (queryPerText + (x === 0 ? 1 : 0)))).length)
         fs.appendFile(`usuariosQuery${x}.txt`, totalQuery, function( err) {
            if (err) {
                return console.log(err);
            }
        })
    }

 
}

const readJson =  () => {
    bfj.read(("./Results_Emails.json"))
  .then(data=> {
    generateQuerys(data);
  })
  .catch(error => {
    // :(
  });
}



const start = () => {
     readJson();
}

start();




