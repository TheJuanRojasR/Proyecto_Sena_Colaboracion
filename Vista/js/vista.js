class Vista {
  constructor() {
    this.stack_pantallas = []; //Contiene el historial de navegacion de pantallas

  }

  /**
   * Metodo para desplegar una plantilla en un contenedor
   * @param {*} plantilla: id de la plantilla a desplegar 
   * @param {*} contenedor: id del contenedor donde se desplegara la plantilla
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

  regresar_pantalla() {
    let plantilla = this.stack_pantallas.pop(); //Toma el nombre de la pantalla anterior
    if (this.stack_pantallas.length > 0) {
      let cont = document.getElementById("contenedor_principal");
      cont.innerHTML = "";
      plantilla=this.stack_pantallas.pop();
      let template = document.getElementById(plantilla);
      let clone = template.content.cloneNode(true);
      cont.appendChild(clone);
    }
  }

}
