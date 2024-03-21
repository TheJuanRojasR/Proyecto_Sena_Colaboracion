CREATE DATABASE VarietyVault;

USE VarietyVault;

CREATE TABLE Productos(
    id_producto INT AUTO_INCREMENT PRIMARY KEY, -- PK
    referencia_producto INT NOT NULL UNIQUE,
    nombre_producto VARCHAR(100),    
    stock_minimo INT NOT NULL,
    promedio_costo INT NOT NULL,
    precio_venta INT NOT NULL,
    imagen VARCHAR(250),
    codigo_categoria INT NOT NULL
);

CREATE TABLE Categorias(
    id_categoria INT AUTO_INCREMENT PRIMARY KEY, -- PK
    nombre_categoria VARCHAR(20) NOT NULL
);

CREATE TABLE Almacenes(
    id_almacen INT AUTO_INCREMENT PRIMARY KEY, -- PK
    nombre_almacen VARCHAR(20) NOT NULL,
    direccion_almacen VARCHAR(30) NOT NULL
);

CREATE TABLE Almacenes_Usuarios(
    id_almacen INT NOT NULL,
    id_usuario INT NOT NULL,
    PRIMARY KEY (id_almacen, id_usuario)
);

CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY, -- PK
    nombre_usuario VARCHAR(50) NOT NULL,
    id_rol INT NOT NULL,
    tipo_documento VARCHAR(5) NOT NULL,
    numero_documento INT NOT NULL UNIQUE,
    correo_electronico VARCHAR(50) NOT NULL,
    contraseña VARCHAR(10) NOT NULL
);

CREATE TABLE Roles(
    id_rol INT AUTO_INCREMENT PRIMARY KEY, -- PK
    nombre_rol VARCHAR(20) NOT NULL,
    id_permiso INT NOT NULL
);

CREATE TABLE Productos_entradas(
    id_producto INT NOT NULL,
    id_entrada INT NOT NULL,
    cantidad_entrada INT NOT NULL,
    precio_compra INT NOT NULL,
    PRIMARY KEY (id_producto, id_entrada) -- PK
);

CREATE TABLE Entradas(    
    id_entrada INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora DATE NOT NULL,
    origen_entrada VARCHAR(20) NOT NULL,
    destino_entrada VARCHAR(20) NOT NULL
);

CREATE TABLE Productos_Salidas(
    id_producto INT NOT NULL,
    id_salida INT NOT NULL,
    cantidad_salida INT NOT NULL,
    PRIMARY KEY (id_producto, id_salida) -- PK
);

CREATE TABLE Salidas(
    id_salida INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora DATE NOT NULL,
    origen_salida VARCHAR(20) NOT NULL,
    destino_salida VARCHAR(20) NOT NULL
);

CREATE TABLE Almacenes_Productos(
    id_almacen INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad_producto_almacen INT NOT NULL,
    PRIMARY KEY (id_almacen, id_producto) -- PK
);



--Vista Registro de usuario
    --Consulta para el registro de un nuevo usuario haciendo click al boton registrar
    INSERT INTO Usuarios (nombre_completo, tipo_documento, numero_nocumento, correo_electronico, contraseña, rol)
        VALUES ('Laura Valentina Ortiz Rodriguez', 'CC', 1001327828, 'laura_vortizr@soy.sena.edu.co', 'Contrasena1234','Administrador');

--Vista Igreso o Logeo de usuario
    --Consulta para el ingreso/logeo del usuario haciendo click al boton ingreso
    SELECT * FROM usuarios
        WHERE correo_electronico = 'correo_electronico_digitado' AND contraseña = 'contrasena_digitada';

--Vista Mis Inventarios vacio
    --Consulta para crear un nuevo inventario haciendo click en crear inventario
    INSERT INTO Almacenes (codigo_almacen, nombre_almacen, direccion_almacen)
    VALUES (1, Inventario1, 'Cra. 93 #80c – 72')

--Vista Operaciones
    --Consulta para mostrar movimientos del dia
    SELECT entradas.id_entrada AS 'Referencia', nombre_producto, fecha_hora, origen_entrada, destino_entrada FROM entradas
    JOIN Productos_entradas ON entradas.id_entrada = Productos_entradas.id_entrada
    JOIN Productos ON Productos_entradas.id_producto = Productos.id_producto
    WHERE fecha_hora > ? AND fecha_hora < ?
    UNION
    SELECT salidas.id_salida AS 'Referencia', nombre_producto, fecha_hora, origen_salida, destino_salida FROM salidas
    JOIN productos_salidas ON salidas.id_salida = productos_salidas.id_salida
    JOIN Productos ON productos.id_producto = productos_salidas.id_producto
    WHERE fecha_hora > ? AND fecha_hora < ?

    --Consulta para crear una entrada
    SELECT id_producto FROM productos
    WHERE id_producto = ?

    INSERT INTO productos(referencia_producto, nombre_producto, stock_minimo, promedio_costo, precio_venta, imagen, id_categoria) VALUES
    (?,?,?,?,?,?,?)

    SELECT cantidad_producto FROM almacenes_productos
    WHERE id_producto = ?
    
    INSERT INTO almacenes_productos(id_almacen, id_producto, cantidad_producto_almacen)VALUES
    (?,?,?)

    UPDATE almacenes_productos
    SET cantidad_producto_almacen = ?
    WHERE id_producto = ?

    INSERT INTO entradas (origen_entrada, destino_entrada) VALUES
    (?,?)

    INSERT INTO productos_entradas(id_entrada, id_producto, cantidad_entrada, precio_compra) VALUES
    (?,?,?,?)

    --Consulta para crear una salida
    
    INSERT INTO salidas(origen_salida, destino_salida) VALUES
    (?,?)

    SELECT cantidad_producto_almacen FROM almacenes_productos
    WHERE id_producto = ? AND id_almacen = ?

    INSERT INTO productos_salidas (id_salida, id_producto, cantidad_salida) VALUES
    (?,?,?)

    UPDATE almacenes_productos
    SET cantidad_producto_almacen = cantidad_producto_almacen - ?
    WHERE id_producto = ? AND id_almacen = ?    

