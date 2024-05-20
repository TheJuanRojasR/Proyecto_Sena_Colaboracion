let vista = new Vista();
let usuario = new Usuario();

const lista_clases_main_desktop = ['container-fluid', 'container_main'];
const lista_clases_main_mobile = ['overflow-y-scroll'];
const lista_clases_nav_sup_desktop = ['navbar', 'navbar-expand-md'];
const lista_clases_nav_sup_mobile = ['navbar', 'fixed-top', 'nav_sup'];
const lista_clases_nav_inf = ['navbar', 'fixed-bottom', 'nav_inf'];

const tamañoPantalla = window.matchMedia('(max-width: 768px)');

window.addEventListener('resize', cambio_clases);

function cambio_clases(){
    if(tamañoPantalla.matches){
        vista.cambiar_clases("contenedor_principal", lista_clases_main_mobile);
        vista.cambiar_clases("navegador_sup", lista_clases_nav_sup_mobile);
    }
    else{
        vista.cambiar_clases("contenedor_principal", lista_clases_main_desktop);
        vista.cambiar_clases("navegador_sup", lista_clases_nav_sup_desktop)
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

/**
 function cambio_templates(){
     if(tamañoPantalla.matches){
         vista.mostrar_plantilla( "inventarios_vacia","contenedor_principal");
     }
     else{
         vista.mostrar_plantilla("inventario_vacia_desktop", "contenedor_principal"  )
     }
 }
 */

// function cerrarVentana(){
//     cerrarPantalla("offcanvasNavbar");
// }

window.onload = function(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("nav_sup_inicio","navegador_sup");
        vista.mostrar_plantilla("pagina_inicio", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("nav_sup_inicio_desktop", "navegador_sup");
        vista.mostrar_plantilla("pagina_inicio_desktop", "contenedor_principal");
        vista.mostrar_plantilla("footer_desktop", "footer");
    }
    cambio_clases();
    remover_nav_inf();
}

function regresar_pantalla(){
    vista.regresar_pantalla();
    if(vista.stack_pantallas[vista.stack_pantallas.length-1] == "pagina_inicio"){
        vista.limpiar_contenedor("navegador_inf");
    };
}

// Funciones para acciones del la pantalla Inicio

function mostrar_form_registro_usuario(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("registro_usuario", "contenedor_principal", 0);
        vista.mostrar_plantilla("nav_inf_reg","navegador_inf", 0);
    }
    else{
        vista.mostrar_plantilla("registro_usuario_desktop", "contenedor_principal", 1);
    }
    cambio_clases();
}

function registrarUsuario() {
    let data = vista.getForm("form_registro_desktop");

    if (data.ok) {
        usuario.register(data, function(data){
            //verificar si el registro fue exitoso
            if(data.success){
                //Mensaje de exito
                //Mostar modal de registro exitoso
                mostrar_form_login();
            }
            else{
                //Mensaje de error
            }
        })
    }
    else{
        //Mensaje de error
    }
}

function mostrar_form_login(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("log_in", "contenedor_principal", 0);
        vista.remover_etiqueta("footer");
        vista.añadir_etiqueta("nav", "body", "navegador_inf");
        vista.mostrar_plantilla("nav_inf_login","navegador_inf");
        vista.cambiar_clases("navegador_inf", lista_clases_nav_inf);
    }
    else{
        vista.mostrar_plantilla("log_in_desktop", "contenedor_principal", 1);
    }
    cambio_clases();
}

// Funciones acciones de las pantallas Registro de Usuario y Log In

function mostrar_inv_vacia(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("nav_sup","navegador_sup");
        vista.limpiar_contenedor("navegador_inf",);
        vista.mostrar_plantilla("inventarios_vacia", "contenedor_principal", 1);
        vista.mostrar_plantilla("btn_uno","contenedor_boton_circular");
        vista.añadir_evento_click("boton_crear_inv", mostrar_form_crear_inv);
    }
    else{
        vista.mostrar_plantilla("nav_sup_desktop","navegador_sup");
        vista.mostrar_plantilla("inventarios_vacia_desktop", "contenedor_principal", 1);
        vista.remover_etiqueta("footer");
    }
}

//Funciones acciones del menu hamburguesa

function mostrar_busqueda(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("buscar", "contenedor_principal", 1);
    }
    else{
        
    }
}

// Funciones acciones de la barra de navegacion Inferior

function mostrar_inventarios(){
    if(tamañoPantalla.matches){
        vista.limpiar_contenedor("navegador_inf");
        vista.mostrar_plantilla("inventarios", "contenedor_principal", 1);
        vista.mostrar_plantilla("btn_uno","contenedor_boton_circular");
        vista.añadir_evento_click("boton_crear_inv", mostrar_form_crear_inv);
    }
    else{
        vista.mostrar_plantilla("inventarios_desktop", "contenedor_principal", 1);
    }
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
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("crear_producto", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("crear_producto_desktop", "contenedor_principal", 1);
    }
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