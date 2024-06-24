//Variables globales
let vista = new Vista();
let usuario = new Usuario();
let producto = new Producto();
let almacen = new Almacen();
let lista_categorias = [] //Lista donde se guardan las categorias existentes
let lista_productos = []; //Lista donde se guardan los productos existentes
let lista_almacenes = []; //Lista donde se guardan los almacenes existentes
let lista_movimientos = []; //Lista donde se guardan los movimientos de un producto/almacen
let lista_productos_operaciones = []; //Lista donde se guardan los productos de la operacion
let infomacion_entrada = null; //Variable para guardar la informacion de una entrada
let infomacion_salida = null; //Variable para guardar la informacion de una salida
let idAlmacen = null; //Varialbe para guardar el id del almacen
let idProducto = null; //Variable para guardar el id del producto
let idCategoria = null; //Variable para guardar el id de la categoria

//Listas para cambiar de clases a contenedores
const lista_clases_main_desktop = ['container-fluid', 'container_main'];
const lista_clases_main_mobile = ['overflow-y-scroll'];
const lista_clases_nav_sup_desktop = ['navbar', 'fixed-top'];
const lista_clases_nav_sup_mobile = ['navbar', 'fixed-top', 'nav_sup'];
const lista_clases_nav_inf = ['navbar', 'fixed-bottom', 'nav_inf'];
const lista_clases_modal_registro_show = ['modal', 'registro','modal--show'];
const lista_clases_modal_registro = ['modal', 'registro'];
const lista_clases_modal_login_show = ['modal', 'ingreso','modal--show'];
const lista_clases_modal_login = ['modal', 'ingreso'];
const lista_clases_modal_error_show = ['modal', 'modal--error','modal--show'];
const lista_clases_modal_error = ['modal', 'modal--error'];
const lista_clases_modal_exito_show = ['modal', 'modal--exito','modal--show'];
const lista_clases_modal_exito = ['modal', 'modal--exito'];
const lista_clases_modal_confirmacion_show = ['modal', 'modal--confirmacion','modal--show'];
const lista_clases_modal_confirmacion = ['modal', 'modal--confirmacion'];
const lista_clases_modal_informacion_show = ['modal', 'modal-info', 'modal--show']
const lista_clases_modal_informacion = ['modal', 'modal-info']

const tamañoPantalla = window.matchMedia('(max-width: 768px)'); //Se obtiene el tamaño de la pantalla

//Se escucha a la pantalla y si existe un cambio de tamaño, y ejecuta la funcion cambio_clases.
// window.addEventListener('resize', cambio_clases); 



// window.addEventListener('resize', cambio_templates);

/**
 * Funcion para añadir un evento click a un elemento del HTML
 * @param {*} plantilla: id de la etiqueta a la que se le añadira el evento
 * @param {*} funcion: Funcion que se va a ejecutar al hacer click
 */
function añadir_evento_click(plantilla, funcion) {
    let elemento = document.getElementById(plantilla); //Se obtiene el elemento
    elemento.onclick = "" //Se elimina el evento anterior
    elemento.onclick = funcion; //Se añade el nuevo evento
}

/**
 * Funcion para cambiar las clases de la etiqueta main, a travez de su id
 * utilizando una lista de clases dependiendo del tamaño de la pantalla
 */
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

/**
 * Funcion para remover la etiqueta nav, que se utiliza como navegador inferior
 */
function remover_nav_inf(){
    if(tamañoPantalla.matches){
        vista.remover_etiqueta("navegador_inf");
    }
    else{
        vista.remover_etiqueta("navegador_inf");
    }
}

// function cerrarVentana(){
//     cerrarPantalla("offcanvasNavbar");
// }

/**
 * Evento para cargar la pagina con el template de paginas de inicio 
 * dependiendo del tamaño de la pantalla
 */
window.onload = function(){

    vista.mostrar_plantilla("nav_sup_inicio_desktop", "navegador_sup");
    vista.mostrar_plantilla("pagina_inicio_desktop", "contenido", 1);
    vista.mostrar_plantilla("footer", "footer_inicio");

    remover_nav_inf();
}

/**
 * Funcion para regresar entre pantallas
 *
 */
function regresar_pantalla(){
    vista.regresar_pantalla();
    if(vista.stack_pantallas[vista.stack_pantallas.length-1] == "pagina_inicio"){
        vista.limpiar_contenedor("navegador_inf");
    };
}

// -------- PAGINA DE INICIO ---------- \\

/**
 * Funcion para mostrar la pagina de registro de un usuario nuevo
 */
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
        vista.cambiar_clases('modal_registro', lista_clases_modal_registro_show);
    }
    cambio_clases();

    //Consultar categorias de los productos 
    usuario.getAllDocuments(function (data) {
        if(data.success) {
            lista_opciones = []
            lista_opciones = data.data
            // Se convierte el objeto en un array con llave valor
            const documentosObj = Object.fromEntries(
                lista_opciones.map((obj) => [obj.id_tipo_documento.toString(), obj.tipo_documento])
                );
                console.log(documentosObj)
            // Se llama metodo de vista para poblar select tipo_documento
            vista.insertar_opciones_select(documentosObj, "tipo_documento", "id_tipo_documento", "tipo_documento")
        }
    });
}

/**
 * Muestra el log in de un usuario desde el boton disponible en la barra superior
 */
function mostrar_login(){
    // Cambia la pantalla a login
    if(tamañoPantalla.matches){
        vista.añadir_padding("contenedor_principal", "72.31px");
        vista.mostrar_plantilla("log_in", "contenedor_principal", 0);
        vista.remover_etiqueta("footer_inicio");
        vista.añadir_etiqueta("nav", "body", "navegador_inf");
        vista.mostrar_plantilla("nav_sup_inicio", "navegador_sup");
        vista.mostrar_plantilla("nav_inf_login","navegador_inf");
        vista.cambiar_clases("navegador_inf", lista_clases_nav_inf);
    }
    else{
        vista.cambiar_clases('modal_login', lista_clases_modal_login_show);
    }
    cambio_clases();
}

/**
 * Funcion para regisrtar al usuario y utilizando los datos 
 * puestos en el form de registro, y cambio de pantalla para logeo 
 *
 */
function registrar_usuario(){

    //Verificacion de form
    data = vista.getForm("form_registro_usuario")
    // Consulta a la base de datos
    if(data.ok){
        usuario.register(data, function(data){
            if(data.data.message == "El usuario ya existe"){
                //Mensaje de error
                vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
            }
            else{
                if(data.success){
                    //Mensaje de exito y cambio de template
                    vista.cambiar_clases('modal_exito', lista_clases_modal_exito_show)
                    mostrar_login();
                    vista.cambiar_clases('modal_registro', lista_clases_modal_registro);
                }
                else{
                    //Mensaje de error
                    vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
                }
            }
        });
    } else {
        //Mensaje de error
        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
    }
}

/**
 * Funcion para mostrar los inventarios de un usuario
 */
