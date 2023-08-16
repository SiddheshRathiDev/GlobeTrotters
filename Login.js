const express = require('express');
const mysql = require('mysql2');
const config = require('config');
const atob = require('atob');
const { request } = require('express');
const appForLogin = express.Router();
//const conn1=require('../DbConnection');

const connection = mysql.createConnection(config.get("Connection"));
console.log(config.get("Connection"));

appForLogin.post("/", (request, response) => {

    var user = request.body;
    console.log(user);
    //var user=JSON.parse(request.body);
    let query = 'select * from users where passwd=? and email=?';

    connection.query(query, [user.passwd, user.email], (err, result) => {
        console.log(result);
        if (result.length != 0) {
            //console.log(result);
            var reply = {
                "isValid": "true",
                "id": result[0].id,
                "name": result[0].firstname
            }
            console.log(reply);
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(reply));
        }
        else {
            var reply = { "isValid": "false" }
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(reply));
        }
        response.end();
    })

})

module.exports = appForLogin;