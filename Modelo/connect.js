class Connect {
    constructor() { }

    connect(dataRequest, endpoin, method, callback) {

        const url = `http://localhost:3000/${endpoin}`;

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