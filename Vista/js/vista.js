class Vista {
  constructor() {
    this.stack_pantallas = []; //Contiene el historial de navegacion de pantallas

  }

  /**
   * Metodo para desplegar una plantilla en un contenedor
   * @param {*} plantilla: id de la plantilla a desplegar 
   * @param {*} contenedor: id del contenedor donde se desplegara la plantilla
   * @param {*} pila: si es 1 se guarda el nombre de la plantilla en el historial de navegacion
   * @returns none
   */

  mostrar_plantilla(plantilla, contenedor, pila=null) {
    let cont = document.getElementById(contenedor);
    cont.innerHTML = "";
    //clonar el contenido del template
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
    let plantilla = this.stack_pantallas.pop(); //Toma el nombre de la pantalla anterior
    if (this.stack_pantallas.length > 0) {
      let cont = document.getElementById("contenedor_principal");
      cont.innerHTML = "";
      plantilla=this.stack_pantallas[this.stack_pantallas.length-1];
      let template = document.getElementById(plantilla);
      let clone = template.content.cloneNode(true);
      cont.appendChild(clone);
    }
  }

  quitar_padding_main(plantilla){
    let main = document.getElementById("contenedor_principal");
    if(plantilla != "inventarios_vacia"){
      main.style.padding= "57px 0px 72.31px 0px";
    }
    else{
      main.style.padding= "57px 0px 0px 0px";
    }
  }
}
