class Movimiento extends Connect{
    constructor(){
        super();
        this.id_almacen = 0;
        this.id_producto = '';
        this.id_entrada = '';
        this.id_salida = '';
        this.origen_entrada = '';
        this.destino_salida = '';
        this.cantidad_entrada = '';
        this.cantidad_salida = '';
        this.precio_compra = '';
        this.fecha_inicio = '';
        this.fecha_fin = '';
    }

    asignarDatos( data ){
        this.id_almacen = data.id_almacen;
        this.id_producto = data.id_producto;
        this.id_entrada = data.id_entrada;
        this.id_salida = data.id_salida;
        this.origen_entrada = data.origen_entrada;
        this.destino_salida = data.destino_salida;
        this.cantidad_entrada = data.cantidad_entrada;
        this.cantidad_salida = data.cantidad_salida;
        this.precio_compra = data.precio_compra;
        this.fecha_inicio = data.fecha_inicio;
        this.fecha_fin = data.fecha_fin;
    }

    obtenerDatos (){
        return{
            id_almacen: this.id_almacen,
            id_producto: this.id_producto,
            id_entrada: this.id_entrada,
            id_salida: this.id_salida,
            origen_entrada: this.origen_entrada,
            destino_salida: this.destino_salida,
            cantidad_entrada: this.cantidad_entrada,
            cantidad_salida: this.cantidad_salida,
            precio_compra: this.precio_compra,
            fecha_inicio: this.fecha_inicio,
            fecha_fin: this.fecha_fin        
        }
    }

    // Metodo para traer los movientos de entradas y salidas de un almacen
    getEntradasSalidas(  ){
        
    }
}