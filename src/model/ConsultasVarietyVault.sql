-- Consultas
-- Crear en el orden de las entidades.

CREATE DATABASE VarietyVault;

USE VarietyVault;

CREATE TABLE Categorias(
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(20) NOT NULL
);

CREATE TABLE Roles(
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(20) NOT NULL,
    id_permiso INT NOT NULL
);

CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    id_rol INT NOT NULL,
    tipo_documento VARCHAR(5) NOT NULL,
    numero_documento INT NOT NULL UNIQUE,
    correo_electronico VARCHAR(50) NOT NULL,
    contraseña VARCHAR(10) NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)
);

CREATE TABLE Almacenes(
    id_almacen INT AUTO_INCREMENT PRIMARY KEY,
    nombre_almacen VARCHAR(20) NOT NULL,
    direccion_almacen VARCHAR(30) NOT NULL,
    descripcion_almacen VARCHAR(100) NOT NULL
);

CREATE TABLE Entradas(
    id_entrada INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora DATE NOT NULL,
    origen_entrada VARCHAR(20) NOT NULL,
    destino_entrada VARCHAR(20) NOT NULL,
    id_almacen INT NOT NULL,
    FOREIGN KEY (id_almacen) REFERENCES Almacenes(id_almacen)
);

CREATE TABLE Salidas(
    id_salida INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora DATE NOT NULL,
    origen_salida VARCHAR(20) NOT NULL,
    destino_salida VARCHAR(20) NOT NULL,
    id_almacen INT NOT NULL,
    FOREIGN KEY (id_almacen) REFERENCES Almacenes(id_almacen)
);

CREATE TABLE Productos(
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    referencia_producto VARCHAR(10) NOT NULL UNIQUE,
    nombre_producto VARCHAR(100),
    stock_minimo INT NOT NULL,
    promedio_costo INT NOT NULL,
    precio_venta INT NOT NULL,
    imagen VARCHAR(250),
    id_categoria INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
);

CREATE TABLE Almacenes_Usuarios(
    id_almacen INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_almacen) REFERENCES Almacenes(id_almacen),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

CREATE TABLE Productos_entradas(
    id_producto INT NOT NULL,
    id_entrada INT NOT NULL,
    cantidad_entrada INT NOT NULL,
    precio_compra INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto),
    FOREIGN KEY (id_entrada) REFERENCES Entradas(id_entrada)
);

CREATE TABLE Productos_Salidas(
    id_producto INT NOT NULL,
    id_salida INT NOT NULL,
    cantidad_salida INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto),
    FOREIGN KEY (id_salida) REFERENCES Salidas(id_salida)
);

CREATE TABLE Almacenes_Productos(
    id_almacen INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad_producto_almacen INT NOT NULL,
    FOREIGN KEY (id_almacen) REFERENCES Almacenes(id_almacen),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);

-- ______________________________________________________________________________________________________________________

-- DATOS PARA INGRESAR A LA BASE DE DATOS.
-- Insertar en el orden en que estan. 

-- 1. Insertar 3 roles
INSERT INTO Roles (nombre_rol, id_permiso)
VALUES
    ('Administrador', 1),
    ('Usuario', 2),
    ('Cliente', 3);

-- 2. Insertar 4 categoría
INSERT INTO Categorias (nombre_categoria)
VALUES
    ('Aseo'),
    ('Tecnologia'),
    ('Ropa'),
    ('Comida');

