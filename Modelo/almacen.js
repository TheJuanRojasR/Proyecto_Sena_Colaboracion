    class Almacen extends Connect{
    constructor()
    {
        super();
        this.id_almacen = 0;
        this.nombre_almacen = '';
        this.direccion_almacen = '';
        this.descripcion_almacen = '';
        this.estado_almacen = '';
    }

    setData(data){
        this.id_almacen = data.id_almacen;
        this.nombre_almacen = data.nombre_almacen;
        this.direccion = data.direccion;
        this.descripcion_almacen = data.descripcion_almacen;
        this.estado_almacen = data.estado_almacen;
    }

    getData(){
        return {
            id_almacen: this.id_almacen,
            nombre_almacen: this.nombre_almacen,
            direccion: this.direccion,
            descripcion_almacen: this.descripcion_almacen,
            estado_almacen: this.estado_almacen
        }
    }

    // Metodo para crear un almacen
    create(dataRequest, createCallback){
        const endpoint = 'almacenes';
        const method = 'POST';
        this.connect(dataRequest, endpoint, method, createCallback);
    }

    asignAlmacen(dataRequest, asignCallback){
        const endpoint = 'almacenes/asignar';
        const method = 'POST';
        this.connect(dataRequest, endpoint, method, asignCallback);
    }

    // Metodo para obtener los almacenes por id de almacen
    getById(id_almacen, getByIdCallback){
        const endpoint = `almacenes?id_almacen=${id_almacen}`;
        const method = 'GET';
        this.connect({}, endpoint, method, getByIdCallback);
    }

    // Metodo para obtener todos los almacenes por id de usuario
    getByUser(id_usuario, updateCallback){
        const endpoint = `almacenes/usuario?id_usuario=${id_usuario}`; ;
        const method = 'GET';
        this.connect({}, endpoint, method, updateCallback);
    }

    // Metodo para eliminar un almacen
    deleteAlmacen(dataRequest, deleteCallback){
        const endpoint = 'almacenes';
        const method = 'PUT';
        this.connect(dataRequest, endpoint, method, deleteCallback);
    }

    // Metodo para editar un almacen
    updateAlmacen(dataRequest, updateCallback){
        const endpoint = 'almacenes/editar';
        const method = 'PUT';
        this.connect(dataRequest, endpoint, method, updateCallback);
    }
}