const express = require("express");
const app = express();
const fs = require("fs");
const expressFileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("img", express.static(__dirname + "/assets/img"));
app.listen(3000, () => {
    console.log("Terminal Ok");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/formulario.html");
});

app.use(
    expressFileUpload({
        limits: { fileSize: 5000000 },
        abortOnLimit: true,
        responseOnLimit: "No debe ser superior a 5 Mb",
    })
);

app.post("/imagen", (req, res) => {
    const { target_file } = req.files;
    const { posicion } = req.body;
    const name = `imagen-${posicion}`;
    target_file.mv(`${__dirname}/assets/img/${name}.jpg`, (err) => {                                                                  
        res.sendFile(__dirname + "/collage.html");
    });
});

app.get("/deleteImg/:nombre", (req, res) => {
    const { nombre } = req.params;
    fs.unlink(`${__dirname}/assets/img/${nombre}`, (err) => {
        if (err) {
            res.send("No existe el archivo");
        } else {
            res.sendFile(__dirname + "/collage.html");
        }
    });
});