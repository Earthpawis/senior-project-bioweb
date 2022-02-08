const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bio",
    port: "3306",
    password: "",
})


module.exports = function (app) {

    app.get('/pickingListDis_admin', (req, res) => {
        db.query("SELECT o_dis_id,o_dis_item_amount,o_dis_descrip,o_dis_status,o_dis_date,std_name,std_level FROM order_dis od JOIN student std ON od.std_id = std.std_id ", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
                console.log(result);
            }
        })
    });

    app.get('/detailPLDis_admin/:id', (req, res) => {
        const id = req.params.id;
        console.log(id);
        db.query("SELECT ch_name, dis_quantity, dis_unit, prof_name , o_dis_date , o_dis_status ,o_dis_descrip , std_name FROM o_disbursement od JOIN order_dis ord ON od.o_dis_id = ord.o_dis_id JOIN chemical che ON che.ch_id = od.ch_id JOIN professer prof ON prof.prof_id = ord.prof_id JOIN student std ON std.std_id = ord.std_id WHERE od.o_dis_id = ?", [id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
                console.log(result);
            }
        })
    })

    app.get('/pickingListBor_admin', (req, res) => {
        db.query("SELECT o_bor_id, std_name, std_level, o_bor_descrip, o_bor_item_amount, o_bor_returned_date, o_bor_status,o_bor_returned FROM order_bor ob JOIN student std ON std.std_id = ob.std_id  ", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
                console.log(result);
            }
        })
    });

    app.get('/detailPLBor_admin/:id', (req, res) => {
        const id = req.params.id;
        console.log(id);
        db.query("SELECT o_bor_descrip , std_name , tool_name , tool_size , o_tool_amount , o_bor_date , o_bor_returned_date , prof_name,o_bor_status FROM o_borrow ob JOIN order_bor orb ON ob.o_bor_id = orb.o_bor_id JOIN student std ON std.std_id = orb.std_id JOIN professer prof ON prof.prof_id = orb.prof_id JOIN tools t ON t.tool_id = ob.tool_id WHERE ob.o_bor_id = ?", [id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
                console.log(result);
            }
        })
    })

    app.put('/PLBor_returned/:id', (req, res) => {
        const id = req.params.id;
        console.log(req.body);
        console.log(id);
        db.query("UPDATE order_bor SET o_bor_returned =? WHERE o_bor_id = ?", [req.body.o_bor_returned, id],(err,result) => {
            if (err){
                console.log(err);
            } else {
                res.json(result);
                console.log(result);
            }
        })
    })

}