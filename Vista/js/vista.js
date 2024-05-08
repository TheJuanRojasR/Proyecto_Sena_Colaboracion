class Vista {
  constructor() {
    this.stack_pantallas = []; //Contiene el historial de navegacion de pantallas
  }

  /**
   * Metodo para limpiar un contenedor
   * @param {*} contenedor 
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
   * @param {*} plantilla 
   * @param {*} funcion 
   */

  añadir_evento_click(plantilla, funcion) {
    let elemento = document.getElementById(plantilla);
    elemento.onclick = funcion;
  }

  /**
   * Metodo para regresar a la pantalla anterior
   * @param {*} none
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
   * @param {*} contenedor_etiqueta 
   * @param {*} lista_clases 
   */

  cambiarClases(contenedor_etiqueta, lista_clases){
    let contenedor = document.getElementById(contenedor_etiqueta);
    contenedor.className = "";
    for(let nombre_clase of lista_clases){
      contenedor.classList.add(nombre_clase);
    }
  }
}

