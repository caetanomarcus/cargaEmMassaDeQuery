var fs = require('fs');


const usuario = [
    {
        colaborador: "Quero sextar",
        gestor: "Gestor José",
        emaildoGestor: "gestorjose@hotmail"
    },
    {
        colaborador: "Vem sábado",
        gestor: "blablabla",
        emaildoGestor: "algua@hotmail"
    }
]

let html =  `
INSERT INTO [dbo].[Notifications]
([To]
,[From]
,[Origin]
,[Message]
,[IsHtml]
,[Created]
,[Status]
,[Subject])
VALUES
('[EMAIL]',
'NULL',
'FeedbackNotificationToEvaluated',
'[USER], [MANAGER], [EMAIL]',
1,
GETDATE(),
1,
'Etapa de Feedback | Você possui uma ação pendente' )
` ;

const generateQuerys = () => {

    for (let i = 0; i < usuario.length; i++) {
        let query = html
        query = query.replace('[USER]', usuario[i].colaborador);
        query = query.replace('[MANAGER]', usuario[i].gestor)
        query = query.replace('[EMAIL]', usuario[i].emaildoGestor);

        fs.appendFile(`usuariosQuery.txt`, query, function( err) {
            if (err) {
                return console.log(err);
            }
        })
    }
}

generateQuerys();