-- Insertar 30 productos
INSERT INTO productos (referencia_producto, nombre_producto, stock_minimo, promedio_costo, precio_venta, imagen, id_categoria)
VALUES
    ('REF001', 'Jabón en polvo', 10, 21000, 35000, 'image1.jpg', 1),
    ('REF002', 'Smartphone', 15, 28000, 45500, 'image2.jpg', 2),
    ('REF003', 'Televisor LED', 20, 35000, 52500, 'image3.jpg', 2),
    ('REF004', 'Laptop', 5, 14000, 28000, 'image4.jpg', 2),
    ('REF005', 'Leche en polvo', 12, 24500, 42000, 'image5.jpg', 4),
    ('REF006', 'Zapatos deportivos', 8, 17500, 31500, 'image6.jpg', 3),
    ('REF007', 'Camisa de vestir', 18, 31500, 49000, 'image7.jpg', 3),
    ('REF008', 'Detergente líquido', 25, 38500, 59500, 'image8.jpg', 1),
    ('REF009', 'Cereal de desayuno', 3, 10450, 24450, 'image9.jpg', 4),
    ('REF010', 'Gorra de moda', 7, 17500, 31500, 'image10.jpg', 3),
    ('REF011', 'Toalla de baño', 10, 21000, 35000, 'image11.jpg', 3),
    ('REF012', 'Reloj de pulsera', 15, 28000, 45500, 'image12.jpg', 3),
    ('REF013', 'Cámara digital', 20, 35000, 52500, 'image13.jpg', 2),
    ('REF014', 'Auriculares inalámbricos', 5, 14000, 28000, 'image14.jpg', 2),
    ('REF015', 'Botella de agua', 12, 24500, 42000, 'image15.jpg', 4),
    ('REF016', 'Pantalones casuales', 8, 17500, 31500, 'image16.jpg', 3),
    ('REF017', 'Xbox', 18, 31500, 49000, 'image17.jpg', 2),
    ('REF018', 'Desinfectante', 25, 38500, 59500, 'image18.jpg', 1),
    ('REF019', 'Decodificador', 3, 10450, 24450, 'image19.jpg', 2),
    ('REF020', 'Salchichas', 7, 17500, 31500, 'image20.jpg', 4),
    ('REF021', 'Suavitel', 10, 21000, 35000, 'image21.jpg', 1),
    ('REF022', 'Clorox', 15, 28000, 45500, 'image22.jpg', 1),
    ('REF023', 'Cafe', 20, 35000, 52500, 'image23.jpg', 4),
    ('REF024', 'Smartwatch', 5, 14000, 28000, 'image24.jpg', 2),
    ('REF025', 'Ropa interior', 12, 24500, 42000, 'image25.jpg', 3),
    ('REF026', 'Fabuloso', 8, 17500, 31500, 'image26.jpg', 1),
    ('REF027', 'Juego de sábanas', 18, 31500, 49000, 'image27.jpg', 3),
    ('REF028', 'Pan', 25, 38500, 59500, 'image28.jpg', 4),
    ('REF029', 'Cartera', 3, 10450, 24450, 'image29.jpg', 3),
    ('REF030', 'Limpia vidrios', 7, 17500, 31500, 'image30.jpg', 1);

-- Insertar 6 usuarios
INSERT INTO Usuarios (nombre_usuario, id_rol, tipo_documento, numero_documento, correo_electronico, contraseña)
VALUES
    ('User1', 1, 'CC', 123456789, 'user1@example.com', 'password1'),
    ('User2', 2, 'CC', 987654321, 'user2@example.com', 'password2'),
    ('User3', 3, 'CC', 456789123, 'user3@example.com', 'password3'),
    ('User4', 3, 'CC', 321654987, 'user4@example.com', 'password4'),
    ('User5', 2, 'CC', 789123456, 'user5@example.com', 'password5'),
    ('User6', 2, 'CC', 654987321, 'user6@example.com', 'password6');

-- Insertar 3 almacenes
INSERT INTO Almacenes (nombre_almacen, direccion_almacen, descripcion_almacen)
VALUES
    ('Almacen A', 'Dirección A', 'Descripción A'),
    ('Almacen B', 'Dirección B', 'Descripción B'),
    ('Almacen C', 'Dirección C', 'Descripción C');

-- Insertar 6 almacenes_usuarios
INSERT INTO Almacenes_Usuarios (id_almacen, id_usuario)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (1, 4),
    (2, 5),
    (3, 6);

