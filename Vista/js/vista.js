class Vista {
  constructor() {
    this.stack_pantallas = []; //Contiene el historial de navegacion de pantallas

  }

  /**
   * 
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

  mostrar_plantilla(plantilla, contenedor, pila=null) {
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
  }

  
  /**
   * Metodo para quitar o poner clases
   */

  // identificar_tamaño(){
  //   const tamañoPantalla = window.matchMedia('(max-width: 768px)');
  //   cla

  //   function cambiar_clases_main(tamañoPantalla,contenedor_etiqueta, ){

  //     if(tamañoPantalla.matches){
  //       document.getElementById("contenedor_principal").classList.remove("container-fluid","container_main");
  //       document.getElementById("contenedor_principal").classList.add("overflow-y-scroll");
  //     }
  //     else{
  //       document.getElementById("contenedor_principal").classList.remove("overflow-y-scroll");  
  //       document.getElementById("contenedor_principal").classList.add("container-fluid","container_main");
  //     }
  //   }
  //   cambiar_clases_main(tamañoPantalla);

  //   tamañoPantalla.addEventListener(cambiar_clases_main)
  // }

  identificar_tamaño2(contenedor_etiqueta,lista_clases){
    const tamañoPantalla = window.matchMedia('(max-width: 768px)');

    if(tamañoPantalla.matches){
      document.getElementById(contenedor_etiqueta).classList.remove(lista_clases);
      document.getElementById(contenedor_etiqueta).classList.add(lista_clases)
    }

    else{
      document.getElementById(contenedor_etiqueta).classList.remove(lista_clases);
      document.getElementById(contenedor_etiqueta).classList.remove(lista_clases);
    }
  }
}
