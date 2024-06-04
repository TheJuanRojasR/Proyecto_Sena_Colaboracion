let vista = new Vista();
let usuario = new Usuario();
let producto = new Producto();
let almacen = new Almacen();
let lista_opciones = []

const lista_clases_main_desktop = ['container-fluid', 'container_main'];
const lista_clases_main_mobile = ['overflow-y-scroll'];
const lista_clases_nav_sup_desktop = ['navbar', 'navbar-expand-md'];
const lista_clases_nav_sup_mobile = ['navbar', 'fixed-top', 'nav_sup'];
const lista_clases_nav_inf = ['navbar', 'fixed-bottom', 'nav_inf'];
const lista_clases_modal_error_show = ['modal', 'modal--error','modal--show'];
const lista_clases_modal_error = ['modal', 'modal--error'];
const lista_clases_modal_exito_show = ['modal', 'modal--exito','modal--show'];
const lista_clases_modal_exito = ['modal', 'modal--exito'];
const lista_clases_modal_confirmacion_show = ['modal', 'modal--confirmacion','modal--show'];
const lista_clases_modal_confirmacion = ['modal', 'modal--confirmacion'];

const tamañoPantalla = window.matchMedia('(max-width: 768px)');

window.addEventListener('resize', cambio_clases);
// window.addEventListener('resize', cambio_templates);

function cambio_clases(){
    if(tamañoPantalla.matches){
        vista.cambiar_clases("contenedor_principal", lista_clases_main_mobile);
        vista.cambiar_clases("navegador_sup", lista_clases_nav_sup_mobile);
    }
    else{
        vista.cambiar_clases("contenedor_principal", lista_clases_main_desktop);
        vista.cambiar_clases("navegador_sup", lista_clases_nav_sup_desktop);
    }
}

function remover_nav_inf(){
    if(tamañoPantalla.matches){
        vista.remover_etiqueta("navegador_inf");
    }
    else{
        vista.remover_etiqueta("navegador_inf");
    }
}

function cambio_templates(){
    if(tamañoPantalla.matches){
    vista.mostrar_plantilla("pagina_inicio", "contenedor_principal", 1);
    vista.mostrar_plantilla("nav_sup_inicio", "navegador_sup");
    vista.mostrar_plantilla("footer", "footer_inicio");
    }
    else{
    vista.mostrar_plantilla("pagina_inicio_desktop", "contenedor_principal");
    vista.mostrar_plantilla("nav_sup_inicio_desktop", "navegador_sup");
    vista.mostrar_plantilla("footer", "footer_inicio");
    }
}

// function cerrarVentana(){
//     cerrarPantalla("offcanvasNavbar");
// }

// window.onload = function(){
//     if(tamañoPantalla.matches){
//         vista.mostrar_plantilla("nav_sup_inicio","navegador_sup");
//         vista.mostrar_plantilla("pagina_inicio", "contenedor_principal", 1);
//         vista.mostrar_plantilla("footer", "footer_inicio");
//     }
//     else{
//         vista.mostrar_plantilla("nav_sup_inicio_desktop", "navegador_sup");
//         vista.mostrar_plantilla("pagina_inicio_desktop", "contenedor_principal");
//         vista.mostrar_plantilla("footer", "footer_inicio");
//     }
//     cambio_clases();
//     remover_nav_inf();
// }

function regresar_pantalla(){
    vista.regresar_pantalla();
    if(vista.stack_pantallas[vista.stack_pantallas.length-1] == "pagina_inicio"){
        vista.limpiar_contenedor("navegador_inf");
    };
}

// Funciones para acciones del la pantalla Inicio

