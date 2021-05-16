const axios = require('axios');
const config = require('../config.js');

async function getAxios(url) {
    var datos = JSON;
    await axios.get(config.host + url)
        .then(function(response) {
            datos = response.data;
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {});
    return datos;
}

async function postAxios(url, data = null) {
    var datos = JSON;
    await axios.post(config.host + url, data)
        .then(function(response) {
            datos = response;
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {});
    return datos;
}

module.exports = {
    getAxios,
    postAxios
};