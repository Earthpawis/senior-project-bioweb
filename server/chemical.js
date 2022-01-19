const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bio",
    port: "3306",
    password: "",
})
module.exports = function(app){
app.get('/chemicalList', (req, res) => {
        db.query("SELECT * FROM chemical", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        })
    });


}