function mostrar_form_registro_usuario(){

    //Mostrar plantilla de registro de usuario
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("registro_usuario", "contenedor_principal", 0);
        vista.remover_etiqueta("footer_inicio");
        vista.añadir_etiqueta("nav", "body", "navegador_inf");
        vista.mostrar_plantilla("nav_inf_reg","navegador_inf", 0);
        vista.cambiar_clases("navegador_inf", lista_clases_nav_inf);
    }
    else{
        vista.mostrar_plantilla("registro_usuario_desktop", "contenedor_principal", 1);
    }
    cambio_clases();

    //Consultar categ productos 
    usuario.getAllDocumentos(function (data) {
        if(data.success) {
            lista_opciones = []
            lista_opciones = data.data
            //poblar select id_categoria
            const categoriasObj = Object.fromEntries(
                lista_opciones.map((obj) => [obj.id_tipo_documento.toString(), obj.tipo_documento])
            );
            console.log(categoriasObj)
            vista.crearSelectDesdeJSON(categoriasObj, "tipo_documento", "id_tipo_documento", "tipo_documento")
        }
    });
}

function mostrar_login(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("log_in", "contenedor_principal", 0);
        vista.remover_etiqueta("footer_inicio");
        vista.añadir_etiqueta("nav", "body", "navegador_inf");
        vista.mostrar_plantilla("nav_inf_login","navegador_inf");
        vista.cambiar_clases("navegador_inf", lista_clases_nav_inf);
    }
    else{
        vista.mostrar_plantilla("log_in_desktop", "contenedor_principal", 1);
    }
    cambio_clases();
}

function mostrar_form_login(){

    //Verificacion de form y registro de usuario

    data = vista.getForm("form_registro_usuario_desktop")

    if(data.ok){
        usuario.register(data, function(data){
            if(data.success){
                //Mensaje de exito
                //Mostar modal de registro exitoso
                vista.cambiar_clases('modal_exito', lista_clases_modal_exito_show)
                mostrar_login();
            }
            else{
                vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
            }
        });
    } else {
        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
    }
}

// Funciones acciones de las pantallas Registro de Usuario y Log In

function mostrar_inv_vacia(){
    
    data = vista.getForm("form_log_desktop")

    if (data.ok) {
        //Validar datos en la tabla clientes o empresas
        usuario.login(data, function (data) {
            if (data.success) {
                if (data.data.length == 0) {
                    vista.cambiar_clases('modal_error', lista_clases_modal_error_show);
                    return;
                } else {
                    usuario.setData(data.data[0]);
                    //Consultar almacenes
                    let id_usuario = usuario.id_usuario;
                    mostrar_inventarios(id_usuario);
                }
            } else {
                vista.mostrarMensaje(false, 'Error al realizar la consulta en la base de datos');
            }
        });
    }else{
        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
    }
}

// Funciones acciones de la barra de navegacion Inferior

function mostrar_inventarios(id_usuario){
    almacen.getByUser(id_usuario, function(data){
        if(data.success){
            if(data.data.length == 0){
                if(tamañoPantalla.matches){
                    vista.añadir_padding("contenedor_principal", "72.31px");
                    vista.mostrar_plantilla("nav_sup","navegador_sup");
                    vista.limpiar_contenedor("navegador_inf",);
                    vista.mostrar_plantilla("inventarios_vacia", "contenedor_principal", 1);
                    vista.mostrar_plantilla("btn_uno","contenedor_boton_circular");
                    vista.añadir_evento_click("boton_crear_inv", mostrar_form_crear_inv);
                }
                else{
                    vista.mostrar_plantilla("nav_sup_desktop","navegador_sup");
                    vista.mostrar_plantilla("inventarios_vacia_desktop", "contenedor_principal", 1);
                    vista.remover_etiqueta("footer_inicio");
                }
                cambio_clases();
            }
            else{
                if(tamañoPantalla.matches){
                    vista.limpiar_contenedor("navegador_inf");
                    vista.mostrar_plantilla("inventarios", "contenedor_principal", 1);
                    vista.mostrar_plantilla("btn_uno","contenedor_boton_circular");
                    vista.añadir_evento_click("boton_crear_inv", mostrar_form_crear_inv);
                }
                else{
                    vista.mostrar_plantilla("nav_sup_desktop","navegador_sup",0);
                    vista.mostrar_plantilla("inventarios_desktop", "contenedor_principal", 1);
                    vista.remover_etiqueta("footer_inicio");
                }
                cambio_clases();
                // lista_almacenes = []
                // lista_almacenes = data.data
                // const almacenesObj = Object.fromEntries(
                //     lista_opciones.map((obj) => [obj.id_categoria.toString(), obj.nombre_categoria])
                // );

                // vista.anadir_seccion("tarjeta_inventarios", "contenedor_tarjetas");
                // lista_almacenes.forEach(almacen => vista.anadir_seccion());
                // for (let i = 0; i < lista_almacenes.length; i++) {
                //     vista.anadir_seccion("tarjeta_inventarios", "contenedor_tarjetas");
                //     for (let j = 0; j < lista_almacenes.length; j++) {
                //         vista.insertar_dato("nombre_almacen", lista_almacenes[j].nombre_almacen, i);
                //         vista.insertar_dato("direccion_almacen", lista_almacenes[j].direccion_almacen, i);
                //         vista.insertar_dato("descripcion_almacen", lista_almacenes[j].descripcion_almacen, i);
                //     }
                // }
            }
        }else{
            vista.mostrarMensaje(false, 'Error al realizar la consulta en la base de datos');
        }
    });
}

