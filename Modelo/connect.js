class Connect {
    constructor() { }

    
/**
 *Coneccion con la API utilzando fetch para hacer las peticiones al servidor
 *
 * @param {*} dataRequest Datos a enviar al servidor
 * @param {*} endpoin Ruta del servidor al que se connecta
 * @param {*} method Verbo de la peticion (GET, POST, PUT, DELETE)
 * @param {*} callback Funcion a ejecutar despues de la peticion
 * @memberof Connect
 */

 
connect(dataRequest, endpoint, method, callback) {

        const url = `http://localhost:3000/${endpoint}`;

        let config = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataRequest)
        };

        if (method.toUpperCase() === 'GET') {
            delete config.body;
        }

        fetch(url, config)
            .then(response =>
                response.json())
            .then(data => {
                console.log(data);
                callback(data);
            })
            .catch(error =>
                console.log("error", error));
    }
}