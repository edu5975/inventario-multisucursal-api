const database = require('../database.js');

function postProducto(req, res) {
    const { nombre, descripcion } = req.body;
    const query = `insert into producto(nombre,descripcion) values (?,?);
    `;
    database.query(query, [nombre, descripcion],
        (err, rows, fields) => {
            if (!err) {
                res.status(200).send({
                    status: 'producto guardado',
                    id: rows.insertId,
                    nombre,
                    descripcion
                });
            } else {
                res.status(500).send({ message: err })
            }
        }
    );
}

function getAllProducto(req, res) {
    database.query('SELECT * FROM producto',
        (err, rows, fields) => {
            if (!err) {
                if (rows.length != 0)
                    res.status(200).send(rows)
                else
                    res.status(404).send({ message: 'producto not found' })
            } else {
                res.status(500).send({ message: err })
            }
        }
    );
}

function getOneProducto(req, res) {
    const { id } = req.params;
    database.query('SELECT * FROM producto WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            if (rows.length != 0) {
                res.status(200).send(rows[0])
            } else
                res.status(404).send({ message: 'producto not found' })
        } else {
            res.status(500).send({ message: err })
        }
    });
}

function deleteProducto(req, res) {
    const { id } = req.params;
    database.query('DELETE FROM producto WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({ status: 'producto deleted: ' + id });
        } else {
            res.status(500).send({ message: err })
        }
    });
}

function putProducto(req, res) {
    const { nombre, descripcion } = req.body;
    const { id } = req.params;
    const query = `
    update producto set nombre = ?, descripcion = ? where id = ?;
  `;
    database.query(query, [nombre, descripcion, id], (err, rows, fields) => {
        if (!err) {
            res.status(200).send({
                status: 'producto Updated',
                id,
                nombre,
                descripcion
            });
        } else {
            res.status(500).send({ message: err })
        }
    });
}

module.exports = {
    getOneProducto,
    getAllProducto,
    postProducto,
    putProducto,
    deleteProducto
};