-- Insertar 30 entradas  
INSERT INTO Entradas (fecha_hora, origen_entrada, destino_entrada, id_almacen)
VALUES
    ('2024-03-07', 'Origen 1', 'Destino 1', 1),
    ('2024-03-08', 'Origen 2', 'Destino 2', 2),
    ('2024-03-09', 'Origen 3', 'Destino 3', 3),
    ('2024-03-10', 'Origen 1', 'Destino 1', 1),
    ('2024-03-11', 'Origen 2', 'Destino 2', 2),
    ('2024-03-12', 'Origen 3', 'Destino 3', 3),
    ('2024-03-13', 'Origen 1', 'Destino 1', 1),
    ('2024-03-14', 'Origen 2', 'Destino 2', 2),
    ('2024-03-15', 'Origen 3', 'Destino 3', 3),
    ('2024-03-16', 'Origen 1', 'Destino 1', 1),
    ('2024-03-17', 'Origen 2', 'Destino 2', 2),
    ('2024-03-18', 'Origen 3', 'Destino 3', 3),
    ('2024-03-19', 'Origen 1', 'Destino 1', 1),
    ('2024-03-20', 'Origen 2', 'Destino 2', 2),
    ('2024-03-21', 'Origen 3', 'Destino 3', 3),
    ('2024-03-22', 'Origen 1', 'Destino 1', 1),
    ('2024-03-23', 'Origen 2', 'Destino 2', 2),
    ('2024-03-24', 'Origen 3', 'Destino 3', 3),
    ('2024-03-25', 'Origen 1', 'Destino 1', 1),
    ('2024-03-26', 'Origen 2', 'Destino 2', 2),
    ('2024-03-27', 'Origen 3', 'Destino 3', 3),
    ('2024-03-28', 'Origen 1', 'Destino 1', 1),
    ('2024-03-29', 'Origen 2', 'Destino 2', 2),
    ('2024-03-30', 'Origen 3', 'Destino 3', 3),
    ('2024-03-31', 'Origen 1', 'Destino 1', 1),
    ('2024-04-01', 'Origen 2', 'Destino 2', 2),
    ('2024-04-02', 'Origen 3', 'Destino 3', 3),
    ('2024-04-03', 'Origen 1', 'Destino 1', 1),
    ('2024-04-04', 'Origen 2', 'Destino 2', 2),
    ('2024-04-05', 'Origen 3', 'Destino 3', 3);

-- Insertar 30 salidas
INSERT INTO Salidas (fecha_hora, origen_salida, destino_salida, id_almacen)
VALUES
    ('2024-03-07', 'Origen 1', 'Destino 1', 1),
    ('2024-03-08', 'Origen 2', 'Destino 2', 2),
    ('2024-03-09', 'Origen 3', 'Destino 3', 3),
    ('2024-03-10', 'Origen 1', 'Destino 1', 1),
    ('2024-03-11', 'Origen 2', 'Destino 2', 2),
    ('2024-03-12', 'Origen 3', 'Destino 3', 3),
    ('2024-03-13', 'Origen 1', 'Destino 1', 1),
    ('2024-03-14', 'Origen 2', 'Destino 2', 2),
    ('2024-03-15', 'Origen 3', 'Destino 3', 3),
    ('2024-03-16', 'Origen 1', 'Destino 1', 1),
    ('2024-03-17', 'Origen 2', 'Destino 2', 2),
    ('2024-03-18', 'Origen 3', 'Destino 3', 3),
    ('2024-03-19', 'Origen 1', 'Destino 1', 1),
    ('2024-03-20', 'Origen 2', 'Destino 2', 2),
    ('2024-03-21', 'Origen 3', 'Destino 3', 3),
    ('2024-03-22', 'Origen 1', 'Destino 1', 1),
    ('2024-03-23', 'Origen 2', 'Destino 2', 2),
    ('2024-03-24', 'Origen 3', 'Destino 3', 3),
    ('2024-03-25', 'Origen 1', 'Destino 1', 1),
    ('2024-03-26', 'Origen 2', 'Destino 2', 2),
    ('2024-03-27', 'Origen 3', 'Destino 3', 3),
    ('2024-03-28', 'Origen 1', 'Destino 1', 1),
    ('2024-03-29', 'Origen 2', 'Destino 2', 2),
    ('2024-03-30', 'Origen 3', 'Destino 3', 3),
    ('2024-03-31', 'Origen 1', 'Destino 1', 1),
    ('2024-04-01', 'Origen 2', 'Destino 2', 2),
    ('2024-04-02', 'Origen 3', 'Destino 3', 3),
    ('2024-04-03', 'Origen 1', 'Destino 1', 1),
    ('2024-04-04', 'Origen 2', 'Destino 2', 2),
    ('2024-04-05', 'Origen 3', 'Destino 3', 3);

