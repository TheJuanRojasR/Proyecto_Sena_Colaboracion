/**
 * despliega el formulario de Creacion de Inventario id="crear_inventario" 
 */

let vista = new Vista();
const cambio_clases = []

window.onload = function(){
    vista.mostrar_plantilla("pagina_inicio", "contenedor_principal", 1);
    vista.mostrar_plantilla("nav_sup_sin_menu","navegador_sup")
}

vista.identificar_tamaño2("contenedor_principal",cambio_clases)

function regresar_pantalla(){
    vista.regresar_pantalla();
    if(vista.stack_pantallas[vista.stack_pantallas.length-1] == "pagina_inicio"){
        vista.limpiar_contenedor("navegador_inf");
    };
}

// Funciones para acciones del la pantalla Inicio

function mostrar_form_registro_usuario(){
    vista.mostrar_plantilla("registro_usuario", "contenedor_principal", 1);
    vista.mostrar_plantilla("nav_inf_reg","navegador_inf")
}

function mostrar_form_login(){
    vista.mostrar_plantilla("log_in", "contenedor_principal", 1);
    vista.mostrar_plantilla("nav_inf_login","navegador_inf");
}

// Funciones acciones de las pantallas Registro de Usuario y Log In

function mostrar_inv_vacia(){
    vista.mostrar_plantilla("nav_sup","navegador_sup");
    vista.mostrar_plantilla("inventarios_vacia", "contenedor_principal", 1);
    vista.limpiar_contenedor("navegador_inf");
}

//Funciones acciones del menu hamburguesa

function mostrar_busqueda(){
    vista.mostrar_plantilla("buscar", "contenedor_principal", 1);
}

// Funciones acciones de la barra de navegacion Inferior

function mostrar_inventarios(){
    vista.mostrar_plantilla("inventarios", "contenedor_principal", 1);
    vista.limpiar_contenedor("navegador_inf");
}

function mostrar_movimientos_vacia(){
    vista.mostrar_plantilla("movimientos_vacia", "contenedor_principal", 1);
}

function mostrar_stock_vacia(){
    vista.mostrar_plantilla("stock_vacia", "contenedor_principal", 1);
    vista.mostrar_plantilla("nav_inf_con_btns","navegador_inf");
}

function mostrar_seleccionar_informe(){
    vista.mostrar_plantilla("seleccionar_informe", "contenedor_principal", 1);
}

function mostrar_perfiles_vacia(){
    vista.mostrar_plantilla("perfiles_vacia", "contenedor_principal", 1);
}

// Funciones acciones de la pantalla de Inventario

function mostrar_form_crear_inv(){
    vista.mostrar_plantilla("crear_inventario", "contenedor_principal", 1);
}

function mostrar_editar_inv(){
    vista.mostrar_plantilla("editar_inventario", "contenedor_principal", 1);
}

// Funciones acciones de la pantalla de Stock

function mostar_form_crear_producto(){
    vista.mostrar_plantilla("crear_producto", "contenedor_principal", 1);
}

function mostrar_stock(){
    vista.mostrar_plantilla("stock", "contenedor_principal", 1);
    vista.mostrar_plantilla("nav_inf_con_btns","navegador_inf")
}

function mostrar_detalles_producto(){
    vista.mostrar_plantilla("detalles_producto", "contenedor_principal", 1);
}

function mostrar_categorias_vacia(){
    vista.mostrar_plantilla("categorias_vacia", "contenedor_principal", 1);
}

function mostrar_categorias(){
    vista.mostrar_plantilla("categorias", "contenedor_principal", 1);
}

function mostrar_abastecimiento(){
    vista.mostrar_plantilla("abastecimiento", "contenedor_principal", 1);
}

// Funciones para cambiar plantillas desde la pantalla de Detalles Producto

function mostrar_mov_del_producto(){
    vista.mostrar_plantilla("movimientos_del_producto", "contenedor_principal", 1);
}

function mostrar_editar_producto(){
    vista.mostrar_plantilla("editar_producto", "contenedor_principal", 1);
}

// Funciones para cambiar plantillas desde la pantalla de Categorias

function mostrar_editar_categoria(){
    vista.mostrar_plantilla("editar_categoria", "contenedor_principal", 1);
}

function mostrar_form_crear_categoria(){
    vista.mostrar_plantilla("crear_categoria", "contenedor_principal", 1);
}

// Funciones para cambiar plantillas desde la pantalla de Movimientos

function mostrar_form_crear_entrada(){
    vista.mostrar_plantilla("crear_entrada", "contenedor_principal", 1);
}

function mostrar_form_crear_salida(){
    vista.mostrar_plantilla("crear_salida", "contenedor_principal", 1);
}

function mostrar_movimientos(){
    vista.mostrar_plantilla("movimientos", "contenedor_principal", 1);
}

// Funciones para cambiar plantillas desde la pantalla de Perfiles

function mostrar_form_crear_perfil(){
    vista.mostrar_plantilla("crear_perfil", "contenedor_principal", 1);
}

function mostrar_perfiles(){
    vista.mostrar_plantilla("perfiles_con_inf", "contenedor_principal", 1);
}

function mostrar_editar_perfiles(){
    vista.mostrar_plantilla("editar_perfiles", "contenedor_principal", 1);
}