function log_in(){
    //Verificacion de Form 
    data = vista.getForm("form_login")
    if (data.ok) {
        // Consulta a la base de datos la existencia de un usuario
        usuario.login(data, function (data) {
            if (data.success) {
                if (data.data.length == 0) {
                    // Mensaje de error si no existe
                    vista.cambiar_clases('modal_error', lista_clases_modal_error_show);
                    return;
                } else {
                    //Se llama el metodo setData de usuario, para guardar los datos del usuario
                    usuario.setData(data.data[0]);
                    //Consultar almacenes segun el id del usuario
                    let id_usuario = usuario.id_usuario;
                    vista.cambiar_clases('modal_login', lista_clases_modal_login);
                    mostrar_inv(id_usuario);
                }
            } else {
                vista.cambiar_clases("modal_error",lista_clases_modal_error_show)
            }
        });
    }else{
        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
    }
}

// -------- PAGINA DE INVENTARIOS ---------- \\

/**
 * Funcion para mostar los inventarios del usuario desde el navegador
 */
function mostrar_inv_nav(){
    let id_usuario = usuario.id_usuario;
    mostrar_inv(id_usuario);
}

/**
 * Funcion para mostrar los inventarios de un usuario
 *
 * @param {*} id_usuario: Id del usuario para consultar unicamente sus inventarios
 */
function mostrar_inv(id_usuario){
    //Consulta a la Base de Datos, para traer todos los inventarios de ese usuario
    permiso = {id_rol: usuario.id_rol, id_permiso: 1}
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0].Permisos > 0){
            almacen.getByUser(id_usuario, function(data){
                if(data.success){
                    if(data.data.length == 0){
                        //Si no hay inventarios aisgnados a ese usuario, se muestra la pantalla inventarios_vacia
                        if(tamañoPantalla.matches){
                            vista.añadir_padding("contenedor_principal", "72.31px");
                            vista.mostrar_plantilla("nav_sup","navegador_sup");
                            vista.limpiar_contenedor("navegador_inf",);
                            vista.mostrar_plantilla("inventarios_vacia", "contenedor_principal", 1);
                            vista.mostrar_plantilla("btn_uno","contenedor_boton_circular");
                            añadir_evento_click("boton_crear_inv", mostrar_form_crear_inv);
                        }
                        else{
                            vista.mostrar_plantilla("nav_sup_desktop_inv","navegador_sup");
                            vista.mostrar_plantilla("inventarios_vacia_desktop", "contenedor_principal", 1);
                            vista.remover_etiqueta("footer_inicio");
                        }
                        cambio_clases();
                    }
                    else{
                        //Si hay inventarios, se muestra la pantalla inventarios
                        if(tamañoPantalla.matches){
                            vista.limpiar_contenedor("navegador_inf");
                            vista.mostrar_plantilla("nav_sup","navegador_sup");
                            vista.mostrar_plantilla("inventarios", "contenedor_principal", 1);
                            vista.mostrar_plantilla("btn_uno","contenedor_boton_circular");
                            añadir_evento_click("boton_crear_inv", mostrar_form_crear_inv);
                        }
                        else{
                            vista.mostrar_plantilla("nav_sup_desktop_inv","navegador_sup",0);
                            vista.mostrar_plantilla("inventarios_desktop", "contenedor_principal", 1);
                            const footer = document.getElementById("footer_inicio")
                            if(footer){
                                vista.remover_etiqueta("footer_inicio");
                            }
                        }
                        cambio_clases();
                        /* Se llama el metodo de vista para crear la cantidad y tipo de targetas 
                            de acuerdo a la cantidad traida por la DB y tamaño de la pantalla.
                        */
                        pantalla = tamañoPantalla.matches
                        lista_almacenes = data.data
                        vista.informacion_tarjeta_inventario(pantalla, lista_almacenes, "contenedor_tarjetas");
                    }
                }else{
                    vista.cambiar_clases("modal_error",lista_clases_modal_error_show)
                }
            });
        }
    });

}

/**
 *Funcion para mostrar el formulario de creacion de un inventario
 */
function mostrar_form_crear_inv(){
    permiso ={id_rol: usuario.id_rol, id_permiso: 2}
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0].Permisos > 0){
            if(tamañoPantalla.matches){
                vista.mostrar_plantilla("crear_inventario", "contenedor_principal", 1);
            }
            else{
                vista.mostrar_plantilla("crear_inventario_desktop", "contenedor_principal", 1);
            }
        }else{
            vista.cambiar_clases('modal_info', lista_clases_modal_informacion_show)
            
        }
    });
}

/**
 *Funcion para crear un inventario
 */
function crear_inv(){
    //Verificacion del form
    data = vista.getForm("form_crear_inventario")
    //Consulta a la DB para insertar informacion en almacenes
    if(data.ok){
        almacen.create(data, function(data){
            if(data.success){
                //Se inserta el id_almacen e id_usuario al objeto almacenOjt
                const almacenOjt = {id_almacen:data.data, id_usuario:usuario.id_usuario};
                almacen.asignAlmacen(almacenOjt, function(dataAlmacen){
                    //Segunda consulta a la DB para asignar el almacen al usuario actual
                    if(dataAlmacen.success){
                        //Mensaje de exito y cambio de template
                        vista.cambiar_clases('modal_exito', lista_clases_modal_exito_show)
                        mostrar_inv(usuario.id_usuario);
                    }
                });
            }else{
                vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
            }
        });
    }else{
        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
    }
}

/**
 * Funcion para eliminar un inventario en la vista
 * @param {*} btnEliminar: Contendor con el id del almacen
 */
function eliminar_inv_vista(btnEliminar){

    //Se crea el Obejto permiso
    permiso = {id_rol:usuario.id_rol, id_permiso:4};
    //Consulta a la DB para verificar si tiene permiso para acceder a la pantalla
    usuario.getAllPermisions(permiso, function(data) {
        if(data.data[0].Permisos > 0){
            // Se convierte a INT el valor del atributo data-eliminar que trae btnEliminar y se almacena en variable global
            idAlmacen = parseInt(btnEliminar.getAttribute("data-eliminar"));
            añadir_evento_click("btn_aceptar", eliminar_inv_db);
            vista.cambiar_clases("modal_confirmacion", lista_clases_modal_confirmacion_show);
        }else{
            vista.cambiar_clases('modal_info', lista_clases_modal_informacion_show);
        }
    });
}

/**
 *Funcion para eliminar un almacen de la DB
 */
function eliminar_inv_db(){
    //Se le asigna el id del almacen al objeto numero_almacen
    numero_almacen = {id_almacen:idAlmacen}
    //Consulta a la DB para cambiar el estado del almacen
    almacen.deleteAlmacen(numero_almacen, function(data){
        if(data.success){
            //Mensaje de exito y cambio de template
            mostrar_inv(usuario.id_usuario);
            vista.cambiar_clases("modal_confirmacion", lista_clases_modal_confirmacion);
        }else{
            vista.cambiar_clases("modal_error", lista_clases_modal_error_show)
        }
    })
}