function mostrar_movimientos_vacia(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("movimientos_vacia", "contenedor_principal", 1);
        vista.mostrar_plantilla("btn_dos","contenedor_boton_circular");
    }
    else{
        vista.mostrar_plantilla("movimientos_vacia_desktop", "contenedor_principal", 1);
    }
}

function mostrar_stock_vacia(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("stock_vacia", "contenedor_principal", 1);
        vista.mostrar_plantilla("btn_tres","contenedor_boton_circular");
        vista.mostrar_plantilla("nav_inf_con_btns","navegador_inf");
    }
    else{
        vista.mostrar_plantilla("stock_vacia_desktop", "contenedor_principal", 1);
    }
}

function mostrar_seleccionar_informe(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("seleccionar_informe", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("seleccionar_informe_desktop", "contenedor_principal", 1);
    }
}

function mostrar_perfiles_vacia(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("perfiles_vacia", "contenedor_principal", 1);
        vista.mostrar_plantilla("btn_uno","contenedor_boton_circular");
        vista.añadir_evento_click("boton_crear_inv", mostrar_form_crear_perfil);
    }
    else{
        vista.mostrar_plantilla("perfiles_vacia_desktop", "contenedor_principal", 1);
    }
}

// Funciones acciones de la pantalla de Inventario

function mostrar_form_crear_inv(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("crear_inventario", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("crear_inventario_desktop", "contenedor_principal", 1);
    }
}

function mostrar_editar_inv(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("editar_inventario", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("editar_inventario_desktop", "contenedor_principal", 1);
    }
}

// Funciones acciones de la pantalla de Stock

function mostar_form_crear_producto(){
    
    //Mostrar plantilla para crear un producto
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("crear_producto", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("crear_producto_desktop", "contenedor_principal", 1);
    }
    cambio_clases();
    
    //Consultar categ productos 
    producto.getAllCategories(function (data) {
        if(data.success) {
            lista_opciones = []
            lista_opciones = data.data
            //poblar select id_categoria
            const categoriasObj = Object.fromEntries(
                lista_opciones.map((obj) => [obj.id_categoria.toString(), obj.nombre_categoria])
            );
            console.log(categoriasObj)
            vista.insertar_opciones_select(categoriasObj, "id_categoria", "id_categoria", "nombre_categoria")
        }
    });
}

function mostrar_stock(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("stock", "contenedor_principal", 1);
        vista.mostrar_plantilla("btn_tres","contenedor_boton_circular");
        vista.mostrar_plantilla("nav_inf_con_btns","navegador_inf")
    }
    else{
        vista.mostrar_plantilla("stock_desktop", "contenedor_principal", 1);
    }
}

function mostrar_detalles_producto(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("detalles_producto", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("detalles_producto_desktop", "contenedor_principal", 1);
    }
}

function mostrar_categorias_vacia(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("categorias_vacia", "contenedor_principal", 1);
        vista.mostrar_plantilla("btn_uno","contenedor_boton_circular");
        vista.añadir_evento_click("boton_crear_inv", mostrar_form_crear_categoria);
    }
    else{
        vista.mostrar_plantilla("categorias_vacia_desktop", "contenedor_principal", 1);
    }
}

