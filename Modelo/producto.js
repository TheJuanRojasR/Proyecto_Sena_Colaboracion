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

    //Metodo para asignar un producto a un almacen
    assignProduct(dataRequest, assignCallback){
        const endpoint = "productos/asignar"
        const method = "POST"
        this.connect(dataRequest, endpoint, method, assignCallback);
    }

    //Metodo para mostrar los productos
    getAllProductbyStore(id_almacen, getAllProductbyStoreCallback){
        const endpoint = `productos/almacen?id_almacen=${id_almacen}` 
        const method = "GET"
        this.connect({}, endpoint, method, getAllProductbyStoreCallback);
    }

    //Metodo para mostrar todos los productos
    getAllProduct(getAllProductCallback){
        const endpoint = `productos`
        const method = "GET"
        this.connect({}, endpoint, method, getAllProductCallback);
    }

    //Metodo para eliminar un producto
    deleteProduct(dataRequest, deleteCallback){
        const endpoint = "productos/eliminar"
        const method = "PUT"
        this.connect(dataRequest, endpoint, method, deleteCallback);
    }

    //Metodo para mostrar detalles de un producto
    getDetailsProduct(producto_inf, getDetailsCallback){
        const endpoint = `productos/detalles?id_producto=${producto_inf.id_producto}&id_almacen=${producto_inf.id_almacen}`
        const method = "GET"
        this.connect({}, endpoint, method, getDetailsCallback);
    }

    //Metodo para actualizar un producto
    updateDetailsProduct(dataRequest, updateDetailsCallback){
        const endpoint = "productos"
        const method = "PUT"
        this.connect(dataRequest, endpoint, method, updateDetailsCallback);
    }

    //Metodo para mostrar los movimientos de un producto
    getTransactions(producto, getTransactionsCallback){
        const endpoint = `productos/movimientos?id_producto=${producto.id_producto}&id_almacen=${producto.id_almacen}`
        const method = "GET"
        this.connect({}, endpoint, method, getTransactionsCallback);
    }

    //Metodo para mostrar abastecimiento
    getProvision(id_almacen, getProvisionCallback){
        const endpoint = `productos/abastecimiento?id_almacen=${id_almacen}`
        const method = "GET"
        this.connect({}, endpoint, method, getProvisionCallback);
    }

    //------------------------------------METODOS PARA CATEGORIAS------------------------------------\\

    //Metodo para crear una categoria
    createCategory(dataRequest, createCategoryCallback){
        const endpoint = "categorias"
        const method = "POST"
        this.connect(dataRequest, endpoint, method, createCategoryCallback);
    }

    //Metodo para mostrar todas las categorias
    getCategory(getAllCategoriesCallback){
        const endpoint = "categorias"
        const method = "GET"
        this.connect({}, endpoint, method, getAllCategoriesCallback);
    }

    //Metodo para eliminar una categoria
    deleteCategory(dataRequest, deleteCategoryCallback){
        const endpoint = "categorias/eliminar"
        const method = "PUT"
        this.connect(dataRequest, endpoint, method, deleteCategoryCallback);
    }

    //Metodo para actualizar una categoria
    updateCategory(dataRequest, updateCategoryCallback){
        const endpoint = "categorias"
        const method = "PUT"
        this.connect(dataRequest, endpoint, method, updateCategoryCallback);
    }

    //------------------------------------METODOS PARA MOVIMIENTOS------------------------------------\\
    
    //Metodo para mostrar las entradas y salidas
    getOperations(fechas, getEntradasSalidasCallback){
        const endpoint = `entradas_salidas?fecha_inicio=${fechas.fecha_inicio}&fecha_fin=${fechas.fecha_fin}&id_almacen=${fechas.id_almacen}`
        const method = "GET"
        this.connect({}, endpoint, method, getEntradasSalidasCallback);
    }

    //Metodo para crear una entrada
    createEntry(dataRequest, createEntradaCallback){
        const endpoint = "entradas"
        const method = "POST"
        this.connect(dataRequest, endpoint, method, createEntradaCallback);
    }

    //Metodo para crear una salida
    createExit(dataRequest, createSalidaCallback){
        const endpoint = "salidas"
        const method = "POST"
        this.connect(dataRequest, endpoint, method, createSalidaCallback);
    }

}