const express = require('express');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');
const preconstruccion = fs.readFileSync('./templates/preconstruccion.html'  , 'utf-8');
const ndp_ods = fs.readFileSync('./templates/ndp_ods.html'  , 'utf-8');
const img = fs.readFileSync('aysa.svg', 'utf-8');


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const checker = (data) => {
    switch (data.doc_id) {
        case 'preconstruccion':
            return properties = {
                options : {
                    format: "A4",
                    orientation: "portrait",
                    header: {
                        "contents": {
                            default: `<table style="font-size: 10px; border: 1px solid black; width: 90%; margin: auto; border-collapse: collapse; page-break-inside: avoid; margin-bottom: 20px; margin-top:10px;" > <tr style="border: 1px solid black;"> <td style="width: 15%; text-align: center;">${img}</td><td style="width: 40%; text-align: center;">Acta Nº ${data.nro_acta}</td></tr><tr style="border: 1px solid black;"><td style="width: 30%; vertical-align: top;"><p style="margin: 5px 0; padding-left: 5px;" class="border-bot">Número de P3: ${data.nrop3}</p><p style="margin: 5px 0; padding-left: 5px;" class="border-bot">Partido: ${data.partido}</span><p style="margin: 5px 0; padding-left: 5px;" class="border-bot">Zona: ${data.sistema}</span><p style="margin: 5px 0; padding-left: 5px;">Fecha: ${data.fecha}</p></td><td style="width: 25%; vertical-align: top;"><p style="margin: 5px 0; padding-left: 5px;" class="border-bot">Contratista: ${data.razon_social}</span><p style="margin: 5px 0; padding-left: 5px;">Obra: ${data.descripcion}</p></td></tr></table >`,
                        },
                        height: "65mm",
                    },
                    footer: { "height": "25mm", }
                },
                document : {
                    type: 'buffer',
                    template: preconstruccion,
                    context: { data },
                }
            }

        case 'ndp_ods':
            return properties = {
                options:  {
                    format: "A4",
                    orientation: "portrait",
                },
                document: {
                    type: 'buffer',    
                    template: ndp_ods,
                    context: {data}, 
                }
            }
        default:
            return null
    }
}
app.post('/', async (req, res) => {
    const data = await req.body
    const properties = checker(data)
    if (properties) {
        
        pdf.create(properties.document, properties.options)
            .then(data => {
                res.status(200).send(data)
            })
            .catch(error => {
                res.send(error)
            });
    }
    else {
        res.status(400).send("Su solicitud no pudo ser procesada")
    }
});



app.listen(3030, () => {
    console.log('Servidor iniciado en http://localhost:3030');
});