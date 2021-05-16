const database = require('../database.js');

function postSucursal(req, res) {
    const { nombre, direccion, telefono } = req.body;
    const query = `insert into sucursal(nombre,direccion,telefono) values (?,?,?);
    `;
    database.query(query, [nombre, direccion, telefono],
        (err, rows, fields) => {
            if (!err) {
                res.status(200).send({
                    status: 'sucursal guardado',
                    id: rows.insertId,
                    nombre,
                    direccion,
                    telefono
                });
            } else {
                res.status(500).send({ message: err })
            }
        }
    );
}

function getAllSucursal(req, res) {
    database.query('SELECT * FROM sucursal',
        (err, rows, fields) => {
            if (!err) {
                if (rows.length != 0)
                    res.status(200).send(rows)
                else
                    res.status(404).send({ message: 'sucursal not found' })
            } else {
                res.status(500).send({ message: err })
            }
        }
    );
}

function getOneSucursal(req, res) {
    const { id } = req.params;
    database.query('SELECT * FROM sucursal WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            if (rows.length != 0) {
                res.status(200).send(rows[0])
            } else
                res.status(404).send({ message: 'sucursal not found' })
        } else {
            res.status(500).send({ message: err })
        }
    });
}

function deleteSucursal(req, res) {
    const { id } = req.params;
    database.query('DELETE FROM sucursal WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({ status: 'sucursal deleted: ' + id });
        } else {
            res.status(500).send({ message: err })
        }
    });
}

function putSucursal(req, res) {
    const { nombre, direccion, telefono } = req.body;
    const { id } = req.params;
    const query = `
    update sucursal set nombre = ?, descripcion = ? where id = ?;
  `;
    database.query(query, [nombre, direccion, telefono, id], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({
                status: 'sucursal Updated',
                id,
                nombre,
                direccion,
                telefono
            });
        } else {
            res.status(500).send({ message: err })
        }
    });
}

module.exports = {
    getOneSucursal,
    getAllSucursal,
    postSucursal,
    putSucursal,
    deleteSucursal
};