/**
 *Funcion para mostar el form de edicion de un inventario seleccionado por el usuario
 *
 * @param {*} btnEditar: Id del almacen que se va a editar.
 */
function mostrar_editar_inv(btnEditar){

    //Se crea el objeto producto
    permiso = {id_rol: usuario.id_rol, id_permiso:3}
    //Consulta a la DB para verificar si el usuario puede acceder a la pantalla
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0].Permisos > 0){
            //Se convierte a INT el valor del atributo data-editar que trae btnEditar y se almacena en variable global
            idAlmacen = parseInt(btnEditar.getAttribute("data-editar"));
            //Consulta a la DB para traer la informacion del almacen
            almacen.getById(idAlmacen, function(data){
                if(data.success){
                    if(tamañoPantalla.matches){
                        vista.mostrar_plantilla("editar_inventario", "contenedor_principal", 1);
                    }
                    else{
                        vista.mostrar_plantilla("editar_inventario_desktop", "contenedor_principal", 1);
                    }
                    cambio_clases();
                    pantalla = tamañoPantalla.matches
                    almacen_mostrar = data.data;
                    //Se llama el metodo de vista para mostrar la informacion del almacen
                    vista.informacion_editar_inventario(pantalla, almacen_mostrar, "contenedor_editar_inventario");
                }else{
                    vista.cambiar_clases("modal_error", lista_clases_modal_error_show)
                }
            });
        }else{
            vista.cambiar_clases('modal_info', lista_clases_modal_informacion_show)
        }
    });
}

/**
 *Funcion para guardar la edicion de un almacen
 *
 */
function guardar_editar_inventario(){
    //Verificacion del form
    data = vista.getForm("form_editar_inventario")
    data.id_almacen = idAlmacen  //Se le asigna el id del almacen al objeto data
    if(data.ok){
        console.log(almacen);
        //Consulta a la DB para actualizar la informacion del almacen
        almacen.updateAlmacen(data, function(data){
            if(data.success){
                vista.cambiar_clases('modal_exito', lista_clases_modal_exito_show)
                mostrar_inv(usuario.id_usuario); //Mensaje de exito y cambio de template
            }else{
                vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
            }
        });
    }else{
        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
    }
}

/**
 *Funcion para obtener el id del almacen y mostrar el stock de ese almacen
 * @param {*} btnIngresar
 */
function ingresar_inventario(btnIngresar){
    idAlmacen = parseInt(btnIngresar.getAttribute("data-ingresar"));
    mostrar_stock_vacia(idAlmacen);
}

// -------- PAGINA DE STOCK ---------- \\

/**
 *Funcion para mostrar el stock de un almacen de acuerdo al id del almacen
 * @param {*} almacen: Id del almacen al que se quiere ingresar
 */
function mostrar_stock_vacia(almacen){
    //Consulta a la DB para traer todos los productos de ese almacen
    producto.getAllProductbyStore(almacen, function(data){
        if(data.success){
            //Si no hay productos en el almacen, se muestra la plantilla stock_vacia
            if(data.data.length == 0){
                if(tamañoPantalla.matches){
                    vista.mostrar_plantilla("stock_vacia", "contenedor_principal", 1);
                    vista.mostrar_plantilla("btn_tres","contenedor_boton_circular");
                    vista.mostrar_plantilla("nav_inf_con_btns","navegador_inf");
                }
                else{
                    vista.mostrar_plantilla("nav_sup_desktop","navegador_sup",0);
                    vista.mostrar_plantilla("stock_vacia_desktop", "contenedor_principal", 1);
                }
                cambio_clases();
            //Si hay productos en el almacen, se muestra la plantilla stock
            }else{
                if(tamañoPantalla.matches){
                    vista.mostrar_plantilla("stock", "contenedor_principal", 1);
                    vista.mostrar_plantilla("btn_tres","contenedor_boton_circular");
                    vista.mostrar_plantilla("nav_inf_con_btns","navegador_inf")
                }
                else{
                    vista.mostrar_plantilla("nav_sup_desktop","navegador_sup",0);
                    vista.mostrar_plantilla("stock_desktop", "contenedor_principal", 1);
                }
                cambio_clases();  
                pantalla = tamañoPantalla.matches
                lista_productos = data.data
                //Se llama el metodo de vista para mostrar la informacion de los productos
                vista.informacion_tabla_producto(pantalla, lista_productos, "fila_productos");
            }
        }
    });
}

/**
 *Funcion para mostrar el stock de un almacen de acuerdo al id del almacen
 *desde el navegador superior
 */
function mostrar_stock_nav(){
    mostrar_stock_vacia(idAlmacen);
}

/**
 *Funcion para mostrar el formulario de creacion de un producto
 */
function mostrar_form_crear_nuevo_producto(){
    
    //Se crea el Objeto permiso
    permiso = {id_rol: usuario.id_rol, id_permiso:10}
    //Consulta a la DB para verificar si tiene permiso para acceder a la pantalla
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0].Permisos > 0){
            if(tamañoPantalla.matches){
                vista.mostrar_plantilla("crear_producto", "contenedor_principal", 1);
            }
            else{
                vista.mostrar_plantilla("crear_producto_desktop", "contenedor_principal", 1);
            }
            //Consulta a la DB para traer las categorias existentes
            producto.getCategory(function (data) {
                if(data.success){
                    //Se convierte el objeto en un array con llave valor
                    lista_categorias = data.data
                    const categoriasObj = Object.fromEntries(
                        lista_categorias.map((obj) => [obj.id_categoria.toString(), obj.nombre_categoria])
                    );
                    //Se llama el metodo de vista para poblar el select id_categoria
                    console.log(categoriasObj)
                    vista.insertar_opciones_select(categoriasObj, "id_categoria", "id_categoria", "nombre_categoria")
                }
            });
        }else{
            vista.cambiar_clases('modal_info', lista_clases_modal_informacion_show);
        }
    });
}

/**
 *Funcion para crear un producto
 */
function crear_producto(){
    //Verificacion del form
    data = vista.getForm("form_crear_producto")

    if(data.ok){
        data.id_almacen = idAlmacen; //Se le asigna el id del almacen al objeto data
        //Consulta a la DB para insertar un producto
        producto.createProduct(data, function(data){
            if(data.data.message == "El producto ya existe"){
                vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
            }else{
                if(data.success){
                    vista.cambiar_clases('modal_exito', lista_clases_modal_exito_show)
                    mostrar_stock_vacia(idAlmacen); //Llamado para mostrar nuevamente el stock del almacen
                }else{
                    vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
                }
            }
        });
    }else{
        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
    }
}

/**
 *Funcion para mostrar el formulario de asignacion de un producto ya existente a un almacen
 */