-- Insertar 30 productos_entradas
INSERT INTO Productos_entradas (id_producto, id_entrada, cantidad_entrada, precio_compra)
VALUES
    (1, 1, 10, 21000),
    (2, 2, 15, 28000),
    (3, 3, 20, 35000),
    (4, 4, 15, 14000),
    (5, 5, 12, 24500),
    (6, 6, 20, 17500),
    (7, 7, 21, 31500),
    (8, 8, 22, 38500),
    (9, 9, 30, 10450),
    (10, 10, 29, 17500),
    (11, 11, 19, 21000),
    (12, 12, 25, 28000),
    (13, 13, 24, 35000),
    (14, 14, 21, 14000),
    (15, 15, 22, 24500),
    (16, 16, 28, 17500),
    (17, 17, 18, 31500),
    (18, 18, 25, 38500),
    (19, 19, 30, 10450),
    (20, 20, 27, 17500),
    (21, 21, 10, 21000),
    (22, 22, 15, 28000),
    (23, 23, 20, 35000),
    (24, 24, 15, 14000),
    (25, 25, 12, 24500),
    (26, 26, 28, 17500),
    (27, 27, 18, 31500),
    (28, 28, 25, 38500),
    (29, 29, 30, 10450),
    (30, 30, 27, 17500);

-- Insertar 30 productos_salidas
INSERT INTO Productos_Salidas (id_producto, id_salida, cantidad_salida)
VALUES
    (1, 1, 2),
    (2, 2, 3),
    (3, 3, 5),
    (4, 4, 1),
    (5, 5, 3),
    (6, 6, 2),
    (7, 7, 3),
    (8, 8, 5),
    (9, 9, 2),
    (10, 10, 4),
    (11, 11, 6),
    (12, 12, 5),
    (13, 13, 4),
    (14, 14, 6),
    (15, 15, 2),
    (16, 16, 4),
    (17, 17, 8),
    (18, 18, 10),
    (19, 19, 1),
    (20, 20, 3),
    (21, 21, 4),
    (22, 22, 5),
    (23, 23, 6),
    (24, 24, 2),
    (25, 25, 5),
    (26, 26, 3),
    (27, 27, 6),
    (28, 28, 8),
    (29, 29, 1),
    (30, 30, 3);


-- Insertar valores en la tabla Almacenes_Productos para todos los almacenes
INSERT INTO Almacenes_Productos (id_almacen, id_producto, cantidad_producto_almacen)
SELECT
    Entradas.id_almacen,
    Productos_entradas.id_producto,
    (SUM(Productos_entradas.cantidad_entrada) - COALESCE(SUM(Productos_Salidas.cantidad_salida), 0)) AS cantidad_producto_almacen
FROM
    Productos_entradas
LEFT JOIN
    Productos_Salidas ON Productos_entradas.id_producto = Productos_Salidas.id_producto
LEFT JOIN
    Entradas ON Productos_entradas.id_entrada = Entradas.id_entrada
GROUP BY
    Entradas.id_almacen, Productos_entradas.id_producto;


-- ______________________________________________________________________________________________________________________

