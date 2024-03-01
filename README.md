# BOOTSTRAP

- Breakpoint: Son puntos de quiebre donde la clase va cambiar segun la clase que le coloquemos. Tenemos que mirar en que breakpoints nuestras pantallas pueden cambiar y asi poderlos colocar.

```
<!-- Bootstrap -->

<div class="container text-center">
    <div class="row">
        <div class="col-sm-4 col-lg-6">
        </div>
        <div class="col-sm-8 col-lg-6">
        </div>
    </div>
</div>
```
> Podemos ver en el ejemplo que cuando esten en un tama;o lg van a ocupar 6 columnas pero cuando pasen a tener un tama;o de sm van a ocupar 4 y 6 columnas cada una para completar las 12.

# PROTOTIPO INDEX

- La barra de navegacion tiene que ser de clase .container-fluid de Bootstrap para que se adapte a todo el ancho de la pantalla todo el tiempo.
- El main debera de tener la clase .container de Bootstrap debido a que tiene un ancho maximo y no va llenar toda la pantalla.
- El evento de click para los formularios y los botones toca modificarlos en el js. Mientras los dejamos como estan

> Importante : revivisar todos los estilos y mirar cuales puedo modificar para optimizar y quede mas entendible. 
