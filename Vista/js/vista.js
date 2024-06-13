class Vista {
  constructor() {
    this.stack_pantallas = []; //Contiene el historial de navegacion de pantallas
  }

  /**
   * Metodo para limpiar un contenedor
   * @param {*} contenedor: id del contenedor a limpiar
   * @memberof Vista
   */
  limpiar_contenedor(contenedor) {
    let cont = document.getElementById(contenedor);
    cont.innerHTML = "";
  }

  /**
   * Metodo para desplegar una plantilla en un contenedor y guardar el nombre de la plantilla en la pila de pantallas
   * @param {*} plantilla: id de la plantilla a desplegar 
   * @param {*} contenedor: id del contenedor donde se desplegara la plantilla
   * @param {*} pila: si es 1 se guarda el nombre de la plantilla en el historial de navegacion
   * @returns none
   * @memberof Vista
   */
  mostrar_plantilla(plantilla, contenedor, pila) {
    let cont = document.getElementById(contenedor);
    cont.innerHTML = "";
    //Clonar el contenido del template
    let template = document.getElementById(plantilla);
    if(template){
        let clone = template.content.cloneNode(true);
        cont.appendChild(clone);
    }
    if(pila){
        this.stack_pantallas.push(plantilla);
    }   
  }

  // /**
  //  * Metodo para cerrar una pantalla
  //  * @param {*} plantilla 
  //  */

  // cerrarPantalla(plantilla){ 
  //   let cont = document.getElementById(plantilla);
  //   cont.style.display = "none"
  // }

  /**
   * Metodo para regresar a la pantalla anterior
   * @param {*} none: no recibe parametros
   * @memberof Vista
   */
  regresar_pantalla() {
    let plantilla = this.stack_pantallas.pop(); //Saca el ultimo elemento de la pila
    if (this.stack_pantallas.length > 0) {
      let cont = document.getElementById("contenedor_principal");
      cont.innerHTML = "";
      plantilla=this.stack_pantallas[this.stack_pantallas.length-1]; //Obtiene el nombre de la plantilla anterior
      //clonar el contenido del template
      let template = document.getElementById(plantilla);
      let clone = template.content.cloneNode(true);
      cont.appendChild(clone);
    }
    else{
      let cont = document.getElementById("contenedor_principal");
      cont.innerHTML = "";
      let template = document.getElementById(plantilla);
      let clone = template.content.cloneNode(true);
      cont.appendChild(clone);
      this.stack_pantallas.push(plantilla);
    }
  }

  /**
   * Metodo para cambiar las clases de un contenedor
   * @param {*} contenedor_etiqueta: id del contenedor al que se le cambiaran las clases
   * @param {*} lista_clases: lista de clases que se modificaran del contenedor
   * @memberof Vista
   */
  cambiar_clases(contenedor_etiqueta, lista_clases){
    let contenedor = document.getElementById(contenedor_etiqueta);
    contenedor.className = "";
    for(let nombre_clase of lista_clases){
      contenedor.classList.add(nombre_clase);
    }
  }

  /**
   * Metodo para insertar un template en un contenedor
   * @param {*} template_id: id del template a insertar
   * @param {*} contenedor_id: id del contenedor donde se insertara el template 
   * @memberof Vista
   */
  anadir_seccion(template_id, contenedor_id){
    const template_insertar = document.getElementById(template_id);
    const contenedor = document.getElementById(contenedor_id);
    const clone = template_insertar.content.cloneNode(true);
    contenedor.appendChild(clone);
  }

  /**
   * Metodo para remover una etiqueta
   * @param {*} etiqueta: id de la etiqueta a remover
   * @memberof Vista
   */
  remover_etiqueta(etiqueta){
    const elemento = document.getElementById(etiqueta);
    elemento.remove();
  }

  /**
   * Metodo para añadir una etiqueta
   * @param {*} etiqueta: nombre de la etiqueta que se va a añadir 
   * @param {*} contenedor: id del contenedor donde se va a añadir la etiqueta
   * @param {*} id_etiqueta: id de la etiqueta que se va a añadir
   * @memberof Vista
   */
  añadir_etiqueta(etiqueta, contenedor, id_etiqueta){
    const tag = document.createElement(etiqueta);
    tag.id = id_etiqueta;
    const cont = document.getElementsByTagName(contenedor);
    cont[0].appendChild(tag);
  }

  /**
   * Metodo para añadir padding inferior a un contenedor
   * @param {*} id_contenedor: id del contenedor al que se le añadira el padding
   * @param {*} padding: valor del padding que se añadira al contenedor
   * @memberof Vista
   */
  añadir_padding(id_contenedor, padding){
    let contenedor = document.getElementById(id_contenedor);
    contenedor.style.paddingBottom = padding;
  }

  
  /**
   * Metodo para obtener los datos de un formulario
   *
   * @param {*} formulario: nombre del formulario del que se obtendran los datos
   * @return {*} data: objeto con los datos del formulario
   * @memberof Vista
   */
  getForm(formulario) {
    let form = document.getElementById(formulario);
    let datos = Array.from(form.elements);
    let data = {};
    data.ok = true; //Bandera para verificar si los campos estan llenos
    data.msj = ""; //Mensaje de error
    data.id_rol = 1;
  
    datos.forEach((element) => {
      data[element.name] = element.value;
      if (element instanceof HTMLInputElement){
        let value = element.value;
        if(value === "" || (element.tagName === "SELECT" && value === "0")) {
          data.ok = false;
          data.msj = "Por favor llene " + key;
        }
        else if (element.type == "email") {
          if (!this.validar_email(value)) {
            data.ok = false;
            data.msj = "No es un correo válido: " + value;     
            console.log(data.msj);     
          }
        }
        else if (form.id == "form_registro_usuario" && element.name == "contraseña"){
          if (!this.validar_contraseña(value)){
            data.ok = false;
            data.msj = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número";
            console.log(data.msj);
          }
        }
        else if (form.id == "form_registro_usuario" && element.name == "confirmar_contraseña"){
          let password = form.elements["contraseña"].value;
          if (value !== password) {
            data.ok = false;
            data.msj = "Las contraseñas no coinciden";
            console.log(data.msj);
          }
        }  
      }
    });
    return data;
  }


  /**
   *Metodo para validar el correo electronico
   *
   * @param {*} email: Correo ingresado por el usuario
   * @return {*}: true si el correo es valido, false si no lo es
   * @memberof Vista
   */
  validar_email(email) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  /**
   *Metodo para validar la contraseña
   *
   * @param {*} contraseña: Contraseña ingresada por el usuario
   * @return {*}: true si la contraseña es valida, false si no lo es
   * @memberof Vista
   */
  validar_contraseña(contraseña){
    return contraseña.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    );
  }
  
  /**
   *Metodo para añadir opciones de un select
  *
  * @param {*} opciones: opciones a añadir al select que devuelve server como lista
  * @param {*} selectName: nombre del select al que se le añadiran las opciones
  * @param {*} nombre_llave: nombre de la llave de las opciones
  * @param {*} nombre_valor: nombre del valor de las opciones
  * @memberof Vista
  */
  insertar_opciones_select(opciones, select_name, nombre_llave, nombre_valor, tipo_opcion = null){
    const select = document.getElementsByName(select_name);

    if(tipo_opcion == null){
      if (select) {
        Object.entries(opciones).forEach(([nombre_llave, nombre_valor]) => {
          const option = document.createElement('option');
          option.value = nombre_llave;
          option.textContent = nombre_valor;
          select[0].appendChild(option);
        });
      } else {
        console.error('El contenedro especificado no existe')
      }
    }else{
      for(let i = 0; i < opciones.length; i++){
        if (select) {
            const option = document.createElement('option');
            option.value = opciones[i].id_producto;
            option.textContent = opciones[i].nombre_producto;
            option.setAttribute('data-categoria', opciones[i].id_categoria); // Agregar atributo data-categoria
            select[0].appendChild(option);
        } else {
          console.error('El contenedro especificado no existe')
        }
      }
    }

  }

  /**
   * Metodo para mostrar la informacion de los almacenes en una tarjeta
   * @param {*} tamaño_pantalla: tamaño de la pantalla para mostrar una tarjeta u otra
   * @param {*} lista_almacenes: lista de almacenes a mostrar
   * @param {*} id_contenedor: id del contenedor donde se mostrara la informacion
   */
  informacion_tarjeta_inventario (tamaño_pantalla, lista_almacenes, id_contenedor) {
    let cont = document.getElementById(id_contenedor);
    for (const almacen of lista_almacenes){
      if(almacen.estado_almacen == 1){
        if(tamaño_pantalla == true){
          const html = `
          <div class="d-flex dropdown"> <!-- Contenedor para el dropdown -->
                    <button class="d-flex justify-content-between align-items-center boton_informacion_dropdown"
                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <div class="color_lateral" id="lateral_oscuro"></div>
                        ${almacen.nombre_almacen}
                    </button>
                    <ul class="dropdown-menu informacion_dropdown_contenido">
                        <!-- Lista de infomacion desplegable en el dropdown -->
                        <li class="d-flex align-items-center texto_dropdown">
                            <p type="text" name="" class="elementos_listas">Direccion: ${almacen.direccion_almacen}</p>
                        </li>
                        <li class="d-flex align-items-center texto_dropdown">
                            <p type="text" name="" class="elementos_listas">Descripcion: ${almacen.descripcion_almacen}</p>
                        </li>
                        <li class="d-flex accion_dropdown align-items-center justify-content-center">
                            <a href="#" onclick="mostrar_editar_inv(this)" data-editar="${almacen.id_almacen}">Editar Inventario</a>
                        </li>
                        <li class="d-flex accion_dropdown align-items-center justify-content-center">
                            <a href="#" onclick="ingresar_inventario(this)" data-ingresar="${almacen.id_almacen}">Ver Inventario</a>
                        </li>
                    </ul>
                </div>
          `
          cont.innerHTML += html;
        }else{
          const html = `
          <div class="container inventario flex-wrap col-lg-3">
                  <div class="d-flex justify-content-between">
                      <h3 class="inventario__title" id="nombre_inventario">${almacen.nombre_almacen}</h3>
                      <div class="btn-group" role="group">
                          <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                              aria-expanded="false">
                              <img src="./Assets/img/menu_horizontal.svg" alt="" />
                          </button>
                          <ul class="dropdown-menu">
                              <li class="d-grid gap-2">
                                  <button class="btn d-flex align-items-center" onclick="mostrar_editar_inv(this)" data-editar="${almacen.id_almacen}">
                                      <img src="./Assets/img/lapiz_editar.svg" alt="" />
                                      <p>Editar</p>
                                  </button>
                              </li>
                              <li class="d-grid gap-2">
                                  <button class="btn  d-flex align-items-center" onclick="eliminar_inv_vista(this)" data-eliminar="${almacen.id_almacen}">
                                      <img src="./Assets/img/eliminar.svg" alt="" />
                                      <p>Eliminar</p>
                                  </button>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <p class="inventario__paragraph" id="direccion_inventario">${almacen.direccion_almacen}</p>
                  <p class="inventario__paragraph" id="descripcion_inventario">${almacen.descripcion_almacen}</p>
                  <div class="d-grid gap-2">
                      <button class="btn btn-general" type="button" onclick="ingresar_inventario(this)" data-ingresar="${almacen.id_almacen}">
                          Ver Inventario
                      </button>
                  </div>
              </div>
          `
          cont.innerHTML += html;
        }
      }
    }
  }

  /**
   * Metodo para mostar campos de edicion de un almacen, con la informacion actual del almacen
   * @param {*} tamaño_pantalla: tamaño de la pantalla
   * @param {*} almacen: informacion del almacen a editar 
   * @param {*} id_contenedor: id del contenedor donde se mostrara la informacion
   */
  informacion_editar_inventario(tamaño_pantalla, almacen, id_contenedor){
    let cont = document.getElementById(id_contenedor);
    almacen.forEach((almacen_editar) => {
      if(tamaño_pantalla == true){
        const html = `
        <div class="d-flex flex-column dropdown"> <!-- Texto del dropdown e informacion dentro -->
                    <button disabled
                        class="d-flex justify-content-between align-items-center boton_informacion_dropdown"
                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <div class="color_lateral" id="lateral_oscuro"></div>
                        ${almacen_editar.nombre_almacen}
                    </button>
                    <ul class="dropdown-menu informacion_dropdown_contenido">
                        <!-- Lista de infomacion desplegable en el dropdown -->
                        <li class="d-flex align-items-center texto_dropdown">
                            <p type="text" name="" class="elementos_listas">Direccion</p>
                        </li>
                        <li class="d-flex align-items-center texto_dropdown">
                            <p type="text" name="" class="elementos_listas">Descripcion</p>
                        </li>
                        <li class="d-flex accion_dropdown align-items-center justify-content-center"><a href="#"
                                onclick="mostrar_editar_inv()">Editar Inventario</a></li>
                        <li class="d-flex accion_dropdown align-items-center justify-content-center"><a href="#"
                                onclick="mostrar_stock_vacia()">Ver Inventario</a></li>
                    </ul>
                    <form class="contenedor_campos_edicion" id="form_editar_inventario"> <!-- Contenedor de campos para editar inventario -->
                        <input type="text" class="input_claro" value="${almacen_editar.nombre_almacen}" name="nombre_almacen">
                        <input type="text" class="input_claro" value="${almacen_editar.direccion_almacen}" name="direccion_almacen">
                        <textarea type="text" class="textarea_claro" name="descripcion_almacen">${almacen_editar.descripcion_almacen}</textarea>
                    </form>
                </div>
        `
        cont.innerHTML += html;
      }else{
        const html = `
        <div class="container inventario flex-wrap col-lg-3">
          <form action="" id="form_editar_inventario">
              <input type="text" class="form-control mb-3" aria-label="Text input with dropdown button"
                  value="${almacen_editar.nombre_almacen}" name="nombre_almacen"></input>
              <input type="text" class="form-control mb-3 " aria-label="Text input with dropdown button"
                  value="${almacen_editar.direccion_almacen}" name="direccion_almacen"></input>
              <textarea class="form-control mb-3 min-height-100" rows="6" name="descripcion_almacen">${almacen_editar.descripcion_almacen}</textarea>
          </form>
          <div class="d-grid gap-2">
              <button class="btn btn-general" type="button" onclick="guardar_editar_inventario()">
                  Guardar
              </button>
          </div>
        </div>
        `
        cont.innerHTML += html;
      }
    });
  }
  
  /**
   * Metodo para mostrar la informacion de los productos en una tabla o tarjetas
   * @param {*} tamaño_pantalla: tamaño de la pantalla para mostrar una tabla o tarjetas 
   * @param {*} lista_productos: lista de productos a mostrar
   * @param {*} id_contenedor: id del contenedor donde se mostrara la informacion 
   */
  informacion_tabla_producto(tamaño_pantalla, lista_productos, id_contenedor){
    let cont = document.getElementById(id_contenedor);
    lista_productos.forEach((producto) => {
      if(tamaño_pantalla == true){
        const html = `
        <div class="d-flex dropdown"> <!-- Texto del dropdown e informacion dentro -->
            <button class="d-flex justify-content-between align-items-center boton_informacion_dropdown"
                type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div class="color_lateral" id="lateral_oscuro"></div> <!-- Color lateral del boton -->
                ${producto.nombre_producto}
            </button>
            <ul class="dropdown-menu informacion_dropdown_contenido">
                <!-- Lista de infomacion desplegable en el boton -->
                <li class="d-flex align-items-center texto_dropdown">
                    <p type="text" name="" class="elementos_listas">Referencia: ${producto.referencia_producto}</p>
                </li>
                <li class="d-flex align-items-center texto_dropdown">
                    <p type="text" name="" class="elementos_listas">Categoria: ${producto.nombre_categoria}</p>
                </li>
                <li class="d-flex align-items-center texto_dropdown">
                    <p type="text" name="" class="elementos_listas">Cantidad: ${producto.cantidad_disponible}</p>
                </li>
                <li class="d-flex accion_dropdown align-items-center justify-content-center"><a href="#"
                        onclick="mostrar_detalles_producto()">Detalles del Producto</a>
                </li>
            </ul>
        </div>
        `
        cont.innerHTML += html;
      }else{
        const html = `
        <tr>
          <td>
              <div class="td-body-tabla">
                  <p class="td-body-tabla_opciones">${producto.nombre_producto}</p>
              </div>
          </td>
          <th scope="row" class="td-body-tabla">
              <p class="td-body-tabla_opciones">${producto.referencia_producto}</p>
          </th>
          <td class="td-body-tabla">
              <p class="td-body-tabla_opciones">${producto.nombre_categoria}</p>
          </td>
          <td class="td-body-tabla">
              <p class="td-body-tabla_opciones">${producto.cantidad_disponible}</p>
          </td>
          <td class="">
              <div class="btn-group" role="group">
                  <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <img src="./Assets/img/menu_horizontal.svg" alt="" />
                  </button>
                  <ul class="dropdown-menu">
                      <li class="d-grid gap-2">
                          <button class="btn d-flex align-items-center" onclick="detalles_producto(this)" data-detalles ="${producto.id_producto}">
                              <img src="./Assets/img/logo_ingresar_detalles.svg" alt="" />
                              <p>Detalles</p>
                          </button>
                      </li>
                      <li class="d-grid gap-2">
                          <button class="btn  d-flex align-items-center" onclick = "borrar_producto(this)" data-eliminar
                          ="${producto.id_producto}">
                              <img src="./Assets/img/eliminar.svg" alt="" />
                              <p>Eliminar</p>
                          </button>
                      </li>
                  </ul>
              </div>
          </td>
        </tr>
        `
        cont.innerHTML += html;
      }
    });
  }

  /**
   * Metodo para mostrar la informacion de un producto ya existente cuando se asigna un producto a un almacen
   * @param {*} producto: informacion del producto a asignar
   * @param {*} lista_inputs: lista de inputs donde se mostrara la informacion del producto  
   */
  informacion_inputs_productos(producto, lista_inputs){
    lista_inputs.forEach((input) => {
      const input_id = document.getElementById(input) 
      if (input_id){
        for (let llave_producto in producto){
          if ( input == llave_producto  ){ 
            input_id.value = producto[llave_producto]
            input_id.disabled = true;
          }
        }
      }
    })
  }
  
  /**
   * Metodo para limpiar la informacion de un input
   * @param {*} inputs: id del input a limpiar
   */
  limpiar_inputs(inputs){
    let cont = document.getElementById(inputs)
    cont.value = "";
    cont.disabled = false
  }

    /**
   * Metodo para mostrar los detalles de un producto
   * @param {*} tamaño: tamaño de la pantalla para mostrar una diseño u otro
   * @param {*} producto: informacion del producto a mostrar 
   * @param {*} id_contenedor: id del contenedor donde se mostrara la informacion 
   */
    informacion_detalles_producto(tamaño, producto, id_contenedor){
      let cont = document.getElementById(id_contenedor);
      producto.forEach((producto) => {
        if(tamaño == true){
          const html = `
              <div class="conedor_nombre_producto_titulo"> <!-- Contenedor Nombre del producto como Titulo -->
                  <h1 id="nombre_producto_titulo">${producto.nombre_producto}</h1>
              </div>
              <div class="container d-flex" id="contenedor_detalles_producto"> <!-- Contenedor para la lista de detalles del producto -->
                  <ul> <!-- Lista de detalles del producto -->
                      <li>Referencia: ${producto.referencia_producto}</li>
                      <li>Cantidad: ${producto.cantidad_producto_almacen}</li>
                      <li>Stock Minimo: ${producto.stock_minimo}</li>
                      <li>Costo: ${producto.promedio_costo}</li>
                      <li>Precio de Venta ${producto.precio_venta}</li>
                  </ul>
              </div>
              <div class="container d-flex flex-column align-items-center justify-content-between contenedor_botones_largos">
                  <!-- Contenedor de botones -->
                  <button class="btn boton_largo_oscuro" type="button" onclick="mostrar_mov_del_producto()">
                      <!-- Boton para ver movimientos -->
                      Ver Movimientos
                  </button>
                  <button class="btn boton_largo_claro" type="button" onclick="mostrar_editar_producto()">
                      <!-- Boton para editar el producto -->
                      Editar Producto
                  </button>
              </div>
              <div class="container d-flex align-items-center justify-content-center">
                  <!-- Contenedor de la imagen del producto -->
                  <img src="./Assets/img/image-1.png" alt="" id="imagen_producto">
              </div>
          `
        }else{
          const html = `
              <div class="d-flex flex-column">
                  <h1>${producto.nombre_producto}</h1>
                  <div>
                      <table class="table">
                          <thead>
                              <tr>
                                  <th scope="col"></th>
                                  <th scope="col"></th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>Categoria</td>
                                  <td>${producto.nombre_categoria}</td>
                              </tr>
                              <tr>
                                  <td>Referencia</td>
                                  <td>${producto.referencia_producto}</td>
                              </tr>
                              <tr>
                                  <td>Cantidad</td>
                                  <td>${producto.Cantidad}</td>
                              </tr>
                              <tr>
                                  <td>Stock Mínimo</td>
                                  <td>${producto.stock_minimo}</td>
                              </tr>
                              <tr>
                                  <td>Costo</td>
                                  <td>${producto.Costo}</td>
                              </tr>
                              <tr>
                                  <td>Precio de Venta</td>
                                  <td>${producto.Precio}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                  <div>
                      <button class="btn btn-general--contenido" onclick="mostrar_mov_del_producto()">Ver Movimientos</button>
                      <button class="btn btn-general--secundario" onclick="mostrar_editar_producto(this)" data-editar = ${producto.id_producto}>Editar Descripción</button>
                  </div>
              </div>
              <div class="">
                  <figure class="contenedor-imagen">
                      <img class="img-fluid" src="./Assets/img/imagen_ejemplo.png" alt="" id="imagen_ej_ddp">
                  </figure>
              </div>
              `
              cont.innerHTML += html;
        }
      });
    }

    informacion_editar_producto(tamaño, producto, id_contenedor){
        let cont = document.getElementById(id_contenedor);
        producto.forEach((producto) => {
            if(tamaño == true){
                const html = `
                    <!-- Contendor de form para editar un producto -->
                    <input type="text" class="form-control" value="${producto.nombre_producto}" name="nombre_producto">
                    <input type="text" class="form-control" value="${producto.referencia_producto}" name="referencia_producto">
                    <select type="text" class="select_oscuro" name="id_categoria" id="select_id_categoria"> <!-- Select para seleccionar categoria del producto -->
                        <!-- Opciones del select -->
                        <option selected class="opciones">Categoria Producto</option>
                        <option class="opciones">Categoria 1</option>
                    </select>
                    <input type="text" class="form-control" value="${producto.stock_minimo}"  name="stock_minimo">
                    <input type="text" class="form-control" value="${producto.Precio}" name="precio_venta">
                `;
                cont.innerHTML += html;
        }else{
            const html = `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre Producto</td>
                            <td>
                                <input type="text" class="form-control" aria-label="Text input with dropdown button" 
                                value="${producto.nombre_producto}"  name="nombre_producto"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Referencia Producto</td>
                            <td>
                                <input type="text" class="form-control" aria-label="Text input with dropdown button"
                                value="${producto.referencia_producto}"  name="referencia_producto"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Categoria producto</td>
                            <td>
                                <select type="text" class="select_claro_mov form-select" name="id_categoria" id="select_id_categoria">
                                    <!-- Opciones del select -->
                                    <option selected class="opciones">Categoria</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Stock minimo</td>
                            <td>
                                <input type="text" class="form-control" aria-label="Text input with dropdown button"
                                value="${producto.stock_minimo}" placeholder="" name="stock_minimo"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Precio</td>
                            <td>
                                <input type="text" class="form-control" aria-label="Text input with dropdown button"
                                value="${producto.Precio}" name="precio_venta"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `
            cont.innerHTML += html;
            } 
        });
    } 
}