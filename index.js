var fs = require('fs');
var data = require('./Results-FeedCreu-V2.json')
//var data = require('./notify-pair-evaluations-declined.json')
var templates = require('./notifications-template.json')

const templateObj = {}

for (const key of templates) {
    templateObj[key.Id] = key
}

const newmsg = '<body   bgcolor="#FFFFFF"   leftmargin="0"   topmargin="20px"   marginwidth="0"   marginheight="0" >   <table     id="Performance"     width="600"     height="auto"     border="0"     cellpadding="0"     cellspacing="0"     align="center"   >     <tr>       <td colspan="3" width="600" height="166" alt="Performance">         <img           src="[%IMGSRC%]"           width="600"           height="166"           alt=""         />       </td>     </tr>     <tr>       <td width="32" height="auto" rowspan="3" bgcolor="#EEF2F6"></td>       <td width="536" height="32" bgcolor="#EEF2F6"></td>       <td width="32" height="auto" rowspan="3" bgcolor="#EEF2F6"></td>     </tr>     <tr>       <td width="536" height="auto" valign="top" bgcolor="#EEF2F6">         <h1 style="font-family: Arial; color: #004691; font-size: 24px">           Olá, [%MANAGERNAME%]         </h1>         <p style="font-family: Arial; color: #767676; font-size: 16px">           <strong>[%USERNAME%]</strong> finalizou o registro do Feedforward recebido.           Acesse o sistema, complemente o registro e encerre o ciclo.         </p>         <br /><br />       </td>     </tr>     <tr>       <td width="536" height="23" bgcolor="#EEF2F6"></td>     </tr>     <tr>         <td colspan="3" width="600" height="16" bgcolor="#014693"></td>     </tr>   </table>   <!-- End Save for Web Slices --> </body>'

let html =  `
UPDATE Notifications
SET Message = '[Message]', Subject = '[Subject]'
WHERE Id = [ID]
` ;

const generateQuerys = () => {

    let totalQuery = ''

    for (let i = 0; i < data.length; i++) {
        let query = html

        query = query.replace('[Message]', data[i].Message.replace('finalizou o seu feedback recebido.', 'finalizou o registro do Feedforward recebido.').replace('Acesse o sistema, revise os registros e encerre o ciclo.', 'Acesse o sistema, complemente o registro e encerre o ciclo.'));
        query = query.replace('[Subject]', 'Etapa de Feedforward | Você possui uma ação pendente')
        query = query.replace('[ID]', data[i].Id);
        //query = (query.replace('[TEMPLATEBODY]', newmsg.replace('[%USERNAME%]', data[i].recipientName).replace('[%USEREVALUATE%]', data[i].evaluatedName).replace('[%USERINDICATED%]', data[i].evaluatorName).replace('[%JUSTIFICATION%]', data[i].justification).replace('[%CYCLE%]', data[i].cycleTitle)));


        totalQuery = totalQuery + "\n" + "\n" + query

    }

    fs.appendFile(`Results-fifacreu-v2.txt`, totalQuery, function( err) {
        if (err) {
            return console.log(err);
        }
    })
}

generateQuerys();