--Vista de stock
    --Consulta para crear una categoria
    INSERT INTO categorias(nombre_categoria) VALUES
    (?)

    --Consulta para crea un producto nuevo
    INSERT INTO productos(referencia_producto, nombre_producto, stock_minimo, promedio_costo, precio_venta, imagen, id_categoria) VALUES
    (?,?,?,?,?,?,?)

    --Consulta para mostrar la tabla de Stock
    SELECT referencia_producto, nombre_producto, stock_minimo, cantidad_producto FROM Productos

    --Consulta para detalles del producto al dar click en Detalles del Producto
    SELECT nombre_producto, referencia_producto, nombre_almacen AS 'Ubicacion', destino_entrada, cantidad_producto AS 'Cantidad', stock_minimo, promedio_costo AS 'Costo', precio_venta 'Precio', imagen FROM Productos 
    JOIN Almacenes_Productos ON Productos.id_producto = Almacenes_Productos.id_producto
    JOIN Almacenes ON Almacenes_Productos.id_almacen = Almacenes.id_almacen

    --Consulta para mostrar stock minimo al dar click en stock minimo
    SELECT referencia_producto, nombre_producto FROM productos

--Vista Detalles del Producto

    --Consulta actualizacion datos del producto al editarlo y guardar cambios
    UPDATE Productos
    SET nombre_producto = ?
    WHERE nombre_producto = ?

    UPDATE Productos
    SET ubicacion = ?
    WHERE ubicacion = ?

    UPDATE Productos
    SET stock_minimo = ?
    WHERE stock_minimo = ?

    UPDATE Productos
    SET costo = ?
    WHERE costo = ?

    UPDATE Productos
    SET precio_venta = ?
    WHERE precio_venta = ?

    --Consulta para movimientos producto, al dar click en Movimientos del Producto
    SELECT fecha_hora, origen_entrada, destino_entrada, id_entrada AS 'Referencia' FROM Entradas
    UNION
    SELECT fecha_hora, origen_salida, destino_salida, id_salida AS 'Referencia' FROM Salidas

--Vista Informes
    --Consulta para Informe/Salidas x Producto en Tiempo
    SELECT productos.id_producto, cantidad_salida FROM productos_salidas
    JOIN productos ON productos_salidas.id_producto = productos.id_producto
    JOIN salidas ON productos_salidas.id_salida = salidas.id_salida
    WHERE productos.id_producto = 3 AND fecha_hora >= ? AND fecha_hora < ?

    --Consulta para Informe/Productos mas vendidos por almacen
    SELECT P.id_producto, nombre_producto, cantidad_salida FROM productos_salidas AS PS
    JOIN productos AS P ON PS.id_producto = P.id_producto
    JOIN salidas AS S ON PS.id_salida = S.id_salida
    WHERE id_almacen = 1 And S.fecha_hora >= '2024-02-21' AND S.fecha_hora <= '2024-02-23' 
    ORDER BY cantidad_salida DESC
    LIMIT 1

    --Consulta para Informe/Movimiento por Producto en almacenes
    SELECT almacenes.id_almacen, nombre_almacen, cantidad_salida FROM productos_salidas
    JOIN salidas ON productos_salidas.id_salida = salidas.id_salida
    JOIN almacenes ON salidas.id_almacen = almacenes.id_almacen
    WHERE id_producto = 3 AND fecha_hora >= ? AND fecha_hora <= ?

--Vista Perfiles

    --Consulta para crear un perfil
    INSERT INTO usuarios (nombre_usuario, id_rol, tipo_documento, numero_documento, correo_electronico, contraseña) VALUES
    (?,?,?,?,?,?)

    --Consulta editar un perfil
    UPDATE usuarios
    SET nombre_usuario = ?
    WHERE id_usuario = ?

    UPDATE usuarios
    SET id_rol = ?
    WHERE id_usuario = ?

--Vista Ajustes del Usuario
    --Consulta para cambiar informacion
    UPDATE usuarios
    SET nombre_completo = ?
    WHERE id_usuario = ?

    UPDATE usuarios
    SET tipo_documento = ?
    WHERE id_usuario = ?
    
    UPDATE usuarios
    SET numero_documento = ?
    WHERE id_usuario = ?

    UPDATE usuarios
    SET correo_electronico = ?
    WHERE id_usuario = ?

    UPDATE usuarios
    SET contraseña = ?
    WHERE id_usuario = ?