const express = require('express');
const router = express.Router();

const productoController = require('../controller/productoController');
const sucursalController = require('../controller/sucursalController');
const inventarioController = require('../controller/inventarioController');

/*const jwt = require('jsonwebtoken');
const jwtC = require('../configJwt.js');

router.post('/login', (req, res) => {
    username = 'edu5975';
    password = '597559'
    const accessToken = jwt.sign({ username }, jwtC.accessTokenSecret);
    res.json(
        accessToken
    );
});*/

router.get('/producto', productoController.getAllProducto);
router.get('/producto/:id', productoController.getOneProducto);
router.post('/producto', productoController.postProducto);
router.put('/producto/:id', productoController.putProducto);
router.delete('/producto/:id', productoController.deleteProducto);

router.get('/sucursal', sucursalController.getAllSucursal);
router.get('/sucursal/:id', sucursalController.getOneSucursal);
router.post('/sucursal', sucursalController.postSucursal);
router.put('/sucursal/:id', sucursalController.putSucursal);
router.delete('/sucursal/:id', sucursalController.deleteSucursal);

router.get('/inventario/sucursal/:id', inventarioController.getAllInventario);
router.get('/inventario/sucursal/:idSucursal/producto/:idProducto', inventarioController.getOneInventario);
router.post('/inventario/sucursal/:id', inventarioController.postInventario);
router.put('/inventario/sucursal/:idSucursal/producto/:idProducto', inventarioController.putInventario);
router.delete('/inventario/sucursal/:idSucursal/producto/:idProducto', inventarioController.deleteInventario);


module.exports = router;