function mostar_form_asignar_producto(){

    //Se crea el Obejto permiso
    permiso = {id_rol: usuario.id_rol, id_permiso:10}
    //Consulta a la DB para verificar si tiene permiso para acceder a la pantalla
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0].Permisos > 0){
            //Mostrar plantilla para crear un producto
            if(tamañoPantalla.matches){
                vista.mostrar_plantilla("crear_producto", "contenedor_principal", 1);
            }
            else{
                vista.mostrar_plantilla("asignar_producto_desktop", "contenedor_principal", 1);
            }
            cambio_clases();
            
            //Consulta a la DB para traer las categorias existentes
            producto.getCategory(function (data) {
                if(data.success) {
                    lista_categorias = data.data
                    // Se convierte el objeto en un array con llave valor
                    const categoriasObj = Object.fromEntries(
                        lista_categorias.map((obj) => [obj.id_categoria.toString(), obj.nombre_categoria])
                    );
                    // Se llama metodo de vista para poblar select id_categoria
                    console.log(categoriasObj)
                    vista.insertar_opciones_select(categoriasObj, "id_categoria", "id_categoria", "nombre_categoria")
                    //Consulta a la DB para traer los productos existentes
                    producto.getAllProduct(function(data){
                        //Se insertan los productos en el select id_producto
                        lista_productos = data.data;
                        console.log(lista_productos);
                        vista.insertar_opciones_select(lista_productos, "id_producto", "id_producto", "nombre_producto", "true")
                    });
                }
            });
        
            document.getElementById('select_id_categoria').addEventListener('change', function() {
                const categoriaSeleccionada = this.value;
                const selectProductos = document.getElementById('select_nombre_producto');
                const opciones = selectProductos.querySelectorAll('option');
        
                opciones.forEach(opcion => {
                    if (opcion.getAttribute('data-categoria') === categoriaSeleccionada || opcion.value === "") {
                        opcion.style.display = '';
                    } else {
                        opcion.style.display = 'none';
                    }
                });
            });
        
            document.getElementById('select_nombre_producto').addEventListener('change', function() {
                const productoSeleccionado = parseInt(this.value);
                const lista_inputs = ['referencia_producto','stock_minimo','promedio_costo','precio_venta'];
        
                if (productoSeleccionado > 0) {
                    let inputsProducto = lista_productos.find(x => x.id_producto === productoSeleccionado);
            
                    vista.informacion_inputs  (inputsProducto, lista_inputs);
                }else{
                    lista_inputs.forEach(input => {
                        vista.limpiar_inputs(input);
                    });
                }
            });
        }else{
            vista.cambiar_clases('modal_info', lista_clases_modal_informacion_show)
        }
    });
    
}

/**
 *Funcion para asignar un producto a un almacen
 *
 */
function asignar_producto(){
    //Verificacion del form
    data = vista.getForm("form_crear_producto")

    if(data.ok){
        //Se le asigna el id del almacen al objeto data
        data.id_almacen = idAlmacen;
        //Consulta a la DB para asignar un producto a un almacen
        producto.assignProduct(data, function(data){
            if(data.data.message == "El producto ya existe"){
                vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
            }else{
                if(data.success){
                    vista.cambiar_clases('modal_exito', lista_clases_modal_exito_show)
                    mostrar_stock_vacia(idAlmacen); //Llamado para mostrar nuevamente el stock del almacen
                }else{
                    vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
                }
            }
        });
    }else{
        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
    }
}

/**
 *Funcion para obtener el id del producto a eliminar
 *
 * @param {*} btnEliminarProducto: Contenedor con el id del producto
 */
function borrar_producto(btnEliminarProducto){

    //Se crea el Objeto permiso
    permiso = {id_rol: usuario.id_rol, id_permiso:11}
    //Consulta a la DB para verificar si tiene permiso para acceder a la pantalla
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0].Permisos > 0){
            // Se convierte a INT el valor del atributo data-eliminar que trae btnEliminarProducto y se almacena en variable global
            idProducto = parseInt(btnEliminarProducto.getAttribute("data-eliminar"));
            añadir_evento_click("btn_aceptar", eliminar_producto);
            vista.cambiar_clases("modal_confirmacion", lista_clases_modal_confirmacion_show)
        }else{
            vista.cambiar_clases('modal_info', lista_clases_modal_informacion_show);
        }
    });
}

/**
 * Funcion para eliminar un producto de un almacen
 */
function eliminar_producto(){
    //Se le asigna el id del producto al objeto inf_producto
    inf_producto = {id_producto:idProducto, id_almacen:idAlmacen}
    //Consulta a la DB para eliminar un producto
    producto.deleteProduct(inf_producto, function(data){
        if(data.success){
            mostrar_stock_vacia(idAlmacen);
            vista.cambiar_clases("modal_confirmacion", lista_clases_modal_confirmacion);
        }else{
            vista.cambiar_clases("modal_error", lista_clases_modal_error_show)
        }
    });
}

/**
 * Funcion para mostrar los detalles de un producto en especifico
 * @param {*} btnDetallesProducto: Contenedor con el id del producto
 */
function detalles_producto(btnDetallesProducto){
    
    //Se crea el Objeto permiso
    permiso = {id_rol: usuario.id_rol, id_permiso:12}
    //Consulta a la DB para verificar si tiene permiso para acceder a la pantalla
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0].Permisos > 0){
            // Se convierte a INT el valor del atributo data-detalles que trae btnDetallesProducto y se almacena en variable global
            idProducto = parseInt(btnDetallesProducto.getAttribute("data-detalles"));
            mostrar_detalles_producto(idProducto);
        }else{
            vista.cambiar_clases('modal_info', lista_clases_modal_informacion_show);
        }
    });
}

/**
 * Funcion para mostrar los detalles de un producto en especifico
 * @param {*} id_producto: Id del producto a mostrar
 */
function mostrar_detalles_producto(id_producto){
    //Se le asigna el id del producto al objeto producto_info
    producto_info = {id_producto:id_producto, id_almacen:idAlmacen}
    //Consulta a la DB para traer la informacion de un producto
    producto.getDetailsProduct(producto_info, function(data){
        if(data.success){
            if(tamañoPantalla.matches){
                vista.mostrar_plantilla("detalles_producto", "contenedor_principal", 1);
            }
            else{
                vista.mostrar_plantilla("detalles_producto_desktop", "contenedor_principal", 1);
            }
            cambio_clases();
            pantalla = tamañoPantalla.matches
            producto_detalles = data.data
            //Se llama el metodo de vista para mostrar la informacion del producto
            vista.informacion_detalles_producto(pantalla, producto_detalles, "contenedor_detalles_producto");
        }
    })


}

/**
 * Funcion para mostrar el formulario de edicion de un producto
 * @param {*} btnEditar: Contenedor con el id del producto
 */
