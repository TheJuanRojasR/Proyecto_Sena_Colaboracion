particlesJS(
    {
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }
)

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
    data.id_jefe = null
  
    datos.forEach((element) => {
      data[element.name] = element.value;
      if (element instanceof HTMLInputElement){
        let value = element.value;
        if(value === "" || (element.tagName === "SELECT" && value === "0")) {
          data.ok = false;
          data.msj = "Por favor llene " + element.name;
          console.log(data.msj)
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
  * @param {*} tipo_opcion: tipo de opcion a añadir al select
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
          <div class="container inventario flex-wrap col-lg-3 d-flex justify-content-between flex-column">
           <div>
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
                </div>
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
   * Metodo para mostrar informacion dentro de un input especifico
   * @param {*} producto: informacion del producto a asignar
   * @param {*} lista_inputs: lista de inputs donde se mostrara la informacion del producto  
   */
  informacion_inputs(producto, lista_inputs){
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

  /**
   * Funcion para mostrar la informacion de un producto en form editar producto
   * @param {*} tamaño: tamaño de la pantalla para mostrar una diseño u otro
   * @param {*} producto: informacion del producto a mostrar
   * @param {*} id_contenedor: id del contenedor donde se mostrara la informacion
   */
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

  /**
   * Funcion para mostrar la informacion de una categoria en una tabla o tarjetas
   * @param {*} tamaño_pantalla: tamaño de la pantalla para mostrar una tabla o tarjetas
   * @param {*} lista_categorias: lista de categorias a mostrar
   * @param {*} id_contenedor: id del contenedor donde se mostrara la informacion
   */
  informacion_tabla_categoria(tamaño_pantalla, lista_categorias, id_contenedor){
    let cont = document.getElementById(id_contenedor);
    lista_categorias.forEach((categoria) => {
        if(tamaño_pantalla == true){
            const html = `
            <div class="d-flex dropdown"> <!-- Texto del dropdown e informacion dentro -->
                <button class="d-flex justify-content-between align-items-center boton_informacion_dropdown"
                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="color_lateral" id="lateral_oscuro"></div> <!-- Color lateral del boton -->
                    ${categoria.nombre_categoria}
                </button>
                <ul class="dropdown-menu informacion_dropdown_contenido">
                    <!-- Lista de infomacion desplegable en el dropdown -->
                    <li class="d-flex accion_dropdown align-items-center justify-content-center">
                        <a href="#" onclick="mostrar_editar_categoria(this)" data-editar="${categoria.id_categoria}">Editar Categoria</a>
                    </li>
                </ul>
            </div>
            `
            cont.innerHTML += html;
        }else{
            const html = `
            <tr>
                <th scope="row" class="d-flex">
                    <div class="td-body-tabla">
                        <p class="td-body-tabla_opciones">${categoria.nombre_categoria}</p>
                    </div>
                </th>
                <td class="text-end">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <img src="./Assets/img/menu_horizontal.svg" alt="" />
                        </button>
                        <ul class="dropdown-menu">
                            <li class="d-grid gap-2">
                                <button class="btn d-flex align-items-center" onclick="mostrar_editar_categoria(this)" data-editar="${categoria.id_categoria}">
                                    <img src="./Assets/img/lapiz_editar.svg" alt="" />
                                    <p>Editar</p>
                                </button>
                            </li>
                            <li class="d-grid gap-2">
                                <button class="btn d-flex align-items-center" data-eliminar="${categoria.id_categoria}" onclick="elimiar_catg_vista(this)">
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
    })
  }

  /**
   * Metodo para mostrar el nombre actual de la categoria en un input cuando se va a editar
   *
   * @param {*} tamaño: tamaño de la pantalla para mostrar una diseño u otro
   * @param {*} lista_categorias: informacion de la categoria a editar en un objeto
   * @param {*} id_contenedor: id del contenedor donde se mostrara la informacion
   * @memberof Vista
   */
  informacion_editar_categoria(tamaño, lista_categorias, id_contenedor){
    let cont = document.getElementById(id_contenedor);
    lista_categorias.forEach((categoria) => {
        if(tamaño == true){
            const html = `
            <div class="d-flex flex-column dropdown"> <!-- Texto del dropdown e informacion dentro -->
                <button disabled
                    class="d-flex justify-content-between align-items-center boton_informacion_dropdown"
                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="color_lateral" id="lateral_oscuro"></div>
                    ${categoria.nombre_categoria}
                </button>
                <ul class="dropdown-menu informacion_dropdown_contenido">
                    <!-- Lista de infomacion desplegable en el dropdown -->
                    <li class="d-flex accion_dropdown align-items-center justify-content-center">
                        <a href="#" onclick="mostrar_editar_categoria()">Editar Categoria</a>
                    </li>
                </ul>
                <form class="d-flex flex-column contenedor_campos_edicion" id="form_editar_categoria">
                    <!-- Contenedor de campos para editar categoria -->
                    <input type="text" name="" class="input_claro" placeholder="Nuevo Nombre de Categoria" name="nombre_categoria">
                </form>
            </div>
            `;
            cont.innerHTML += html;
        }else{
            const html = `
            <tr>
                <th scope="row" class="d-flex align-items-center">
                    <input type="text" id="th_input_nombreCategoria" class="form-control"
                        aria-label="Text input with dropdown button"
                        value=${categoria.nombre_categoria} name="nombre_categoria"/>
                </th>
                <td class="text-end">
                    <button type="button" class="btn btn-tabla-icono btnGuardar-tabla" onclick="guardar_editar_categoria()">
                        <img src="./Assets/img/guardar.svg" alt="" />
                    </button>
                </td>
            </tr>
            `;
            cont.innerHTML += html;   
        }
    });
  }

  /**
   * Metodo para mostrar la informacion de los productos que estan por debajo o igual al stock minimo
   *
   * @param {*} tamaño: tamaño de la pantalla para mostrar una diseño u otro
   * @param {*} lista_productos: lista de productos a mostrar
   * @param {*} id_contenedor: id del contenedor donde se mostrara la informacion
   * @memberof Vista
   */
  informacion_tabla_abastecimiento(tamaño, lista_productos, id_contenedor){
    let cont = document.getElementById(id_contenedor);
    lista_productos.forEach((producto) => {
        if(tamaño == true){
            if(producto.cantidad_producto_almacen == producto.stock_minimo){
                const html = `
                <div class="d-flex flex-column dropdown"> <!-- Contenedor para el dropdown -->
                    <button class="d-flex justify-content-between align-items-center boton_informacion_dropdown"
                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <div class="color_lateral" id="lateral_amarillo"></div> <!-- Color lateral del boton -->
                        ${producto.nombre_producto}
                    </button>
                    <ul class="dropdown-menu informacion_dropdown_contenido">
                        <!-- Lista de infomacion desplegable en el dropdown -->
                        <li class="d-flex align-items-center texto_dropdown">
                            <p type="text" name="" class="elementos_listas">Referencia: ${producto.referencia_producto}</p>
                        </li>
                        <li class="d-flex align-items-center texto_dropdown">
                            <p type="text" name="" class="elementos_listas">Cantidad disponible: ${producto.cantidad_producto_almacen}</p>
                        </li>
                        <li class="d-flex align-items-center texto_dropdown">
                            <p type="text" name="" class="elementos_listas">Stock Minimo: ${producto.stock_minimo}</p>
                        </li>
                    </ul>
                </div>
                `
                cont.innerHTML += html;
            }else{
                const html = `
                <div class="d-flex flex-column dropdown"> <!-- Contenedor para el dropdown -->
                    <button class="d-flex justify-content-between align-items-center boton_informacion_dropdown"
                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <div class="color_lateral" id="lateral_rojo"></div> <!-- Color lateral del boton -->
                        ${producto.nombre_producto}
                    </button>
                    <ul class="dropdown-menu informacion_dropdown_contenido">
                        <!-- Lista de infomacion desplegable en el dropdown -->
                        <li class="d-flex align-items-center texto_dropdown">
                            <p type="text" name="" class="elementos_listas">Referencia: ${producto.referencia_producto}</p>
                        </li>
                        <li class="d-flex align-items-center texto_dropdown">
                            <p type="text" name="" class="elementos_listas">Cantidad disponible: ${producto.cantidad_producto_almacen}</p>
                        </li>
                        <li class="d-flex align-items-center texto_dropdown">
                            <p type="text" name="" class="elementos_listas">Stock minimo: ${producto.stock_minimo}</p>
                        </li>
                    </ul>
                </div>
                `
                cont.innerHTML += html;
            }
        }else{
            if(producto.cantidad_producto_almacen == producto.stock_minimo){
                const html = `
                <tr>
                    <td class="p-0" id="abastecimiento_columna_aviso_advertencia"></td>
                    <th scope="row" class="td-body-tabla">
                        <p class="td-body-tabla_opciones">${producto.nombre_producto}</p>
                    </th>
                    <td class="td-body-tabla">
                        <p class="td-body-tabla_opciones">${producto.referencia_producto}</p>
                    </td>
                    <td class="td-body-tabla">
                        <p class="td-body-tabla_opciones">${producto.nombre_categoria}</p>
                    </td>
                    <td class="td-body-tabla">
                        <p class="td-body-tabla_opciones texto_advertencia">${producto.cantidad_producto_almacen}</p>
                    </td>
                    <td class="td-body-tabla">
                        <p class="td-body-tabla_opciones texto_advertencia">${producto.stock_minimo}</p>
                    </td>
                </tr>
                `
                cont.innerHTML += html;
            }else{
                const html = `
                <tr>
                    <td class="p-0" id="abastecimiento_columna_aviso_error"></td>
                    <th scope="row" class="td-body-tabla">
                        <p class="td-body-tabla_opciones">${producto.nombre_producto}</p>
                    </th>
                    <td class="td-body-tabla">
                        <p class="td-body-tabla_opciones">${producto.referencia_producto}</p>
                    </td>
                    <td class="td-body-tabla">
                        <p class="td-body-tabla_opciones">${producto.nombre_categoria}</p>
                    </td>
                    <td class="td-body-tabla">
                        <p class="td-body-tabla_opciones texto_error">${producto.cantidad_producto_almacen}</p>
                    </td>
                    <td class="td-body-tabla">
                        <p class="td-body-tabla_opciones texto_error">${producto.stock_minimo}</p>
                    </td>
                </tr>
                `
                cont.innerHTML += html;
            }
        }
    })
  }

  /**
   * Metodo para mostrar los movimientos del dia para un almacen en especifico
   *
   * @param {*} tamaño: tamaño de la pantalla para mostrar una diseño u otro
   * @param {*} lista_movimientos: lista de movimientos a mostrar
   * @param {*} id_contenedor: id del contenedor donde se mostrara la informacion
   * @memberof Vista
   */
  informacion_tabla_movimientos(tamaño, lista_movimientos, id_contenedor){
    let cont = document.getElementById(id_contenedor);
    lista_movimientos.forEach((movimiento) => {
        if(tamaño == true){
            const html = `
            <div class="d-flex dropdown"> <!-- Texto del dropdown e informacion dentro -->
                <button class="d-flex justify-content-between align-items-center boton_informacion_dropdown"
                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="color_lateral" id="lateral_oscuro"></div> <!-- Color lateral del boton -->
                    ${movimiento.referencia}
                </button>
                <ul class="dropdown-menu informacion_dropdown_contenido">
                    <!-- Lista de infomacion desplegable en el boton -->
                    <li class="d-flex align-items-center texto_dropdown">
                        <p type="text" name="" class="elementos_listas">Fecha: ${movimiento.fecha}</p>
                    </li>
                    <li class="d-flex align-items-center texto_dropdown">
                        <p type="text" name="" class="elementos_listas">${movimiento.nombre_producto}</p>
                    </li>
                    <li class="d-flex align-items-center texto_dropdown">
                    <p type="text" name="" class="elementos_listas">Cantidad: ${movimiento.cantidad}</p>
                    </li>
                    <li class="d-flex align-items-center texto_dropdown">
                        <p type="text" name="" class="elementos_listas">Origen/Destino: ${movimiento.origen_destino}</p>
                    </li>
                </ul>
            </div>
            ` 
            cont.innerHTML += html;
        }else{
            const html = `
            <tr>
                <th scope="row" class="td-body-tabla">
                    <p class="td-body-tabla_opciones">${movimiento.referencia}</p>
                </th>
                <td class="td-body-tabla">
                    <p class="td-body-tabla_opciones">${movimiento.fecha}</p>
                </td>
                <td class="td-body-tabla">
                    <p class="td-body-tabla_opciones">${movimiento.nombre_producto}</p>
                </td>
                <td class="td-body-tabla">
                    <p class="td-body-tabla_opciones">${movimiento.cantidad}</p>
                </td>
                <td class="td-body-tabla">
                    <p class="td-body-tabla_opciones">${movimiento.origen_destino}</p>
                </td>
                <td></td>
            </tr>
            `
            cont.innerHTML += html;
        }
    });
  }

  /**
   * Metodo para insertar la informacion del producto en la tabla de creacion de una entradas
   * @param {*} tamaño: tamaño de la pantalla para mostrar una diseño u otro
   * @param {*} producto: informacion del producto a insertar
   * @param {*} id_contenedor: contenedor donde se inserta la informacion
   */
  informacion_tabla_entradas(tamaño, producto, id_contenedor){
    let cont = document.getElementById(id_contenedor);
    if(tamaño == true){
		const html = `
		<div class="d-flex dropdown"> <!-- Contenedor para el dropdown -->
			<button class="d-flex justify-content-between align-items-center boton_informacion_dropdown"
				type="button" data-bs-toggle="dropdown" aria-expanded="false">
				<div class="color_lateral" id="lateral_oscuro"></div>
				${producto.nombre_producto}
			</button>
			<ul class="dropdown-menu informacion_dropdown_contenido">
				<!-- Lista de infomacion desplegable en el dropdown -->
				<li class="d-flex align-items-center texto_dropdown">
					<p type="text" name="" class="elementos_listas">Origen: ${producto.origen_entrada}</p>
				</li>
				<li class="d-flex align-items-center texto_dropdown">
					<p type="text" name="" class="elementos_listas">Nombre Almacen: ${producto.nombre_almacen}</p>
				</li>
				<li class="d-flex align-items-center texto_dropdown">
					<p type="text" name="" class="elementos_listas">Referencia: ${producto.referencia_producto}</p>
				</li>
				<li class="d-flex align-items-center texto_dropdown">
					<p type="text" name="" class="elementos_listas">Cantidad: ${producto.cantidad_entrada}</p>
				</li>
				<li class="d-flex align-items-center texto_dropdown">
					<p type="text" name="" class="elementos_listas">Precio: ${producto.precio_compra}</p>
				</li>
			</ul>
		</div>
		`
		cont.innerHTML += html
    }else{
        const html = `
        <tr>
            <th scope="row"></th>
            <td class="td-body-tabla">
                <p>${producto.origen_entrada}</p>
            </td>
            <td class="td-body-tabla">
                <p>${producto.nombre_almacen}</p>
            </td>
            <td class="td-body-tabla">
                <p>${producto.nombre_producto}</p>
            </td>
            <td class="td-body-tabla">
                <p>${producto.referencia_producto}</p>
            </td>
            <td class="td-body-tabla">
                <p>${producto.cantidad_entrada}</p>
            </td>
            <td class="td-body-tabla">
                <p>${producto.precio_compra}</p>
            </td>
            <td></td>
        </tr>
        `
        cont.innerHTML += html
    }
  }

  /**
   * Metodo para insertar la informacion de los productos en la tabla de creacion de salidas
   * @param {*} tamaño: tamaño de la pantalla para mostrar una diseño u otro
   * @param {*} producto: informacion del producto a insertar
   * @param {*} id_contenedor: contenedor donde se inserta la informacion
   */
  informacion_tabla_salidas(tamaño, producto, id_contenedor){
    let cont = document.getElementById(id_contenedor);
    if(tamaño == "true"){
        console.log('falta arreglar la vista')
    }else{
        const html = `
        <tr>
            <th scope="row"></th>
            <td class="td-body-tabla">
                <p>${producto.nombre_almacen}</p>
            </td>
            <td class="td-body-tabla">
                <p>${producto.destino_salida}</p>
            </td>
            <td class="td-body-tabla">
                <p>${producto.nombre_producto}</p>
            </td>
            <td class="td-body-tabla">
                <p>${producto.referencia_producto}</p>
            </td>
            <td class="td-body-tabla">
                <p>${producto.cantidad_salida}</p>
            </td>
            <td></td>
        </tr>
        `
        cont.innerHTML += html
    }
  }

  /**
   * Metodo para insertar la informacion de los movimientos de un producto en la vista
   * @param {*} tamaño: tamaño de la pantalla para mostrar una diseño u otro
   * @param {*} lista_movimientos: lista de movimientos a insertar 
   * @param {*} id_contenedor: contenedor donde se inserta la informacion
   */
  informacion_tabla_movimientos_producto(tamaño, lista_movimientos, id_contenedor){
    let cont = document.getElementById(id_contenedor);
    lista_movimientos.forEach(movimiento => {

        if(tamaño == "true"){
            const html = `
            <div class="d-flex dropdown"> <!-- Texto del dropdown e informacion dentro -->
                <button class="d-flex justify-content-between align-items-center boton_informacion_dropdown"
                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="color_lateral" id="lateral_oscuro"></div>
                    ${movimiento.Referencia}
                </button>
                <ul class="dropdown-menu informacion_dropdown_contenido">
                    <!-- Lista de infomacion desplegable en el dropdown -->
                    <li class="d-flex align-items-center texto_dropdown">
                        <p type="text" name="" class="elementos_listas">Fecha: ${movimiento.Fecha}</p>
                    </li>
                    <li class="d-flex align-items-center texto_dropdown">
                        <p type="text" name="" class="elementos_listas">Origen/Destino: ${movimiento.Origen_Destino}</p>
                    </li>
                    <li class="d-flex align-items-center texto_dropdown">
                        <p type="text" name="" class="elementos_listas">Cantidad: ${movimiento.Cantidad}</p>
                    </li>
                </ul>
            </div>
            `;
            cont.innerHTML += html;
        }else{
            const html = `
            <tr>
                <th scope="row" class="td-body-tabla">
                    <p class="td-body-tabla_opciones">${movimiento.Referencia}</p>
                </th>
                <td class="td-body-tabla">
                    <p class="td-body-tabla_opciones">${movimiento.Fecha}</p>
                </td>
                <td class="td-body-tabla">
                    <p class="td-body-tabla_opciones">${movimiento.Origen_Destino}</p>
                </td>
                <td class="td-body-tabla">
                    <p class="td-body-tabla_opciones">${movimiento.Cantidad}</p>
                </td>
            </tr>
            `;
            cont.innerHTML += html;
        }
    });
  }

  /**
   * Metodo para mostrar la informacion de los perfiles actuales en la vista
   * @param {*} tamaño: tamaño de la pantalla para mostrar una diseño u otro
   * @param {*} lista_perfiles: lista de perfiles a mostrar
   * @param {*} id_contenedor: contenedor donde se inserta la informacion
   */
  informacion_tabla_perfiles(tamaño, lista_perfiles, id_contenedor){
    let cont = document.getElementById(id_contenedor);
    lista_perfiles.forEach((perfil) => {
        if(tamaño == true){
            const html = `
            <div class="d-flex dropdown"> <!-- Texto del dropdown e informacion dentro -->
                <button class="d-flex justify-content-between align-items-center boton_informacion_dropdown"
                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="color_lateral" id="lateral_oscuro"></div> <!-- Color lateral del boton -->
                    ${perfil.nombre_usuario}
                </button>
                <ul class="dropdown-menu informacion_dropdown_contenido">
                    <!-- Lista de infomacion desplegable en el dropdown -->
                    <li class="d-flex align-items-center texto_dropdown">
                        <p type="text" name="" class="elementos_listas">Correo: ${perfil.correo_electronico}</p>
                    </li>
                    <li class="d-flex align-items-center texto_dropdown">
                        <p type="text" name="" class="elementos_listas">Rol: ${perfil.nombre_rol}</p>
                    </li>
                    <li class="d-flex accion_dropdown align-items-center justify-content-center">
                    <a href="#" onclick="editar_perfiles(this)" data-editar=${perfil.id_usuario}>Editar  Perfil</a>
                    </li>
                </ul>
            </div>
            `;
            cont.innerHTML += html;
        }else{
            const html = `
            <tr>
                <td class="td-body-tabla">
                    <p class="td-body-tabla_opciones">${perfil.nombre_usuario}</p>
                </td>
                <td class="td-body-tabla">
                    <p class="td-body-tabla_opciones">${perfil.correo_electronico}</p>
                </td>
                <td class="td-body-tabla">
                    <p class="td-body-tabla_opciones">${perfil.nombre_rol}</p>
                </td>
                <td class="text-end">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <img src="./Assets/img/menu_horizontal.svg" alt="" />
                        </button>
                        <ul class="dropdown-menu">
                            <li class="d-grid gap-2">
                                <button type="button" class="btn d-flex align-items-center" data-editar=${perfil.id_usuario} onclick="editar_perfiles(this)">
                                    <img src="./Assets/img/lapiz_editar.svg" alt="" />
                                    <p>Editar</p>
                                </button>
                            </li>
                            <li class="d-grid gap-2">
                                <button type="button" class="btn d-flex align-items-center" data-eliminar="${perfil.id_usuario}" onclick="eliminar_perfil_vista(this)">
                                    <img src="./Assets/img/eliminar.svg" alt="" />
                                    <p>Eliminar</p>
                                </button>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
            `;
            cont.innerHTML += html;
        }
    });
  }

  /**
   * Metodo para mostrar la informacion al editar el perfil
   * @param {*} tamaño: tamaño de la pantalla para mostrar un diseño u otro
   * @param {*} perfil: Informacion del perfil a editar
   * @param {*} id_contenedor: contenedor donde se inserta
   */
  informacion_editar_perfil(tamaño, perfil, id_contenedor){
    let cont = document.getElementById(id_contenedor);
    if(tamaño == true){
        const html = `
        <div class="d-flex flex-column dropdown"> <!-- Texto del dropdown e informacion dentro -->
            <button disabled class="d-flex justify-content-between align-items-center boton_informacion_dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div class="color_lateral" id="lateral_oscuro"></div>
                ${perfil[0].nombre_usuario}
            </button>
            <ul class="dropdown-menu informacion_dropdown_contenido">
                <!-- Lista de infomacion desplegable en el dropdown -->
                <li class="d-flex align-items-center texto_dropdown">
                    <p type="text" name="" class="elementos_listas">Nombre Usuario</p>
                </li>
                <li class="d-flex align-items-center texto_dropdown">
                    <p type="text" name="" class="elementos_listas">Rol</p>
                </li>
                <li class="d-flex accion_dropdown align-items-center justify-content-center">
                    <a href="#" onclick="mostrar_editar_perfiles()">Editar Perfil</a>
                </li>
            </ul>
            <form class="contenedor_campos_edicion" id="form_editar_perfiles"> <!-- Contenedor de campos para editar perfil -->
                <input type="text" name="" class="input_claro" placeholder="Nuevo Nombre de Usuario" name="nombre_usuario">
                <select type="text" class="select_edicion" name="id_rol"> <!-- Select para seleccionar el rol del usuario -->
                    <!-- Opciones del select -->
                    <option selected  value="${perfil[0].id_rol}" class="opciones">${perfil[0].nombre_rol}</option>
                </select>
            </form>
        </div>
        `
        cont.innerHTML += html;
    }else{
        const html = `
        <tr>
            <th scope="row" class="td-body-tabla">
                <input id="input_modificado" class="form-control form-select_modificado" type="text"
                    class="form-control" aria-label="Text input with dropdown button"
                    value="${perfil[0].nombre_usuario}" name="nombre_usuario">
            </th>
            <td scope="row" class="td-body-tabla">
                <select class="form-select form-select_modificado" aria-label="Default select example" name="id_rol">
                    <option value="${perfil[0].id_rol}" selected>${perfil[0].nombre_rol}</option>
                </select>
            </td> 
            <td class="text-end align-middle">
                <button type="button" class="btn btn-tabla-icono btnGuardar-tabla" onclick="guardar_editar_perfil()">
                    <img src="./Assets/img/guardar.svg" alt="" />
                </button>
            </td>
        </tr>
        `
        cont.innerHTML += html;
    }
  }

  informacion_modales(texto, id_contenedor){
    let cont = document.getElementById(id_contenedor)
    cont.textContent = texto
  }
}