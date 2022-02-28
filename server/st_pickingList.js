const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    database: "bio",
    port: "3306",
    password: "password",
})

module.exports = function(app){

    app.get('/pickingListChemical/:id', (req, res) => {
        const id = req.params.id;
        db.query("SELECT o_dis_id,o_dis_item_amount,o_dis_descrip,o_dis_status,o_dis_date,prof_name FROM order_dis od JOIN professer prof ON od.prof_id = prof.prof_id JOIN student std ON std.std_id = od.std_id WHERE std.std_id = ? ORDER BY o_dis_date DESC ",[id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
                 
            }
        })
    });

    app.get('/pickingListTool/:id',(req,res) => {
        const id = req.params.id;
        db.query("SELECT o_bor_id,o_bor_date,o_bor_returned_date,o_bor_item_amount,o_bor_descrip,o_bor_status,prof_name FROM order_bor ob JOIN professer prof ON ob.prof_id = prof.prof_id JOIN student std ON std.std_id = ob.std_id WHERE ob.std_id = ? ORDER BY o_bor_date DESC ",[id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.json(result);
                
            }
        })
    }) 

    app.get('/detailPLChemical/:id',(req,res) => {
        const id = req.params.id;
        console.log(id);
        db.query("SELECT ch_name, dis_quantity, dis_unit, prof_name , o_dis_date , o_dis_status ,o_dis_descrip FROM o_disbursement od JOIN order_dis ord ON od.o_dis_id = ord.o_dis_id JOIN chemical che ON che.ch_id = od.ch_id JOIN professer prof ON prof.prof_id = ord.prof_id WHERE od.o_dis_id = ?", [id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.json(result);
                         
            } 
        })
    }) 

    app.get('/detailPLTool/:id',(req,res) => {
        const id = req.params.id;
        console.log(id);
        db.query("SELECT tool_name, tool_size,o_tool_amount, prof_name , o_bor_date , o_bor_status ,o_bor_descrip,o_bor_returned_date FROM o_borrow ob JOIN order_bor orb ON ob.o_bor_id = orb.o_bor_id JOIN tools t ON t.tool_id = ob.tool_id JOIN professer prof ON prof.prof_id = orb.prof_id WHERE ob.o_bor_id = ?", [id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.json(result);
                           
            } 
        }
        )
    }
    ) 



    app.put('/o_bor_description',(req,res)=> {
        const id = req.body.id;
        const des = req.body.des;
        console.log(id);
        console.log(des);
        db.query("UPDATE order_bor SET o_bor_description = ? WHERE o_bor_id =? ",[des,id],(err,result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);  
                
            }
        })
    })

  

}