function mostrar_editar_producto(btnEditar){

    //Se crea el Objeto permiso
    permiso = {id_rol: usuario.id_rol, id_permiso:14}
    //Consulta a la DB para verificar si tiene permiso para acceder a la pantalla
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0].Permisos > 0){
            // Se convierte a INT el valor del atributo data-editar que trae btnEditar y se almacena en variable global
            idProducto = parseInt(btnEditar.getAttribute("data-editar"));
            producto_info = {id_producto:idProducto, id_almacen:idAlmacen}
            //Consulta a la DB para traer la informacion de un producto
            producto.getDetailsProduct(producto_info, function(data){
                if(data.success){
                    if(tamañoPantalla.matches){
                        vista.mostrar_plantilla("editar_producto", "contenedor_principal", 1);
                    }
                    else{
                        vista.mostrar_plantilla("editar_producto_desktop", "contenedor_principal", 1);
                    }
                    cambio_clases();
                    pantalla = tamañoPantalla.matches;
                    producto_mostrar = data.data;
                    //Se llama el metodo de vista para mostrar la informacion del producto
                    vista.informacion_editar_producto(pantalla,producto_mostrar,"form_editar_producto")
                    //Consulta a la DB para traer las categorias existentes
                    producto.getCategory(function (data) {
                        if(data.success){
                            //Se convierte el objeto en un array con llave valor y se llama el metodo de vista para poblar el select id_categoria
                            lista_categorias = data.data
                            const categoriasObj = Object.fromEntries(
                                lista_categorias.map((obj) => [obj.id_categoria.toString(), obj.nombre_categoria])
                            );
                            console.log(categoriasObj)
                            vista.insertar_opciones_select(categoriasObj, "id_categoria", "id_categoria", "nombre_categoria")
                        }
                    });
                }else{
                    vista.cambiar_clases("modal_error", lista_clases_modal_error_show)
                }
            });
        }else{
            vista.cambiar_clases('modal_info', lista_clases_modal_informacion_show);
        }
    });
}

/**
 * Funcion para guardar la edicion de un producto
 */
function guardar_editar_producto(){
    //Verificacion del form
    data = vista.getForm("form_editar_producto")
    data.id_producto = idProducto;
    if(data.ok){
        //Consulta a la DB para actualizar la informacion de un producto
        producto.updateDetailsProduct(data, function(data){
            if(data.data.message == "El producto ya existe"){
                vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
            }else{
                if(data.success){
                    vista.cambiar_clases('modal_exito', lista_clases_modal_exito_show)
                    mostrar_detalles_producto(idProducto); //Se vuele a mostrar la informacion del producto
                }else{
                    vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
                }
            }
        });
    }else{
        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
    }
}

function mostrar_mov_del_producto(){

    const movimientos_producto = {id_producto:idProducto, id_almacen:idAlmacen}

    //Consulta a la DB para traer los movimientos de un producto
    producto.getTransactions(movimientos_producto, function(data){
        console.log(data)
        if(data.success){
            
            if(tamañoPantalla.matches){
                vista.mostrar_plantilla("movimientos_del_producto", "contenedor_principal", 1);
            }
            else{
                vista.mostrar_plantilla("movimientos_del_producto_desktop", "contenedor_principal", 1);
            }
            cambio_clases();
            pantalla = tamañoPantalla.matches;
            lista_movimientos = data.data;
            //Se llama el metodo de vista para mostrar la informacion de los movimientos
            vista.informacion_tabla_movimientos_producto(pantalla, lista_movimientos, "fila_movimientos_producto");
        }
    })

}

/**
 * Funcion para mostrar la pagina de abastecimiento del almacen
 */
function mostrar_abastecimiento(){
    //Consulta a la DB para traer los productos del almacen
    producto.getProvision(idAlmacen, function(data){
        if(data.success){
            //Cambio de pantalla
            if(tamañoPantalla.matches){
                vista.mostrar_plantilla("abastecimiento", "contenedor_principal", 1);
            }
            else{
                vista.mostrar_plantilla("abastecimiento_desktop", "contenedor_principal", 1);
            }
        }else{
            vista.cambiar_clases("modal_error",lista_clases_modal_error_show)
        }
        cambio_clases();
        pantalla = tamañoPantalla.matches
        lista_productos = data.data
        //Se llama el metodo de vista para mostrar la informacion de los productos
        vista.informacion_tabla_abastecimiento(pantalla, lista_productos, "fila_abastecimientos");
    });
}

// -------- PAGINA DE CATEGORIAS ---------- \\

/**
 * Funcion para mostrar las categorias
 */
function mostrar_categorias(){

    //Se crea el Objeto permiso
    permiso = {id_rol: usuario.id_rol, id_permiso:15}
    //Consulta a la DB para verificar si tiene permiso para acceder a la pantalla
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0].Permisos > 0){
            //Consulta a la DB para traer las categorias existentes
            producto.getCategory(function(data){
                if(data.success){
                    if(data.data.length == 0){
                        if(tamañoPantalla.matches){
                            vista.mostrar_plantilla("categorias_vacia", "contenedor_principal", 1);
                            vista.mostrar_plantilla("btn_uno","contenedor_boton_circular");
                            añadir_evento_click("boton_crear_inv", mostrar_form_crear_categoria);
                        }
                        else{
                            vista.mostrar_plantilla("categorias_vacia_desktop", "contenedor_principal", 1);
                        }
                    }else{
                        if(tamañoPantalla.matches){
                            vista.mostrar_plantilla("categorias", "contenedor_principal", 1);
                            vista.mostrar_plantilla("btn_uno","contenedor_boton_circular");
                            añadir_evento_click("boton_crear_inv", mostrar_form_crear_categoria);
                        }
                        else{
                            vista.mostrar_plantilla("categorias_desktop", "contenedor_principal", 1);
                        }
                        cambio_clases();
                        pantalla = tamañoPantalla.matches
                        lista_categorias = data.data //Se almacenan las categorias en una variable global
                        //Se llama el metodo de vista para mostrar la informacion de las categorias
                        vista.informacion_tabla_categoria(pantalla, lista_categorias, "fila_categorias");
                    }
                }
            });
        }else{
            vista.cambiar_clases('modal_info', lista_clases_modal_informacion_show);
        }
    });
}

/**
 * Funcion para mostrar el formulario de creacion de una categoria
 */
function mostrar_form_crear_categoria(){

    //Se crea el Objeto permiso
    permiso = {id_rol: usuario.id_rol, id_permiso:16}
    //Consulta a la DB para verificar si tiene permiso para acceder a la pantalla
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0].Permisos > 0){
            if(tamañoPantalla.matches){
                vista.mostrar_plantilla("crear_categoria", "contenedor_principal", 1);
            }
            else{
                vista.mostrar_plantilla("crear_categoria_desktop", "contenedor_principal", 1);
            }    
        }else{
            vista.cambiar_clases('modal_info', lista_clases_modal_informacion_show);
        }
    });
}

/**
 * Funcion para crear una categoria
 */