function mostrar_categorias(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("categorias", "contenedor_principal", 1);
        vista.mostrar_plantilla("btn_uno","contenedor_boton_circular");
        vista.añadir_evento_click("boton_crear_inv", mostrar_form_crear_categoria);
    }
    else{
        vista.mostrar_plantilla("categorias_desktop", "contenedor_principal", 1);
    }
}

function mostrar_abastecimiento(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("abastecimiento", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("abastecimiento_desktop", "contenedor_principal", 1);
    }
}

// Funciones para cambiar plantillas desde la pantalla de Detalles Producto

function mostrar_mov_del_producto(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("movimientos_del_producto", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("movimientos_del_producto_desktop", "contenedor_principal", 1);
    }
}

function mostrar_editar_producto(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("editar_producto", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("editar_producto_desktop", "contenedor_principal", 1);
    }
}

// Funciones para cambiar plantillas desde la pantalla de Categorias

function mostrar_editar_categoria(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("editar_categoria", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("editar_categoria_desktop", "contenedor_principal", 1);
    }
}

function mostrar_form_crear_categoria(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("crear_categoria", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("crear_categoria_desktop", "contenedor_principal", 1);
    }    
}

// Funciones para cambiar plantillas desde la pantalla de Movimientos

function mostrar_form_crear_entrada(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("crear_entrada", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("crear_entrada_desktop", "contenedor_principal", 1);
    }
}

function mostrar_form_crear_salida(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("crear_salida", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("crear_salida_desktop", "contenedor_principal", 1);
    }
}

function mostrar_movimientos(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("movimientos", "contenedor_principal", 1);
        vista.mostrar_plantilla("btn_dos","contenedor_boton_circular");
    }
    else{
        vista.mostrar_plantilla("movimientos_desktop", "contenedor_principal", 1);
    }
}

// Funciones para cambiar plantillas desde la pantalla de Perfiles

function mostrar_form_crear_perfil(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("crear_perfil", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("crear_perfil_desktop", "contenedor_principal", 1);
    }    
}

function mostrar_perfiles(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("perfiles_con_inf", "contenedor_principal", 1);
        vista.mostrar_plantilla("btn_uno","contenedor_boton_circular");
        vista.añadir_evento_click("boton_crear_inv", mostrar_form_crear_perfil);
    }
    else{
        vista.mostrar_plantilla("perfiles_con_inf_desktop", "contenedor_principal", 1);
    }
}

function mostrar_editar_perfiles(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("editar_perfiles", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("editar_perfiles_desktop", "contenedor_principal", 1);
    }
}

// Funciones para cambiar plantillas desde el menu lateral

function mostrar_busqueda(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("buscar", "contenedor_principal", 1);
    }
    else{
        
    }
}

function mostrar_terminos_condiciones(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("terminos_condiciones", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("terminos_condiciones_desktop", "contenedor_principal", 1);
    }
}

function mostrar_politicas_privacidad(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("politicas_privacidad", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("politicas_privacidad_desktop", "contenedor_principal", 1);
    }
}

function mostrar_ajustes_usuario(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("ajustes_usuario", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("ajustes_usuario_desktop", "contenedor_principal", 1);
    }
}

function mostrar_editar_usario(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("editar_usuario", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("editar_usuario_desktop", "contenedor_principal", 1);
    }

}

function mostrar_ayuda(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("ayuda", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("ayuda_desktop", "contenedor_principal", 1);
    }
}

// Funciones para acciones de los botones

function añadir_producto_entradas(){
    vista.anadir_seccion( "fila_productos_entradas_desktop", "tbody_productos_entradas");
}

function cerrar_modal_confirmacion(){
    vista.cambiar_clases('modal', lista_clases_modal_confirmacion);
}

function cerrar_modal_error(){
    vista.cambiar_clases('modal_error', lista_clases_modal_error);
}

function cerrar_modal_exito(){
    vista.cambiar_clases('modal_exito', lista_clases_modal_exito);
}

