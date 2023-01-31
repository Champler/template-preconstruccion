const express = require('express');
const path = require('path');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const html = fs.readFileSync('index.html', 'utf-8');
const img = fs.readFileSync('aysa.svg', 'utf-8');


app.post('/', async (req, res) => {
    const data = await req.body
    const options = {
        format: "A4",
        orientation: "portrait",
        header: {
            "contents": {
                default: `<table style="font-size: 10px; border: 1px solid black; width: 90%; margin: auto; border-collapse: collapse; page-break-inside: avoid; margin-bottom: 20px; margin-top:10px;" > <tr style="border: 1px solid black;"> <td style="width: 15%; text-align: center;">${img}</td><td style="width: 40%; text-align: center;">Acta Nº ${data.nro_acta}</td></tr><tr style="border: 1px solid black;"><td style="width: 30%; vertical-align: top;"><p style="margin: 5px 0; padding-left: 5px;" class="border-bot">Número de P3: ${data.nrop3}</p><p style="margin: 5px 0; padding-left: 5px;" class="border-bot">Partido: ${data.partido}</span><p style="margin: 5px 0; padding-left: 5px;" class="border-bot">Zona: ${data.sistema}</span><p style="margin: 5px 0; padding-left: 5px;">Fecha: ${data.fecha}</p></td><td style="width: 25%; vertical-align: top;"><p style="margin: 5px 0; padding-left: 5px;" class="border-bot">Contratista: ${data.razon_social}</span><p style="margin: 5px 0; padding-left: 5px;">${data.descripcion}</p></td></tr></table >`,
            },
            height: "65mm",
        },
        footer: { "height": "25mm", }
    };

    let document = {
        type: 'file',
        template: html,
        context: { data },
        path: "./preconstruccion"+ Date.now() + ".pdf",

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