function crear_categoria(){
    //Verificacion del form
    data = vista.getForm("form_crear_categoria")
    if(data.ok){
        //Consulta a la DB para insertar una categoria
        producto.createCategory(data, function(data){
            if(data.success){
                vista.cambiar_clases('modal_exito', lista_clases_modal_exito_show)
                mostrar_categorias(); //Se vuelve a mostrar la informacion de las categorias
            }else{
                vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
            }
        });
    }else{
        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
    }

}

/**
 * Funcion para mostrar formulario par editar una categoria
 * @param {*} btnEditar: Contenedor con el id de la categoria
 */
function mostrar_editar_categoria(btnEditar){

    //Se crea el Objeto permiso
    permiso = {id_rol: usuario.id_rol, id_permiso:17}
    //Consulta a la DB para verificar si tiene permiso para acceder a la pantalla
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0] > 0){
            idCategoria = parseInt(btnEditar.getAttribute("data-editar"));
        
            if(tamañoPantalla.matches){
                vista.mostrar_plantilla("editar_categoria", "contenedor_principal", 1);
            }
            else{
                vista.mostrar_plantilla("editar_categoria_desktop", "contenedor_principal", 1);
            }
            cambio_clases();
            pantalla = tamañoPantalla.matches;
            lista_categorias = lista_categorias.filter(x => x.id_categoria == idCategoria);
            vista.informacion_editar_categoria(pantalla, lista_categorias, "contenedor_editar_categoria");
        }else{
            vista.cambiar_clases('modal_info', lista_clases_modal_informacion_show);
        }
    });
}

/**
 * Funcion para guardar la edicion de una categoria
 */
function guardar_editar_categoria(){
    //Verificacion del form
    data = vista.getForm("form_editar_categoria")
    data.id_categoria = idCategoria; //Se le asigna el id de la categoria al objeto data
    if(data.ok){
        producto.updateCategory(data, function(data){
            if(data.success){
                mostrar_categorias(); //Se vuelve a mostrar la informacion de las categorias
            }else{
                vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
            }
        });
    }else{
        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
    }
}

/**
 * Funcion para eliminar una categoria de la vista
 * @param {*} btnEliminar: Id de la categoria
 */
function elimiar_catg_vista(btnEliminar){
    //Se crea el Objeto permiso
    permiso = {id_rol: usuario.id_rol, id_permiso:18}
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0] > 0){
            //Consulta a la DB para verificar si tiene permiso para acceder a la pantalla
            idCategoria = parseInt(btnEliminar.getAttribute("data-eliminar"))
            añadir_evento_click("btn_aceptar", eliminar_catg_db);
            vista.cambiar_clases("modal_confirmacion", lista_clases_modal_confirmacion_show)
        }else{
            vista.cambiar_clases('modal_info', lista_clases_modal_informacion_show);
        }
    });
}

/**
 * Funcion para eliminar una categoria de la DB
 */
function eliminar_catg_db(){
    //Se le agrega el id de la categoria al objeto numero_categoria
    numero_categoria = {id_categoria:idCategoria}
    //Consulta a la DB para eliminar la categoria
    producto.deleteCategory(numero_categoria, function(data){
        if(data.success){
            mostrar_categorias()
            vista.cambiar_clases("modal_confirmacion", lista_clases_modal_confirmacion);
        }else{
            vista.cambiar_clases("modal_error", lista_clases_modal_error_show)
        }
    })
}


//----------------- PAGINA DE MOVIMIENTOS -----------------\\

function obtener_fecha(){
    let fechaInicio = Date.now();
    let fechaFin = Date.now();
    fechaInicio = new Date(fechaInicio);
    fechaFin = new Date(fechaFin);
    fechaFin.setDate(fechaFin.getDate() + 1);
    fechaInicio = String(fechaInicio.toISOString().slice(0,10));
    fechaFin = String(fechaFin.toISOString().slice(0,10));
    return {fecha_inicio:fechaInicio, fecha_fin: fechaFin};
}

function mostrar_movimientos_vacia(){
    const informacion_movimientos = obtener_fecha();
    informacion_movimientos.id_almacen=idAlmacen;
    producto.getOperations(informacion_movimientos, function(data){  
        if(data.success){
            if(data.message == "No se encontraron movimientos"){
                if(tamañoPantalla.matches){
                    vista.mostrar_plantilla("movimientos_vacia", "contenedor_principal", 1);
                    vista.mostrar_plantilla("btn_dos","contenedor_boton_circular");
                }
                else{
                    vista.mostrar_plantilla("movimientos_vacia_desktop", "contenedor_principal", 1);
                }
            }else{
                if(tamañoPantalla.matches){
                    vista.mostrar_plantilla("movimientos", "contenedor_principal", 1);
                    vista.mostrar_plantilla("btn_dos","contenedor_boton_circular");
                    añadir_evento_click("btn_dos", mostrar_movimientos);
                }
                else{
                    vista.mostrar_plantilla("movimientos_desktop", "contenedor_principal", 1);
                }
                cambio_clases();
                pantalla = tamañoPantalla.matches
                lista_movimientos = data.data
                vista.informacion_tabla_movimientos(pantalla, lista_movimientos, "fila_movimientos");
            }
        }
    });
}

function mostrar_form_crear_entrada(){
    
    //Se crea el Obejto permiso
    permiso = {id_rol:usuario.id_rol, id_permiso:7}
    //Consulta a la DB para verificar si tiene permiso para acceder a la pantalla
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0].Permisos > 0){
            lista_productos_operaciones = [];
        
            if(tamañoPantalla.matches){
                vista.mostrar_plantilla("crear_entrada", "contenedor_principal", 1);
            }
            else{
                vista.mostrar_plantilla("crear_entrada_desktop", "contenedor_principal", 1);
            }
            cambio_clases();
        
            //Se busca el nombre del almacen y se inserta en el input
            let informacionInputAlmacen = lista_almacenes.find(x => x.id_almacen === idAlmacen);
            let inputAlmacen = ['nombre_almacen']
            vista.informacion_inputs(informacionInputAlmacen, inputAlmacen);
        
            // Se convierte el objeto en un array con llave valor
            const productosObj = Object.fromEntries(
                lista_productos.map((obj) => [obj.id_producto.toString(), obj.nombre_producto])
            );
        
            // Se llama metodo de vista para poblar select select_nombre_producto
            vista.insertar_opciones_select(productosObj, "id_producto", "id_producto", "nombre_producto")
        
            //Se escucha el cambio de opcion en el select y se agrega la referecia del producto segun lo seleccionado
            document.getElementById('select_nombre_producto').addEventListener('change', function() {
                const productoSeleccionado = parseInt(this.value);
                const lista_inputs = ['referencia_producto'];
        
                if (productoSeleccionado > 0) {
                    let inputsProducto = lista_productos.find(x => x.id_producto === productoSeleccionado);
            
                    vista.informacion_inputs  (inputsProducto, lista_inputs);
                }else{
                    lista_inputs.forEach(input => {
                        vista.limpiar_inputs(input);
                    });
                }
            });
        }else{
            vista.cambiar_clases('modal_info', lista_clases_modal_informacion_show);
        }
    })

}

