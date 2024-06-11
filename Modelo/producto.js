class Producto extends Connect{
    constructor(){
        super();

        this.id_producto = "";
        this.referencia_producto = "";
        this.nombre_producto = "";
        this.stock_minimo = "";
        this.promedio_costo = "";
        this.precio_venta = "";
        this.imagen = "";
        this.estado_producto = "";
    }

    asignarDatos(data){
        this.id_producto = data.id_producto;
        this.referencia_producto = data.referencia_producto;
        this.nombre_producto = data.nombre_producto;
        this.stock_minimo = data.stock_minimo;
        this.promedio_costo = data.promedio_costo;
        this.precio_venta = data.precio_venta;
        this.imagen = data.imagen;
        this.estado_producto = data.estado_producto;
    }

    obtenerDatos(){
        return {
            id_producto: this.id_producto,
            referencia_producto: this.referencia_producto,
            nombre_producto: this.nombre_producto,
            stock_minimo: this.stock_minimo,
            promedio_costo: this.promedio_costo,
            precio_venta: this.precio_venta,
            imagen: this.imagen,
            estado_producto: this.estado_producto
        }
    }

    //Metodo para crear un producto
    createProduct(dataRequest, createCallback){
        const endpoint = "productos"
        const method = "POST"
        this.connect(dataRequest, endpoint, method, createCallback);
    }

    //Metodo para mostrar los productos
    getAllProductbyStore(id_almacen, getAllProductbyStoreCallback){
        const endpoint = `productos/almacen?id_almacen=${id_almacen}` 
        const method = "GET"
        this.connect({}, endpoint, method, getAllProductbyStoreCallback);
    }

    getAllProduct(getAllProductCallback){
        const endpoint = `productos`
        const method = "GET"
        this.connect({}, endpoint, method, getAllProductCallback);
    }

    getCategory(getAllCategoriesCallback){
        const endpoint = "categorias"
        const method = "GET"
        this.connect({}, endpoint, method, getAllCategoriesCallback);
    }

    //Metodo para eliminar un producto
    deleteProduct(dataRequest, deleteCallback){
        const endpoint = "productos/eliminar"
        const method = "PUT"
        this.connect(dataRequest, endpoint, method, deleteCallback);
    }

    //Metodo para mostrar detalles de un producto

    getDetails(producto_inf, getDetailsCallback){
        const endpoint = `productos/detalles?id_producto=${producto_inf.id_producto}&id_almacen=${producto_inf.id_almacen}`
        const method = "GET"
        this.connect({}, endpoint, method, getDetailsCallback);
    }

    //Metodo para actualizar un producto

    updateDetails(dataRequest, updateDetailsCallback){
        const endpoint = "productos"
        const method = "PUT"
        this.connect(dataRequest, endpoint, method, updateDetailsCallback);
    }

    //Metodo para mostrar los movimientos de un producto

    getTransactions(dataRequest, getTransactionsCallback){
        const endpoint = "productos/movimientos"
        const method = "GET"
        this.connect(dataRequest, endpoint, method, getTransactionsCallback);
    }

    //Metodo para mostrar abastecimiento

    getProvision(dataRequest, getProvisionCallback){
        const endpoint = "productos/abastecimiento"
        const method = "GET"
        this.connect(dataRequest, endpoint, method, getProvisionCallback);
    }
}