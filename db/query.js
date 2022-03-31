const {Pool} = require('pg');
const url = require('url')

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "repertorio",
    password: "raby1949",
    port: 5432,
});

//INSERTAR - C (CREATE)

const insertar = async (datos)=>{
    const consulta ={
        text: "INSERT INTO repertorio (cancion, artista, tono) values($1, $2, $3) RETURNING*;",
        values: datos,
    };

    try{
        const result = await pool.query(consulta);
        return result;

    }catch(error){
        console.log(error)
        return error;
    }
};

//LEER -R( READ)

const consultar = async () => {
    try {
        const result = await pool.query("SELECT * FROM repertorio");
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
};

//EDITAR -U (UPDATE)

const editar = async (datos) => {
    console.log(datos);
    const consulta = {
        text: "UPDATE repertorio SET cancion = $2, artista = $3, tono = $4 WHERE id=$1 RETURNING *;",
        values: datos,
    };
    try {
        const result = await pool.query(consulta);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

//EDITAR -D (DELETE)

const eliminar = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM repertorio WHERE id = '${id}'`);
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }

};



module.exports = {insertar, consultar, editar, eliminar}