/**
 * despliega el formulario de Creacion de Inventario id="crear_inventario" 
 */

let vista = new Vista();

window.onload = function(){
    vista.mostrar_plantilla("pagina_inicio", "contenedor_principal");
}

function mostrar_form_registro_usuario(){
    vista.mostrar_plantilla("registro_usuario", "contenedor_principal");
    vista.mostrar_plantilla("nav_inf_reg","navegador_inf")
}

function mostrar_form_login(){
    vista.mostrar_plantilla("log_in", "contenedor_principal");
    vista.mostrar_plantilla("nav_inf_login","navegador_inf")
}

function mostrar_inv_vacia(){
    vista.mostrar_plantilla("inventarios_vacia", "contenedor_principal");
    vista.mostrar_plantilla("nav_sup_menu_ham","navegador_sup")
    vista.mostrar_plantilla("nav_inf_con_btns","navegador_inf")
}

function mostrar_form_crear_inv(){
    vista.mostrar_plantilla("crear_inventario", "contenedor_principal");
}

function mostrar_inventarios(){
    vista.mostrar_plantilla("inventarios", "contenedor_principal");
}
