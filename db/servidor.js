const http = require('http');
const fs = require('fs');
const url = require('url')
const path = require('path');
const {insertar, consultar, editar, eliminar} = require("./query")
const port = 3000;

http.createServer(async (req, res)=>{

    if (req.url == "/" && req.method === "GET") {
        res.setHeader('Content-Type', 'text/html');
        const html = fs.readFileSync(path.join(__dirname, '..','index.html'), "utf8");
        res.end(html);
    }

    if (req.url == "/script") {
        res.setHeader('Content-Type', 'text/javascript');
        const script = fs.readFileSync(path.join(__dirname, '..','/assets/js/script.js'), "utf8");
        res.end(script);
    }

    if (req.url == "/style") {
        res.setHeader('Content-Type', 'text/css');
        const css = fs.readFileSync(path.join(__dirname, '..','/assets/css/style.css') , "utf8");
        res.end(css);
    }


    /** 1. REQUERIMIENTO: Crear una ruta POST /cancion que reciba los datos correspondientes a una canción y
    realice a través de una función asíncrona la inserción en la tabla repertorio.*/
    if ((req.url == "/cancion" && req.method == "POST")) {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const datos = Object.values(JSON.parse(body));
            const respuesta = await insertar(datos);
            res.end(JSON.stringify(respuesta));
        });
    };
    
    
    /**2 REQUERIMIENTO: Crear una ruta GET /canciones que devuelva un JSON con los registros de la tabla
    repertorio.*/

    if (req.url == "/canciones" && req.method === "GET") {
            
        const registros = await consultar();
       // console.log(registros);
        res.end(JSON.stringify(registros.rows));
        }

    /** 3 REQUERIMIENTO: Crear una ruta PUT /cancion que reciba los datos de una canción que se desea editar, ejecuta una función asíncrona para hacer la consulta SQL correspondiente y
    actualice ese registro de la tabla repertorio.*/    

    if (req.url == "/cancion" && req.method == "PUT") {
        let body = "";
        req.on("data", (chunk) => {
        body += chunk;
        });
        req.on("end", async () => {
        const datos = Object.values(JSON.parse(body));
        const respuesta = await editar(datos);
        res.end(JSON.stringify(respuesta));
        });
        }


    /**4 REQUERIMIENTO: Crear una ruta DELETE /cancion que reciba por queryString el id de una canción y realiza una consulta SQL.*/

     if (req.url.startsWith("/cancion?") && req.method == "DELETE") {
        const { id } = url.parse(req.url, true).query;
        const respuesta = await eliminar(id);
        res.end(JSON.stringify(respuesta));
        }


}).listen(port, ()=>{console.log(`Servidor levantado, puerto: ${port}`)}); 