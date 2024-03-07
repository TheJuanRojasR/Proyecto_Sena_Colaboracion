class Vista {
  constructor() {}

  /**
   * Metodo para desplegar una plantilla en un contenedor
   * @param {*} plantilla: id de la plantilla a desplegar 
   * @param {*} contenedor: id del contenedor donde se desplegara la plantilla
   * @returns none
   */

  mostrar_plantilla(plantilla, contenedor) {
    let cont = document.getElementById(contenedor);
    cont.innerHTML = "";
    //clonar el contenido del template
    let template = document.getElementById(plantilla);
    if(template){
        let clone = template.content.cloneNode(true);
        cont.appendChild(clone);
    }
  }
}
