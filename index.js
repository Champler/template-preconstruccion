const express = require('express');
const path = require('path');
var fs = require('fs');
var pdf = require('dynamic-html-pdf');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const html = fs.readFileSync('index.html', 'utf-8');


const data = {
    "descripcion": "Nombre de la obra",
    "nrop3": "SCP023J",
    "partido": "CABA",
    "sistema": "No especificado",
    "razon_social": "Baitcon S.A.",
    "nro_acta": 1,
    "fecha": "31/01/2023",
    "participantes": [
        {
            "nombreyapellido": "Alfredo Montañés",
            "funcion": "Técnico",
            "aysa": "",
            "contratista": "X"
        },
        {
            "nombreyapellido": "Juan Pérez",
            "funcion": "Gerente",
            "aysa": "X",
            "contratista": ""
        },
    ],
    "documentacion": [
        {
            "area": "Seguridad e Higiene",
            "documentos": [
                {
                    "nro": 1,
                    "documento": "D_DRH_HS_014 Protocolo de Prevención del Coronavirus",
                    "fecha_entrega": "14/02/2023",
                    "contratista": "X",
                    "aysa": "",
                    "comentarios": "Documentación obligatoria"
                },
                {
                    "nro": 2,
                    "documento": "D-DRH-HS-012 Pautas para el Control de Documentación a Empresas Contratistas",
                    "fecha_entrega": "28/03/2023",
                    "contratista": "X",
                    "aysa": "",
                    "comentarios": "Documentación opcional"
                }
            ]
        },
        {
            "area": "Género",
            "documentos": [
                {
                    "nro": 1,
                    "documento": "Declaración jurada según la conformación del personal afectado a la obra",
                    "fecha_entrega": "28/02/2023",
                    "contratista": "X",
                    "aysa": "",
                    "comentarios": ""
                },
                {
                    "nro": 2,
                    "documento": "Cuadro conformación del personal afectado a la obra.",
                    "fecha_entrega": "15/03/2023",
                    "contratista": "X",
                    "aysa": "",
                    "comentarios": ""
                },
                {
                    "nro": 3,
                    "documento": "Currículum vitae de la o las personas trabajar en tales temáticas en la actividad / curso",
                    "fecha_entrega": "31/03/2023",
                    "contratista": "X",
                    "aysa": "",
                    "comentarios": ""
                }
            ]
        }
    ],
    "contacto": [
        {
            "nombreyapellido": "Alfredo Montañés",
            "telefono": "1155556666",
            "correo": "alfredo.montanes@datco.net"
        },
        {
            "nombreyapellido": "Tobias Racedo",
            "telefono": "1155554444",
            "correo": "tobias.racedo@datco.net"
        }
    ]
}

app.get('/', async (req, res) => {
    const options = {
        format: "A4",
        orientation: "portrait",
    };
    
    let document = {
        type: 'file',    
        template: html,
        context: {data},
        path: "./preconstruccion" + ".pdf"    
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