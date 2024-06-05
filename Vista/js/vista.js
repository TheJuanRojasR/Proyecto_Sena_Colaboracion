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

  /**
   * Metodo para añadir un evento click a un elemento del HTML
   * @param {*} plantilla: id del la etiqueta a la que se le añadira el evento
   * @param {*} funcion: funcion a ejecutar al hacer click
   * @memberof Vista
   */
  añadir_evento_click(plantilla, funcion) {
    let elemento = document.getElementById(plantilla);
    //Falta eliminar posibles manejadores anteriores
    elemento.onclick = funcion;
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
    let datos = new FormData(form);
    let data = {};
    data.ok = true; //Bandera para verificar si los campos estan llenos
    data.msj = ""; //Mensaje de error
    data.id_rol = 1;
  
    datos.forEach((value, key) => {
      data[key] = value;
      if(value === "" || (form[key].tagName === "SELECT" && value === "0")) {
        data.ok = false;
        data.msj = "Por favor llene " + key;
      }
      else if (form[key].type == "email") {
        if (!this.validar_email(value)) {
          data.ok = false;
          data.msj = "No es un correo válido: " + value;     
          console.log(data.msj);     
        }
      }
      else if (form.id == "form_registro_usuario_desktop" && form[key].name == "contraseña"){
        if (!this.validar_contraseña(value)){
          data.ok = false;
          data.msj = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número";
          console.log(data.msj);
        }
      }
      else if (form.id == "form_registro_usuario_desktop" && form[key].name == "confirmar_contraseña"){
        let password = form.elements["contraseña"].value;
        if (value !== password) {
          data.ok = false;
          data.msj = "Las contraseñas no coinciden";
          console.log(data.msj);
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
  insertar_opciones_select(opciones, select_name, nombre_llave, nombre_valor){
    const select = document.getElementsByName(select_name);

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
  }

  
  /**
   * Metodo para mostrar la informacion de los almacenes en una tarjeta
   *
   * @param {*} lista_almacenes: lista de almacenes a mostrar
   * @param {*} id_contenedor: id del contenedor donde se insertarn las tarjetas
   * @memberof Vista
   */
  informacion_tarjeta_inventario (lista_almacenes, id_contenedor) {
    let cont = document.getElementById(id_contenedor);
    for (const almacen of lista_almacenes){
      if(almacen.estado_almacen == 1){
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
                            <li class="prueba d-grid gap-2">
                                <button class="btn  d-flex align-items-center" onclick="borrar_tarjeta(this)" data-eliminar="${almacen.id_almacen}">
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
                    <button class="btn btn-general" type="button" onclick="mostrar_stock_vacia()">
                        Ingresar
                    </button>
                </div>
            </div>
        `
        cont.innerHTML += html;
      }
    }
  }

  informacion_editar_inventario(almacen, id_contenedor){
    let cont = document.getElementById(id_contenedor);
    almacen.forEach((almacen_editar) => {
      const html = `
      <div class="container inventario flex-wrap col-lg-3">
        <form action="" id="form_editar_inventario_desktop">
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
    });
  }

}
