drop database if exists inventario;

create database if not exists inventario;

use inventario;

create table producto(
    id integer primary key auto_increment,
    nombre varchar(50),
    descripcion varchar(200)
);

create table sucursal(
    id integer primary key auto_increment,
    nombre varchar(50),
    direccion varchar(200),
    telefono varchar(15)
);

create table cliente(
    id integer primary key auto_increment,
    nombre varchar(50),
    apellidoPaterno varchar(25),
    apellidoMaterno varchar(25),
    idSucursal integer,
    constraint foreign key (idSucursal) references sucursal(id) on delete set null
);

create table vendedor(
    id integer primary key auto_increment,
    user varchar(20),
    password varchar(50),
    nombre varchar(50),
    apellidoPaterno varchar(25),
    apellidoMaterno varchar(25),
    idSucursal integer,
    constraint foreign key (idSucursal) references sucursal(id) on delete set null
);

create table inventario(
    cantidad decimal(10,2),
    costoUnitario decimal(10,2),
    precioVenta decimal(10,2),
    idProducto integer,
    idSucursal integer,
    constraint primary key (idProducto,idSucursal),
    constraint foreign key (idProducto) references producto(id),
    constraint foreign key (idSucursal) references sucursal(id)
);

create table venta(
    id integer primary key auto_increment,
    total decimal(10,2),
    fecha date,
    hora time,
    idCliente integer,
    idVendedor integer,
    idSucursal integer,
    constraint foreign key (idSucursal) references sucursal(id) on delete set null,
    constraint foreign key (idVendedor) references vendedor(id) on delete set null,
    constraint foreign key (idCliente) references cliente(id) on delete set null
);

create table ventaDetalle(
    id integer primary key auto_increment,
    cantidad decimal(10,2),
    costoUnitario decimal(10,2),
    precioVenta decimal(10,2),
    idProducto integer,
    idVenta integer,
    constraint foreign key (idProducto) references producto(id) on delete set null,
    constraint foreign key (idVenta) references sucursal(id) on delete set null
);


