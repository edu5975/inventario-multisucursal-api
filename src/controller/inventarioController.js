const database = require('../database.js');

function postInventario(req, res) {
    const { idProducto, cantidad, costoUnitario, precioVenta } = req.body;
    const { id } = req.params;
    const query = `insert into inventario(idSucursal,idProducto,cantidad,costoUnitario,precioVenta) values (?,?,?,?,?);
    `;
    database.query(query, [id, idProducto, cantidad, costoUnitario, precioVenta],
        (err, rows, fields) => {
            if (!err) {
                res.status(200).send({
                    status: 'inventario guardado',
                    id: rows.insertId,
                    idProducto,
                    id,
                    cantidad,
                    costoUnitario,
                    precioVenta
                });
            } else {
                res.status(500).send({ message: err })
            }
        }
    );
}

function getAllInventario(req, res) {
    const { id } = req.params;
    database.query('SELECT * FROM inventario where idSucursal = ?', [id],
        (err, rows, fields) => {
            if (!err) {
                if (rows.length != 0)
                    res.status(200).send(rows)
                else
                    res.status(404).send({ message: 'inventario not found' })
            } else {
                res.status(500).send({ message: err })
            }
        }
    );
}

function getOneInventario(req, res) {
    const { idSucursal, idProducto } = req.params;
    database.query('SELECT * FROM inventario WHERE idSucursal = ? and idProducto = ?', [idSucursal, idProducto], (err, rows, fields) => {
        if (!err) {
            if (rows.length != 0) {
                res.status(200).send(rows[0])
            } else
                res.status(404).send({ message: 'inventario not found' })
        } else {
            res.status(500).send({ message: err })
        }
    });
}

function deleteInventario(req, res) {
    const { idSucursal, idProducto } = req.params;
    database.query('DELETE FROM inventario WHERE idSucursal = ? and idProducto = ?', [idSucursal, idProducto], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({ status: 'inventario deleted: ' + idSucursal + ' - ' + idProducto });
        } else {
            res.status(500).send({ message: err })
        }
    });
}

function putInventario(req, res) {
    const { cantidad, costoUnitario, precioVenta } = req.body;
    const { idSucursal, idProducto } = req.params;
    const query = `
    update inventario set cantidad = ?,costoUnitario = ?,precioVenta = ? where idProducto = ? and idSucursal = ?;
  `;
    database.query(query, [cantidad, costoUnitario, precioVenta, idProducto, idSucursal], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({
                status: 'inventario Updated',
                idProducto,
                idSucursal,
                cantidad,
                costoUnitario,
                precioVenta
            });
        } else {
            res.status(500).send({ message: err })
        }
    });
}

module.exports = {
    getOneInventario,
    getAllInventario,
    postInventario,
    putInventario,
    deleteInventario
};