--Entidad Usuarios

    --Vista Registro de usuario/perfil

        -- AGREGUE
        -- Consulta para el registro de un nuevo usuario para saber si ya esta registrado haciendo click al boton registrar.
        SELECT COUNT(*) AS datos_existentes FROM usuarios
        WHERE correo_electronico = ? OR numero_documento = ?;
        -- Si datos_existentes es igual a 0, entonces se puede registrar el usuario. 

        -- MODIFIQUE
        --Consulta para el registro de un nuevo usuario haciendo click al boton registrar
        INSERT INTO Usuarios (nombre_completo, tipo_documento, numero_documento, correo_electronico, contraseña, rol)
        VALUES (?, ?, ?, ?, ?, ?);


    --Vista Igreso o Logeo de usuario

        -- MODIFIQUE
        --Consulta para el ingreso/logeo del usuario haciendo click al boton ingreso
        SELECT  correo_electronico, contraseña  FROM usuarios
        WHERE correo_electronico = ? AND contraseña = ?;

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

        --Consulta para eliminar un perfil
        DELETE FROM usuarios
        WHERE id_usuario = ?

    --Vista Ajustes del Usuario
        --Consulta para mostrar datos del usuario
        SELECT nombre_completo, tipo_documento, numero_documento, correo_electronico, contraseña FROM usuarios
        WHERE id_usuario = ?

        --Consulta para editar usuario
        UPDATE usuarios
        SET nombre_completo = ?
        SET tipo_documento = ?
        SET numero_documento = ?
        SET correo_electronico = ?
        SET contraseña = ?
        WHERE id_usuario = ?

--Entidad Almacenes

    --Vista Mis Inventarios vacio
        --Consulta para crear un nuevo inventario
        INSERT INTO Almacenes (codigo_almacen, nombre_almacen, direccion_almacen)
        VALUES (1, Inventario1, 'Cra. 93 #80c – 72')

    --Vista Mis Inventarios
        --Consulta para mostrar los inventarios
        SELECT nombre_almacen, direccion_almacen, descripcion_almacen FROM almacenes
        WHERE id_almacen = ?

        --Consulta para eliminar un inventario
        DELETE FROM almacenes
        WHERE id_almacen = ?

    --Vista Editar Inventario
        --Consulta para editar un inventario
        UPDATE almacenes
        SET nombre_almacen = ?
        SET direccion_almacen = ?
        SET descripcion_almacen = ?
        WHERE id_almacen = ?

--Entidad Productos

    --Vista Stock
        --Consulta para crea un producto nuevo
        INSERT INTO productos(referencia_producto, nombre_producto, stock_minimo, promedio_costo, precio_venta, imagen, id_categoria) VALUES
        (?,?,?,?,?,?,?)

        --Consulta para mostrar la tabla de Stock
        SELECT nombre_producto, referencia_producto, categoria, cantidad_producto_almacen AS cantidad_disponeble FROM Productos

        --Consulta para eliminar un producto
        DELETE FROM productos
        WHERE id_producto = ?

    --Vista Detalles del Producto

        --Consulta para detalles del producto al dar click en Detalles del Producto
        SELECT nombre_producto, referencia_producto, nombre_almacen AS 'Ubicacion', cantidad_producto AS 'Cantidad', stock_minimo, promedio_costo AS 'Costo', precio_venta 'Precio', imagen FROM Productos
        JOIN Almacenes_Productos ON Productos.id_producto = Almacenes_Productos.id_producto
        JOIN Almacenes ON Almacenes_Productos.id_almacen = Almacenes.id_almacen

        --Consulta actualizacion datos del producto al editarlo y guardar cambios
        UPDATE Productos
        SET nombre_producto = ?
        SET stock_minimo = ?
        SET precio_venta = ?
        SET imagen = ?
        WHERE id_producto = ?

    --Vista Movimientos del Producto
        --Consulta para movimientos producto, al dar click en Movimientos del Producto
        SELECT  id_entrada AS 'Referencia', fecha_hora, origen_entrada, destino_entrada FROM Entradas
        UNION
        SELECT id_salida AS 'Referencia', fecha_hora, origen_salida, destino_salida FROM Salidas


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

    --Consulta para mostrar stock minimo al dar click en stock minimo
    SELECT referencia_producto, nombre_producto FROM productos

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