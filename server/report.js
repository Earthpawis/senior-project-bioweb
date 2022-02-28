const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bio",
    port: "3306",
    password: "",
})
module.exports = function(app){ 

    app.get('/reportDis',(req,res) => {
        db.query('SELECT o_dis_id,o_dis_date,std_name,std.std_id,std_level,std_tel,o_dis_item_amount,o_dis_descrip,o_dis_status,prof_name FROM order_dis od JOIN student std ON od.std_id = std.std_id JOIN professer prof ON prof.prof_id = od.prof_id  ORDER BY o_dis_date DESC',(err,result) => {
            if(err){
                console.log(err);
            }else {
                res.json(result);
            }
        })
    })
    app.get('/reportBor',(req,res) => {
        db.query('SELECT o_bor_id,o_bor_date, std_name,std.std_id, std_level,std_tel,o_bor_descrip,o_bor_item_amount,prof_name, o_bor_status,o_bor_returned_date,o_bor_returned  FROM order_bor ob JOIN student std ON std.std_id = ob.std_id JOIN professer prof ON prof.prof_id = ob.prof_id ORDER BY o_bor_date DESC ',(err,result) => {
            if(err){
                console.log(err);
            }else {
                res.json(result);
            }
        })
    })
}