const express = require('express');
const path = require('path');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const html = fs.readFileSync('index.html', 'utf-8');
const img = fs.readFileSync('img.txt', 'base64');
const img2 = `data:image/jpg;base64,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`

app.post('/', async (req, res) => {
    const data = await req.body
    const options = {
        format: "A4",
        orientation: "portrait",
        header: {
            "contents": {
                default: `<table style="font-size: 10px; border: 1px solid black; width: 90%; margin: auto; border-collapse: collapse; page-break-inside: avoid; margin-bottom: 20px; margin-top:10px;" > <tr style="border: 1px solid black;"> <td style="width: 15%; text-align: center;"><img src="./logo.jpg" alt="logo-aysa" style="height: 50px;" /></td><td style="width: 40%; text-align: center;">Acta Nº ${data.nro_acta}</td></tr><tr style="border: 1px solid black;"><td style="width: 30%; vertical-align: top;"><p style="margin: 5px 0; padding-left: 5px;" class="border-bot">Número de P3: ${data.nrop3}</p><p style="margin: 5px 0; padding-left: 5px;" class="border-bot">Partido: ${data.partido}</span><p style="margin: 5px 0; padding-left: 5px;" class="border-bot">Zona: ${data.sistema}</span><p style="margin: 5px 0; padding-left: 5px;">Fecha: ${data.fecha}</p></td><td style="width: 25%; vertical-align: top;"><p style="margin: 5px 0; padding-left: 5px;" class="border-bot">Contratista: ${data.razon_social}</span><p style="margin: 5px 0; padding-left: 5px;">${data.descripcion}</p></td></tr></table >`,
            },
            height: "65mm",
        },
        footer: { "height": "25mm", }
    };

    let document = {
        type: 'file',
        template: html,
        context: { data },
        path: "./preconstruccion" + ".pdf",

    }

    pdf.create(document, options)
        .then(data => {
            console.log(data)
            res.status(200).send("Se creo un pdf de acuerdo a lo solicitado")
        })
        .catch(error => {
            res.send(error)
        });
});



app.listen(3030, () => {
    console.log('Servidor iniciado en http://localhost:3030');
});