function agregar_producto_entrada(){

    //Se obtiene la informacion del formulario   
    producto_entrada = vista.getForm("form_crear_entrada");

    //Se busca el nombre del producto y se inserta en el objeto
    let nombre_producto_entrada = lista_productos.find(x => x.id_producto == producto_entrada.id_producto);

    //Se inserta el nombre del producto en el objeto
    producto_entrada.nombre_producto = nombre_producto_entrada.nombre_producto;

    //Si la informacion del form esta completa se muestra el modal de exito y se inserta la informacion en la tabla
    if(producto_entrada.ok){
        vista.cambiar_clases('modal_exito', lista_clases_modal_exito_show)

        pantalla = tamañoPantalla.matches
        vista.informacion_tabla_entradas(pantalla, producto_entrada, "tbody_productos_entradas")
        
        //Se crea el objeto con la informacion de la entrada
        let data = {
            id_almacen: idAlmacen,
            origen_entrada: producto_entrada.origen_entrada,
            productos_entradas: lista_productos_operaciones
        }
    
        //Se eliminan las propiedades del objeto que no se necesitan en la entrada
        delete producto_entrada.ok;
        delete producto_entrada.msj;
        delete producto_entrada.nombre_producto;
        delete producto_entrada.referencia_producto;
        delete producto_entrada.id_rol;
        delete producto_entrada.nombre_almacen
        delete producto_entrada.origen_entrada;
        delete producto_entrada[""]
    
        //se hace push a la lista de productos
        lista_productos_operaciones.push(producto_entrada);
        infomacion_entrada = data
        console.log(infomacion_entrada)

    }else{
        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
    }
}

function crear_entrada(){
    //Consulta a la DB para insertar una entrada
    producto.createEntry(infomacion_entrada, function(data){
        if(data.success){
            vista.cambiar_clases('modal_exito', lista_clases_modal_exito_show)
            mostrar_movimientos_vacia();
        }else{
            vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
        }
    });
}

function mostar_form_crear_salida(){

    //Se crea el Objeto permiso
    permiso = {id_rol:usuario.id_rol, id_permiso:8}
    //Consulta a la DB para verificar si tiene permiso para acceder a la pantalla
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0].Permisos > 0){
            lista_productos_operaciones = [];
        
            if(tamañoPantalla.matches){
                vista.mostrar_plantilla("crear_salida", "contenedor_principal", 1);
            }else{
                vista.mostrar_plantilla("crear_salida_desktop", "contenedor_principal");
            }
            cambio_clases();
        
            //Se busca el nombre del almacen y se inserta en el input
            let informacionInputAlmacen = lista_almacenes.find(x => x.id_almacen === idAlmacen);
            let inputAlmacen = ['nombre_almacen']
            vista.informacion_inputs(informacionInputAlmacen, inputAlmacen);
        
            // Se convierte el objeto en un array con llave valor
            const productosObj = Object.fromEntries(
                lista_productos.map((obj) => [obj.id_producto.toString(), obj.nombre_producto])
            );
        
            // Se llama metodo de vista para poblar select select_nombre_producto
            vista.insertar_opciones_select(productosObj, "id_producto", "id_producto", "nombre_producto")
        
            //Se escucha el cambio de opcion en el select y se agrega la referecia del producto segun lo seleccionado
            document.getElementById('select_nombre_producto').addEventListener('change', function() {
                const productoSeleccionado = parseInt(this.value);
                const lista_inputs = ['referencia_producto'];
        
                if (productoSeleccionado > 0) {
                    let inputsProducto = lista_productos.find(x => x.id_producto === productoSeleccionado);
            
                    vista.informacion_inputs  (inputsProducto, lista_inputs);
                }else{
                    lista_inputs.forEach(input => {
                        vista.limpiar_inputs(input);
                    });
                }
            });
        }else{
            vista.cambiar_clases('modal_info', lista_clases_modal_informacion_show);
        }
    });

}

function agregar_producto_salida(){

    //Se obtiene la informacion del formulario   
    producto_salida = vista.getForm("form_crear_salida");
    console.log(producto_salida)

    //Se busca el nombre del producto y se inserta en el objeto
    let nombre_producto_salida = lista_productos.find(x => x.id_producto == producto_salida.id_producto);

    //Se inserta el nombre del producto en el objeto
    producto_salida.nombre_producto = nombre_producto_salida.nombre_producto;

    //Si la informacion del form esta completa se muestra el modal de exito y se inserta la informacion en la tabla
    if(producto_salida.ok){

            let productoStock = lista_productos.find(x => x.id_producto == producto_salida.id_producto);
            console.log(productoStock)
            if (producto_salida.cantidad_salida > productoStock.cantidad_disponible) {
                console.log('No hay suficiente stock')
                vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
                return;
            }else{
                
                vista.cambiar_clases('modal_exito', lista_clases_modal_exito_show)
                pantalla = tamañoPantalla.matches
                vista.informacion_tabla_salidas(pantalla, producto_salida, "tbody_productos_salidas")
                
                //Se crea el objeto con la informacion de la entrada
                let data = {
                    id_almacen: idAlmacen,
                    destino_salida: producto_salida.destino_salida,
                    productos_salidas: lista_productos_operaciones
                }
            
                //Se eliminan las propiedades del objeto que no se necesitan en la entrada
                delete producto_salida.ok;
                delete producto_salida.msj;
                delete producto_salida.nombre_producto;
                delete producto_salida.referencia_producto;
                delete producto_salida.id_rol;
                delete producto_salida.nombre_almacen
                delete producto_salida.destino_salida;
                delete producto_salida[""]
            
                //se hace push a la lista de productos
                lista_productos_operaciones.push(producto_salida);
                infomacion_salida = data
                console.log(infomacion_salida)      

                for (const producto of infomacion_salida.productos_salidas) {
                let productoStock = lista_productos.find(x => x.id_producto == producto.id_producto);
                console.log(productoStock)

                    if (producto.cantidad_salida > productoStock.cantidad_disponible){
                        console.log('No hay suficiente stock')
                        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
                        return;
                    }
                }
                
            }
        
    }else{
        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
    };

}

function crear_salida(){

    //Consulta a la DB para insertar una salida
    producto.createExit(infomacion_salida, function(data){
        if(data.success){
            vista.cambiar_clases('modal_exito', lista_clases_modal_exito_show)
            mostrar_movimientos_vacia();
        }else{
            vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
        }
    });
}

//----------------- PAGINA DE PERFILES -----------------\\

function mostrar_perfiles(){

    //Se crea el Objeto permiso
    permiso = {id_rol: usuario.id_rol, id_permiso:22}
    //Consulta a la DB para verificar si tiene permiso para acceder a la pantalla
    usuario.getAllPermisions(permiso, function(data){
        if(data.data[0].Permisos > 0){
            usuario.getAllProfile(usuario.id_usuario, function(data){
                if(data.success){
                    if(data.data.length == 0){
                        if(tamañoPantalla.matches){
                            vista.mostrar_plantilla("perfiles_vacia", "contenedor_principal", 1);
                            vista.mostrar_plantilla("btn_uno","contenedor_boton_circular");
                            añadir_evento_click("boton_crear_inv", mostrar_form_crear_perfil);
                        }
                        else{
                            vista.mostrar_plantilla("perfiles_vacia_desktop", "contenedor_principal", 1);
                        }
                        cambio_clases();
                    }else{
                        if(tamañoPantalla.matches){
                            vista.mostrar_plantilla("perfiles_con_inf", "contenedor_principal", 1);
                            vista.mostrar_plantilla("btn_uno","contenedor_boton_circular");
                            añadir_evento_click("boton_crear_inv", mostrar_form_crear_perfil);
                        }
                        else{
                            vista.mostrar_plantilla("perfiles_con_inf_desktop", "contenedor_principal", 1);
                        }
                        cambio_clases();
                            /* Se llama el metodo de vista para crear la cantidad y tipo de targetas 
                            de acuerdo a la cantidad traida por la DB y tamaño de la pantalla.
                        */
                        pantalla = tamañoPantalla.matches
                        lista_perfiles = data.data
                        vista.informacion_tabla_perfiles(pantalla, lista_perfiles, "fila_perfiles");
                    }
                }else{
                    vista.cambiar_clases("modal_error",lista_clases_modal_error_show)
                }
            });
        }
    });
}

function mostrar_form_crear_perfil(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("crear_perfil", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("crear_perfil_desktop", "contenedor_principal", 1);
    }

    //Consultar categorias de los productos 
    usuario.getAllDocuments(function (data) {
        if(data.success) {
            lista_opciones = []
            lista_opciones = data.data
            // Se convierte el objeto en un array con llave valor
            const documentosObj = Object.fromEntries(
                lista_opciones.map((obj) => [obj.id_tipo_documento.toString(), obj.tipo_documento])
                );
                console.log(documentosObj)
            // Se llama metodo de vista para poblar select id_categoria
            vista.insertar_opciones_select(documentosObj, "tipo_documento", "id_tipo_documento", "tipo_documento")
        }
    });

    usuario.getAllRoles(function (data) {
        if(data.success){
            lista_opciones = []
            lista_opciones = data.data
            const rolesObj = Object.fromEntries(
                lista_opciones.map((obj) => [obj.id_rol.toString(), obj.nombre_rol])
            );
            console.log(rolesObj)
            vista.insertar_opciones_select(rolesObj, "id_rol", "id_rol", "nombre_rol")
        }
    });

    document.getElementById('select_roles').addEventListener('change', function() {
        const rolSeleccionado = (this.value);

        if(rolSeleccionado == 3){
            const selectAlmacenes = document.getElementById('select_almacenes');
            const almacenesObj = Object.fromEntries(
                lista_almacenes.map((obj) => [obj.id_almacen.toString(), obj.nombre_almacen])
            );
            console.log(almacenesObj)
            vista.insertar_opciones_select(almacenesObj, "id_almacen", "id_almacen", "nombre_almacen")

            selectAlmacenes.removeAttribute('hidden');
        }else if(rolSeleccionado != 3){
            const selectAlmacenes = document.getElementById('select_almacenes');
            selectAlmacenes.setAttribute('hidden', true);
        }
    });
}

function crear_perfil(){
    
    data = vista.getForm("form_crear_perfil")
    data.id_jefe = usuario.id_usuario;
    
    if(data.ok){
        usuario.registerProfile(data, function(dataRes){
            if(dataRes.success){
                const perfil = {id_usuario:dataRes.data, id_almacen:data.id_almacen}
                almacen.asignAlmacen(perfil, function(data){
                    if(data.success){
                        vista.cambiar_clases('modal_exito', lista_clases_modal_exito_show)
                        mostrar_perfiles();
                    }else{
                        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
                    }   
                });
            }else{
                vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
            }
        });
    }else{
        vista.cambiar_clases('modal_error', lista_clases_modal_error_show)
    }
}

function editar_perfiles(btnEditar){

    // Se convierte a INT el valor del atributo data-detalles que trae btnDetallesProducto y se almacena en variable global
    idPerfil = parseInt(btnEditar.getAttribute("data-editar"));

    usuario.getUser(idPerfil, function(data){
        if(data.success){
            if(tamañoPantalla.matches){
                vista.mostrar_plantilla("editar_perfiles", "contenedor_principal", 1);
            }
            else{
                vista.mostrar_plantilla("editar_perfiles_desktop", "contenedor_principal", 1);
            }
            cambio_clases();
            pantalla = tamañoPantalla.matches;
            perfil = data.data;
            vista.informacion_editar_perfil(pantalla, perfil, "fila_editar_perfil")
            usuario.getAllRoles(function (data) {
                if(data.success){
                    perfil_actual = perfil[0].nombre_rol
                    lista_opciones = []
                    lista_opciones = data.data
                    const rolesObj = Object.fromEntries(
                        lista_opciones.filter(obj => obj.nombre_rol != perfil_actual).map((obj) => [obj.id_rol.toString(), obj.nombre_rol])
                    );
                    console.log(rolesObj)
                    vista.insertar_opciones_select(rolesObj, "id_rol", "id_rol", "nombre_rol")
                }
            });
        }else{
            vista.cambiar_clases("modal_error", lista_clases_modal_error_show)
        }

    });

}

function mostrar_editar_perfiles(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("editar_perfiles", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("editar_perfiles_desktop", "contenedor_principal", 1);
    }
    cambio_clases();
}

function mostrar_seleccionar_informe(){
    if(tamañoPantalla.matches){
        vista.mostrar_plantilla("seleccionar_informe", "contenedor_principal", 1);
    }
    else{
        vista.mostrar_plantilla("seleccionar_informe_desktop", "contenedor_principal", 1);
    }
}


// Funciones para cambiar plantillas desde la pantalla de Perfiles



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

function mostrar_modal_confirmacion(evento_click){
    vista.cambiar_clases("modal_confirmacion", lista_clases_modal_confirmacion_show)    
    añadir_evento_click("btn_aceptar", evento_click)
}

function cerrar_modal_registro(){
    vista.cambiar_clases('modal_registro', lista_clases_modal_registro);   
}

function cerrar_modal_login(){
    vista.cambiar_clases('modal_login', lista_clases_modal_login);

}

function cerrar_modal_confirmacion(){
    vista.cambiar_clases('modal_confirmacion', lista_clases_modal_confirmacion);
}

function cerrar_modal_error(){
    vista.cambiar_clases('modal_error', lista_clases_modal_error);
}

function cerrar_modal_exito(){
    vista.cambiar_clases('modal_exito', lista_clases_modal_exito);
}

function cerrar_modal_informacion(){
    vista.cambiar_clases('modal_info', lista_clases_modal_informacion)
}

